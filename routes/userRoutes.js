import express from 'express';
import multer from 'multer';
import { registerUser, loginUser, editProfile, recordAttendance, getAttendanceReport, me } from '../controllers/userControllers.js';
import authenticateToken from '../middleware/authMiddleware.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

/**
 * @swagger
 * /api/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *               - email 
 *               - phone 
 *               - addrees
 *               - role_id
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               address:
 *                 type: string
 *               role_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: User registered successfully
 *       500:
 *         description: Internal server error
 *
 * /api/login:
 *   post:
 *     summary: Login user and return JWT token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Token returned successfully
 *         content:
 *          application/json:
 *           schema:
 *           type: object
 *           properties:
 *            token:
 *             type: string
 *       401:
 *         description: Invalid credentials
 *
 * /profile:
 *   put:
 *     summary: Edit user profile
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *             properties:
 *               username:
 *                 type: string
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 * /api/auth/me:
 *   get:
 *     summary: Get user profile
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *
 * /attendance:
 *   post:
 *     summary: Record attendance with optional photo
 *     tags: [Attendance]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - location
 *             properties:
 *               location:
 *                 type: string
 *               photo:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Attendance recorded successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *
 * /attendance/report:
 *   get:
 *     summary: Get user attendance report
 *     tags: [Attendance]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Attendance report retrieved
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */

router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/profile', authenticateToken, editProfile);
router.get('/auth/me', authenticateToken, me);
router.post('/attendance', authenticateToken, upload.single('photo'), recordAttendance);
router.get('/attendance/report', authenticateToken, getAttendanceReport);

export default router;
