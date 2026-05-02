import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { useTodos } from './hooks/useTodos';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

const FILTERS = ['all', 'active', 'done'];

function App() {
    const { todos, loading, error, setError, addTodo, editTodo, toggleDone, removeTodo } = useTodos();
    const [filter, setFilter] = useState('all');

    const activeCount = todos.filter(t => !t.done).length;
    const doneCount = todos.filter(t => t.done).length;

    const visibleTodos = todos.filter(t => {
        if (filter === 'active') return !t.done;
        if (filter === 'done') return t.done;
        return true;
    });

    return (
        <div className="app-shell">
            {/* Toast notifications */}
            <Toaster
                position="top-right"
                toastOptions={{
                    duration: 3000,
                    style: {
                        borderRadius: '12px',
                        background: '#fff',
                        color: '#12271e',
                        border: '1px solid rgba(46,139,87,0.15)',
                        boxShadow: '0 8px 24px rgba(46,139,87,0.14)',
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '14px',
                    },
                    success: {
                        iconTheme: { primary: '#2E8B57', secondary: '#fff' },
                    },
                    error: {
                        iconTheme: { primary: '#e53e3e', secondary: '#fff' },
                    },
                }}
            />

            {/* Sticky header */}
            <header className="app-header">
                <div className="header-inner">
                    <div className="header-logo">
                        <svg viewBox="0 0 24 24">
                            <path d="M9 11l3 3L22 4" />
                            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                        </svg>
                    </div>
                    <h1 className="header-title">Taska <span>task manager</span></h1>
                </div>
            </header>

            <main className="app-main">
                {/* Error banner */}
                {error && (
                    <div className="error-banner">
                        <span>⚠ {error}</span>
                        <button onClick={() => setError(null)}>Dismiss</button>
                    </div>
                )}

                {/* Form card */}
                <div className="glass-card">
                    <TodoForm addTodo={addTodo} loading={loading} />
                </div>

                {/* Filter bar */}
                <div className="filter-bar">
                    {FILTERS.map(f => (
                        <button
                            key={f}
                            className={`filter-btn ${filter === f ? 'active' : ''}`}
                            onClick={() => setFilter(f)}
                        >
                            {f === 'all' && 'All'}
                            {f === 'active' && <>Active {activeCount > 0 && <span className="filter-count">{activeCount}</span>}</>}
                            {f === 'done' && <>Done {doneCount > 0 && <span className="filter-count">{doneCount}</span>}</>}
                        </button>
                    ))}
                </div>

                {/* Todo list / loading */}
                {loading && todos.length === 0 ? (
                    <div className="loading-state">
                        <div className="spinner" />
                        <p>Loading your tasks…</p>
                    </div>
                ) : (
                    <TodoList
                        todos={visibleTodos}
                        filter={filter}
                        editTodo={editTodo}
                        toggleDone={toggleDone}
                        removeTodo={removeTodo}
                    />
                )}

                {/* Stats footer */}
                {todos.length > 0 && (
                    <div className="app-stats">
                        <span>
                            {activeCount} remaining · {doneCount} completed · {todos.length} total
                        </span>
                    </div>
                )}
            </main>
        </div>
    );
}

export default App;
