import { useTodos } from '../context/TodoContext';

const TodoList = () => {
  const { todos, deleteTodo, updateTodo } = useTodos();

  return (
    <div className="todo-list">
      {todos.map((todo) => (
        <div key={todo._id} className="todo-item">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => updateTodo(todo._id, { completed: !todo.completed })}
          />
          <input
            type="text"
            value={todo.text}
            onChange={(e) => updateTodo(todo._id, { text: e.target.value })}
          />
          <button onClick={() => deleteTodo(todo._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default TodoList;