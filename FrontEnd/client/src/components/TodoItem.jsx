import { useState, useEffect } from 'react';

export default function TodoItem({ todo, editTodo, toggleDone, removeTodo }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(todo.title);
    const [editDesc, setEditDesc] = useState(todo.description || '');
    const [isRemoving, setIsRemoving] = useState(false);

    useEffect(() => {
        if (!isEditing) {
            setEditTitle(todo.title);
            setEditDesc(todo.description || '');
        }
    }, [todo.title, todo.description, isEditing]);

    const handleSave = () => {
        if (!editTitle.trim()) return;
        editTodo(todo._id, editTitle.trim(), editDesc.trim());
        setIsEditing(false);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
            setIsEditing(false);
            setEditTitle(todo.title);
            setEditDesc(todo.description || '');
        } else if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
            handleSave();
        }
    };

    const handleDelete = () => {
        if (!window.confirm('Delete this task? This cannot be undone.')) return;
        // Fade-out animation before removing
        setIsRemoving(true);
        setTimeout(() => removeTodo(todo._id), 200);
    };

    if (isEditing) {
        return (
            <div className="todo-item editing">
                <div className="edit-fields">
                    <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Task title"
                        autoFocus
                        maxLength={200}
                    />
                    <textarea
                        value={editDesc}
                        onChange={(e) => setEditDesc(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Description (optional)"
                        rows={2}
                    />
                    <div className="edit-actions">
                        <button
                            className="btn-save"
                            onClick={handleSave}
                            disabled={!editTitle.trim()}
                        >
                            Save
                        </button>
                        <button
                            className="btn-cancel-inline"
                            onClick={() => {
                                setIsEditing(false);
                                setEditTitle(todo.title);
                                setEditDesc(todo.description || '');
                            }}
                        >
                            Cancel
                        </button>
                        <span style={{ fontSize: '11px', color: 'var(--text-muted)', marginLeft: 'auto', alignSelf: 'center' }}>
                            Ctrl+Enter to save · Esc to cancel
                        </span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={`todo-item ${todo.done ? 'done' : ''} ${isRemoving ? 'removing' : ''}`}>
            {/* Custom Checkbox */}
            <div className="todo-checkbox-wrap">
                <label className="todo-checkbox">
                    <input
                        type="checkbox"
                        checked={todo.done}
                        onChange={() => toggleDone(todo._id)}
                    />
                    <div className="todo-checkbox-box">
                        <svg viewBox="0 0 24 24">
                            <polyline points="20 6 9 17 4 12" />
                        </svg>
                    </div>
                </label>
            </div>

            {/* Text */}
            <div className="todo-body">
                <div className="todo-title">{todo.title}</div>
                {todo.description && (
                    <div className="todo-desc">{todo.description}</div>
                )}
            </div>

            {/* Actions */}
            <div className="todo-actions">
                <button className="btn-icon" onClick={() => setIsEditing(true)} title="Edit task">
                    ✏️
                </button>
                <button className="btn-danger" onClick={handleDelete} title="Delete task">
                    🗑
                </button>
            </div>
        </div>
    );
}
