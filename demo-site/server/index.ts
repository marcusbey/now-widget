import express from 'express';
import cors from 'cors';
import { mockUser, mockPosts } from './mockData.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '..')));

// API Routes
app.get('/api/widget/user-info', (req, res) => {
    const { userId } = req.query;
    if (userId === mockUser.id || userId === 'ErOeaXjKcLJ') {
        res.json({ user: mockUser });
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});

app.get('/api/widget/user-posts', (req, res) => {
    const { userId } = req.query;
    if (userId === mockUser.id || userId === 'ErOeaXjKcLJ') {
        res.json({ posts: mockPosts });
    } else {
        res.status(404).json({ error: 'Posts not found' });
    }
});

// Serve HTML pages
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
});

app.listen(PORT, () => {
    console.log(`Demo server running on http://localhost:${PORT}`);
});