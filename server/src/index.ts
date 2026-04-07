import express from 'express';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import photoRoutes from './routes/photos';
import commentRoutes from './routes/comments';

const envFilePath = process.env.NODE_ENV === 'production' ? '.env' : '.env.local';
dotenv.config({ path: envFilePath });

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.use('/api/photos', photoRoutes);
app.use('/api/comments', commentRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});