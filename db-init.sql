-- Roles Table
CREATE TABLE IF NOT EXISTS roles (
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL
);

-- Users Table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    phone VARCHAR(100) NOT NULL,
    address VARCHAR(100),
    role_id INTEGER REFERENCES roles(id) ON DELETE NO ACTION
);

-- Attendance Table
CREATE TABLE IF NOT EXISTS attendance (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    location VARCHAR(255),
    ip VARCHAR(45),
    photo VARCHAR(255),
    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index on users
CREATE INDEX idx_users_id ON users USING HASH(id);
CREATE INDEX idx_roles_id_on_users ON users USING HASH(role_id);

-- Create index on users
CREATE INDEX idx_roles_id ON roles USING HASH(id);

-- Create index on attendace
CREATE INDEX idx_attendance_id ON attendance USING HASH(id);
CREATE INDEX idx_users_id_on_attendance ON attendance USING HASH(user_id);
