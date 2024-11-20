import { Request, Response } from 'express';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function getUserInfo(req: Request, res: Response) {
  try {
    const userId = req.query.userId;
    const userData = await fs.readFile(path.join(__dirname, '../data/users.json'), 'utf-8');
    const { user } = JSON.parse(userData);
    
    if (user.id !== userId) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json({ user });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function getUserPosts(req: Request, res: Response) {
  try {
    const userId = req.query.userId;
    const [userData, postsData] = await Promise.all([
      fs.readFile(path.join(__dirname, '../data/users.json'), 'utf-8'),
      fs.readFile(path.join(__dirname, '../data/posts.json'), 'utf-8')
    ]);

    const { user } = JSON.parse(userData);
    const { posts } = JSON.parse(postsData);
    
    if (user.id !== userId) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Add user data to each post
    const postsWithUser = posts.map(post => ({
      ...post,
      user
    }));
    
    res.json({ posts: postsWithUser });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}