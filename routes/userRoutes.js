import express from 'express';
import multer from 'multer';
import { registerUser, loginUser, editProfile, recordAttendance, getAttendanceReport } from '../controllers/userController.js';
import authenticateToken from '../middleware/authMiddleware.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/profile', authenticateToken, editProfile);
router.post('/attendance', authenticateToken, upload.single('photo'), recordAttendance);
router.get('/attendance/report', authenticateToken, getAttendanceReport);

export default router;
