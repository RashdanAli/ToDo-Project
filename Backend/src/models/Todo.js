const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Title is required'],
            trim: true,
            maxlength: [200, 'Title cannot be more than 200 characters']
        },
        description: {
            type: String,
            trim: true
        },
        done: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true // Automatically adds createdAt and updatedAt
    }
);

module.exports = mongoose.model('Todo', todoSchema);
