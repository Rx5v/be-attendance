import express from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';
import userRoutes from './routes/userRoutes.js';
import 'swagger-ui-express';
import { serve, setup } from 'swagger-ui-express';
import swaggerSpec from './swagger.js'

const app = express();
const PORT = 3000;

app.use('/api/docs', serve, setup(swaggerSpec));

app.use(bodyParser.json());
app.use('/api', userRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});