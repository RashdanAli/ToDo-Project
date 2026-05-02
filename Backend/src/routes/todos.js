const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

// @route   GET /api/todos
// @desc    Get all todos
router.get('/', async (req, res, next) => {
    try {
        const todos = await Todo.find().sort({ createdAt: -1 });
        res.json(todos);
    } catch (error) {
        next(error);
    }
});

// @route   POST /api/todos
// @desc    Create a new todo
router.post('/', async (req, res, next) => {
    try {
        const { title, description } = req.body;
        const todo = new Todo({ title, description });
        const savedTodo = await todo.save();
        res.status(201).json(savedTodo);
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: error.message });
        }
        next(error);
    }
});

// @route   PUT /api/todos/:id
// @desc    Update a todo
router.put('/:id', async (req, res, next) => {
    try {
        const { title, description, done } = req.body;
        const todo = await Todo.findByIdAndUpdate(
            req.params.id,
            { title, description, done },
            { new: true, runValidators: true }
        );
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        res.json(todo);
    } catch (error) {
        next(error);
    }
});

// @route   GET /api/todos/:id
// @desc    Get a single todo
router.get('/:id', async (req, res, next) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        res.json(todo);
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid ID format' });
        }
        next(error);
    }
});

// @route   DELETE /api/todos/:id
// @desc    Delete a todo
router.delete('/:id', async (req, res, next) => {
    try {
        const todo = await Todo.findByIdAndDelete(req.params.id);
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        res.json({ message: 'Todo deleted successfully' });
    } catch (error) {
        next(error);
    }
});

// @route   PATCH /api/todos/:id/done
// @desc    Toggle done status
router.patch('/:id/done', async (req, res, next) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        todo.done = !todo.done;
        const updatedTodo = await todo.save();
        res.json(updatedTodo);
    } catch (error) {
        next(error);
    }
});

module.exports = router;