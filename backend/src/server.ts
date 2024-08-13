import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(bodyParser.json());

interface User {
  username: string;
  password: string;
}

const users: User[] = [];

app.post('/api/auth/signup', (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 8);
  users.push({ username, password: hashedPassword });
  res.status(201).send({ message: 'User registered successfully!' });
});

app.get('/api/auth/me', (req, res) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).send({ message: 'No token provided.' });

  const token = authHeader.startsWith('Bearer ') ? authHeader.substring(7) : authHeader;
  jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
    if (err) return res.status(500).send({ message: 'Failed to authenticate token.' });
    res.status(200).send({ user: (decoded as { username: string }).username });
  });
});


app.get('/api/auth/login', (req, res) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).send({ message: 'No token provided.' });

  const token = authHeader.startsWith('Bearer ') ? authHeader.substring(7) : authHeader;
  jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
    if (err) return res.status(500).send({ message: 'Failed to authenticate token.' });
    res.status(200).send({ user: (decoded as { username: string }).username });
  });
});


app.listen(3000, () => {
  console.log('API running on http://localhost:3000');
});
