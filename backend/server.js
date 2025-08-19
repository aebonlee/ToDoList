const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://localhost:3001', 
    'https://aebonlee.github.io',
    'https://todolist-dhlt.onrender.com',
    'https://todolist-dhlt-gc0d.onrender.com'
  ],
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(express.json());

// In-memory storage (for demo purposes)
const users = [];
const todos = {};

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this';

// Helper function to verify token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

// Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Register
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;
    
    // Check if user exists
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      return res.status(409).json({ error: 'User already exists' });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create user
    const user = {
      id: `user_${Date.now()}`,
      email,
      name: name || email.split('@')[0],
      password: hashedPassword,
      createdAt: new Date().toISOString()
    };
    
    users.push(user);
    todos[user.id] = [];
    
    // Generate token
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });
    
    // Send response
    const { password: _, ...userWithoutPassword } = user;
    res.json({ user: userWithoutPassword, token });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

// Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user
    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // Generate token
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });
    
    // Send response
    const { password: _, ...userWithoutPassword } = user;
    res.json({ user: userWithoutPassword, token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Get profile
app.get('/api/auth/profile', verifyToken, (req, res) => {
  const user = users.find(u => u.id === req.userId);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  
  const { password: _, ...userWithoutPassword } = user;
  res.json(userWithoutPassword);
});

// Logout (just for consistency, actual logout is handled on client)
app.post('/api/auth/logout', verifyToken, (req, res) => {
  res.json({ message: 'Logged out successfully' });
});

// Get todos
app.get('/api/todos', verifyToken, (req, res) => {
  const userTodos = todos[req.userId] || [];
  res.json(userTodos);
});

// Create todo
app.post('/api/todos', verifyToken, (req, res) => {
  const { title, description } = req.body;
  
  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }
  
  const todo = {
    id: `todo_${Date.now()}`,
    title,
    description: description || '',
    completed: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    userId: req.userId
  };
  
  if (!todos[req.userId]) {
    todos[req.userId] = [];
  }
  
  todos[req.userId].push(todo);
  res.json(todo);
});

// Update todo
app.put('/api/todos/:id', verifyToken, (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;
  
  const userTodos = todos[req.userId] || [];
  const todoIndex = userTodos.findIndex(t => t.id === id);
  
  if (todoIndex === -1) {
    return res.status(404).json({ error: 'Todo not found' });
  }
  
  const todo = userTodos[todoIndex];
  
  if (title !== undefined) todo.title = title;
  if (description !== undefined) todo.description = description;
  if (completed !== undefined) todo.completed = completed;
  todo.updatedAt = new Date().toISOString();
  
  todos[req.userId][todoIndex] = todo;
  res.json(todo);
});

// Delete todo
app.delete('/api/todos/:id', verifyToken, (req, res) => {
  const { id } = req.params;
  
  const userTodos = todos[req.userId] || [];
  const todoIndex = userTodos.findIndex(t => t.id === id);
  
  if (todoIndex === -1) {
    return res.status(404).json({ error: 'Todo not found' });
  }
  
  todos[req.userId].splice(todoIndex, 1);
  res.json({ message: 'Todo deleted successfully' });
});

// Toggle todo
app.patch('/api/todos/:id/toggle', verifyToken, (req, res) => {
  const { id } = req.params;
  
  const userTodos = todos[req.userId] || [];
  const todoIndex = userTodos.findIndex(t => t.id === id);
  
  if (todoIndex === -1) {
    return res.status(404).json({ error: 'Todo not found' });
  }
  
  const todo = userTodos[todoIndex];
  todo.completed = !todo.completed;
  todo.updatedAt = new Date().toISOString();
  
  todos[req.userId][todoIndex] = todo;
  res.json(todo);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});