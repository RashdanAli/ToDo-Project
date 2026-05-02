const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
const todosRouter = require('./routes/todos');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware - applied before routes
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/todos', todosRouter);

// Root endpoint
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to Taska API' });
});

// 404 handler - catch-all for unknown routes
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error('Server error:', err.message);
    res.status(500).json({ message: err.message || 'Server error' });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});