import express from 'express';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import photoRoutes from './routes/photos';
import commentRoutes from './routes/comments';

dotenv.config({ path: '.env.local' });

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// serve uploaded images as static files
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.use('/api/photos', photoRoutes);
app.use('/api/comments', commentRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});