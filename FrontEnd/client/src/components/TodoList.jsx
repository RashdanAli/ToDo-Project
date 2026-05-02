import TodoItem from './TodoItem';

export default function TodoList({ todos, editTodo, toggleDone, removeTodo, filter }) {
    if (!todos || todos.length === 0) {
        const messages = {
            all: { icon: '📋', title: 'No tasks yet.', sub: 'Add one above to get started!' },
            active: { icon: '✅', title: 'No active tasks!', sub: 'Everything is done — great work.' },
            done: { icon: '🎉', title: 'Nothing completed yet.', sub: 'Check off a task to see it here.' },
        };
        const msg = messages[filter] || messages.all;

        return (
            <div className="empty-state">
                <div className="empty-state-icon">{msg.icon}</div>
                <p>{msg.title}</p>
                <small>{msg.sub}</small>
            </div>
        );
    }

    return (
        <div className="todo-list">
            {todos.map(todo => (
                <TodoItem
                    key={todo._id}
                    todo={todo}
                    editTodo={editTodo}
                    toggleDone={toggleDone}
                    removeTodo={removeTodo}
                />
            ))}
        </div>
    );
}
