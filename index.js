import express from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';
import userRoutes from './routes/userRoutes.js';

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use('/api', userRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});