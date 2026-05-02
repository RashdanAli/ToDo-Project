import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { fetchTodos, createTodo, updateTodo, toggleDone as apiToggleDone, deleteTodo } from '../api/todos';

export function useTodos() {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadTodos();
    }, []);

    const loadTodos = async () => {
        try {
            setLoading(true);
            const data = await fetchTodos();
            setTodos(data);
            setError(null);
        } catch (err) {
            const msg = err.message || 'Failed to fetch todos';
            setError(msg);
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    };

    const addTodo = async (title, description) => {
        const tempId = `temp_${Date.now()}`;
        const optimistic = { _id: tempId, title, description, done: false };
        const previous = [...todos];

        setTodos([optimistic, ...todos]);

        try {
            const created = await createTodo({ title, description });
            setTodos(curr => curr.map(t => t._id === tempId ? created : t));
            toast.success('Task added!');
        } catch (err) {
            setTodos(previous);
            const msg = err.message || 'Failed to add task';
            setError(msg);
            toast.error(msg);
        }
    };

    const editTodo = async (id, title, description) => {
        const previous = [...todos];
        setTodos(curr => curr.map(t => t._id === id ? { ...t, title, description } : t));

        try {
            const updated = await updateTodo(id, title, description);
            setTodos(curr => curr.map(t => t._id === id ? updated : t));
            toast.success('Task updated!');
        } catch (err) {
            setTodos(previous);
            const msg = err.message || 'Failed to update task';
            setError(msg);
            toast.error(msg);
        }
    };

    const toggleDone = async (id) => {
        const previous = [...todos];
        setTodos(curr => curr.map(t => t._id === id ? { ...t, done: !t.done } : t));

        try {
            const updated = await apiToggleDone(id);
            setTodos(curr => curr.map(t => t._id === id ? updated : t));
            const isDone = updated.done;
            toast.success(isDone ? 'Task completed! ✓' : 'Task reopened');
        } catch (err) {
            setTodos(previous);
            const msg = err.message || 'Failed to update task';
            setError(msg);
            toast.error(msg);
        }
    };

    const removeTodo = async (id) => {
        const previous = [...todos];
        setTodos(curr => curr.filter(t => t._id !== id));

        try {
            await deleteTodo(id);
            toast.success('Task deleted');
        } catch (err) {
            setTodos(previous);
            const msg = err.message || 'Failed to delete task — please try again';
            setError(msg);
            toast.error(msg);
        }
    };

    return { todos, loading, error, setError, addTodo, editTodo, toggleDone, removeTodo };
}
