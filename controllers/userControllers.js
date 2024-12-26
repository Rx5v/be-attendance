import pool from '../db.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const SECRET = 'your_jwt_secret';

export const registerUser = async (req, res) => {
    const { username, password, email, phone, address, role_id } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
        'INSERT INTO users (username, password, email, phone, address, role_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        [username, hashedPassword, email, phone, address, role_id]
    );
    res.json(result.rows[0]);
};

export const loginUser = async (req, res) => {
    const { username, password } = req.body;
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    const user = result.rows[0];
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user.id }, SECRET, { expiresIn: '1h' });
    res.json({ token });
};

export const me = async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT users.username, users.email, users.phone, users.address, roles.name as role FROM users LEFT JOIN roles on roles.id = users.role_id WHERE users.id = $1',
            [req.user.userId]
        );
        if(result.length > 0)
            return res.status(200).send({
                status: true,
                data: result.rows[0]
            });
        
    } catch (error) {
        res.status(500).send({
            status: false,
            message: error.message
        })
    }
};

export const editProfile = async (req, res) => {
    const { username } = req.body;
    const result = await pool.query(
        'UPDATE users SET username = $1 WHERE id = $2 RETURNING *',
        [username, req.user.userId]
    );
    res.json(result.rows[0]);
};

export const recordAttendance = async (req, res) => {
    const { location } = req.body;
    const ip = req.ip;
    const photoPath = req.file ? req.file.path : null;
    const result = await pool.query(
        'INSERT INTO attendance (userId, location, ip, photo) VALUES ($1, $2, $3, $4) RETURNING *',
        [req.user.userId, location, ip, photoPath]
    );
    res.json(result.rows[0]);
};

export const getAttendanceReport = async (req, res) => {
    const result = await pool.query(
        'SELECT * FROM attendance WHERE userId = $1',
        [req.user.userId]
    );
    res.json(result.rows);
};