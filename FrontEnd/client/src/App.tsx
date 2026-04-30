import { useState, useEffect } from 'react';
import { api, type Todo } from './services/api';
import { Toaster, toast } from 'react-hot-toast';

function App() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editTitle, setEditTitle] = useState('');
    const [editDescription, setEditDescription] = useState('');

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        try {
            const data = await api.getTodos();
            setTodos(data);
        } catch {
            toast.error('Failed to fetch todos');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) {
            toast.error('Title is required');
            return;
        }

        try {
            if (editingId) {
                await api.updateTodo(editingId, { title: editTitle, description: editDescription });
                toast.success('Todo updated');
                setEditingId(null);
                setEditTitle('');
                setEditDescription('');
            } else {
                await api.createTodo({ title, description });
                toast.success('Todo created');
                setTitle('');
                setDescription('');
            }
            fetchTodos();
        } catch {
            toast.error(editingId ? 'Failed to update todo' : 'Failed to create todo');
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await api.deleteTodo(id);
            toast.success('Todo deleted');
            fetchTodos();
        } catch {
            toast.error('Failed to delete todo');
        }
    };

    const handleToggle = async (todo: Todo) => {
        try {
            await api.toggleTodo(todo._id, !todo.done);
            fetchTodos();
        } catch {
            toast.error('Failed to update todo');
        }
    };

    const startEditing = (todo: Todo) => {
        setEditingId(todo._id);
        setEditTitle(todo.title);
        setEditDescription(todo.description || '');
    };

    const cancelEditing = () => {
        setEditingId(null);
        setEditTitle('');
        setEditDescription('');
    };

    return (
        <div className="app">
            <Toaster position="top-right" />

            <header className="header">
                <h1>Taska</h1>
                <p>Your personal task manager</p>
            </header>

            <form className="todo-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder={editingId ? "Edit title..." : "What needs to be done?"}
                    value={editingId ? editTitle : title}
                    onChange={(e) => editingId ? setEditTitle(e.target.value) : setTitle(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Description (optional)"
                    value={editingId ? editDescription : description}
                    onChange={(e) => editingId ? setEditDescription(e.target.value) : setDescription(e.target.value)}
                />
                <button type="submit">{editingId ? 'Update' : 'Add'}</button>
                {editingId && (
                    <button type="button" onClick={cancelEditing} className="cancel-btn">
                        Cancel
                    </button>
                )}
            </form>

            <div className="todo-list">
                {todos.map((todo) => (
                    <div key={todo._id} className={`todo-item ${todo.done ? 'done' : ''}`}>
                        <div className="todo-content">
                            <div className="todo-checkbox">
                                <input
                                    type="checkbox"
                                    checked={todo.done}
                                    onChange={() => handleToggle(todo)}
                                />
                            </div>
                            <div className="todo-text">
                                <h3>{todo.title}</h3>
                                {todo.description && <p>{todo.description}</p>}
                            </div>
                        </div>
                        <div className="todo-actions">
                            <button onClick={() => startEditing(todo)}>Edit</button>
                            <button onClick={() => handleDelete(todo._id)} className="delete-btn">
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="stats">
                <p>{todos.filter(t => !t.done).length} remaining • {todos.filter(t => t.done).length} completed</p>
            </div>
        </div>
    );
}

export default App;