import { useState } from 'react';

export default function TodoForm({ addTodo, loading }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [validationError, setValidationError] = useState('');

    const charPct = title.length / 200;
    const charClass = charPct >= 1 ? 'over' : charPct >= 0.85 ? 'warn' : '';

    const handleSubmit = async (e) => {
        e.preventDefault();
        setValidationError('');
        const trimmedTitle = title.trim();

        if (!trimmedTitle) {
            setValidationError('Title is required.');
            return;
        }
        if (trimmedTitle.length > 200) {
            setValidationError('Title cannot exceed 200 characters.');
            return;
        }

        await addTodo(trimmedTitle, description.trim());
        setTitle('');
        setDescription('');
    };

    return (
        <form onSubmit={handleSubmit} className="todo-form">
            <div className="form-field" style={{ paddingBottom: '20px' }}>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="What needs to be done?"
                    disabled={loading}
                    maxLength={200}
                    style={{ paddingRight: '90px' }}
                />
                <div className={`char-count ${charClass}`}>
                    {title.length}/200
                </div>
            </div>

            <div className="form-field">
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description (optional)"
                    disabled={loading}
                    rows={2}
                />
            </div>

            {validationError && (
                <div className="validation-msg">{validationError}</div>
            )}

            <div className="form-actions">
                <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading || !title.trim() || title.length > 200}
                >
                    {loading
                        ? <><SpinnerIcon /> Adding…</>
                        : <><PlusIcon /> Add Task</>}
                </button>
            </div>
        </form>
    );
}

function PlusIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
    );
}

function SpinnerIcon() {
    return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ animation: 'spin 0.7s linear infinite' }}>
            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
        </svg>
    );
}
