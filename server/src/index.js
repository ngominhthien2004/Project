import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// Comic Schema
const comicSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: [String],
  chapters: Number,
  status: String,
  views: Number,
  rating: Number,
  description: String,
  coverImage: String,
  publishDate: Date,
  updatedAt: Date
});

const Comic = mongoose.model('Comic', comicSchema, 'comics');

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Comic Web API Server' });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Get all comics
app.get('/api/comics', async (req, res) => {
  try {
    const comics = await Comic.find().sort({ updatedAt: -1 });
    res.json({ success: true, data: comics });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get comic by ID
app.get('/api/comics/:id', async (req, res) => {
  try {
    const comic = await Comic.findById(req.params.id);
    if (!comic) {
      return res.status(404).json({ success: false, message: 'Comic not found' });
    }
    res.json({ success: true, data: comic });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get comics by genre
app.get('/api/comics/genre/:genre', async (req, res) => {
  try {
    const comics = await Comic.find({ genre: req.params.genre }).sort({ views: -1 });
    res.json({ success: true, data: comics });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});

export default app;
