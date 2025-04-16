// app.js - Main application file
const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Secret key for JWT
const JWT_SECRET = 'your-secret-key';

// Mock database
const users = [
  { id: 1, username: 'user1', password: 'pass123' }
];

const companies = [
  { id: 1, name: 'TechCorp', matchScore: 86, status: 'Target' },
  { id: 2, name: 'InnovateSoft', matchScore: 72, status: 'Not Target' },
  { id: 3, name: 'DataFlow Systems', matchScore: 94, status: 'Target' },
  { id: 4, name: 'CloudScale', matchScore: 65, status: 'Not Target' },
  { id: 5, name: 'Quantum Networks', matchScore: 78, status: 'Not Target' }
];

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) return res.status(401).json({ error: 'Authentication required' });
  
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid or expired token' });
    req.user = user;
    next();
  });
};

// Login endpoint
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  
  const user = users.find(u => u.username === username && u.password === password);
  
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  
  // Generate JWT token
  const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
  
  res.json({ message: 'Login successful', token });
});

// Get accounts endpoint
app.get('/accounts', authenticateToken, (req, res) => {
  res.json(companies);
});

// Update account status endpoint
app.post('/accounts/:id/status', authenticateToken, (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  
  const companyIndex = companies.findIndex(c => c.id === parseInt(id));
  
  if (companyIndex === -1) {
    return res.status(404).json({ error: 'Company not found' });
  }
  
  if (status !== 'Target' && status !== 'Not Target') {
    return res.status(400).json({ error: 'Status must be either "Target" or "Not Target"' });
  }
  
  companies[companyIndex].status = status;
  
  res.json({ 
    message: 'Status updated successfully',
    company: companies[companyIndex]
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;