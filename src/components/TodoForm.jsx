import { useState } from 'react';
import { useTodos } from '../context/TodoContext';
//  Tthis is testing 

const TodoForm = () => {
  const [text, setText] = useState('');
  const { addTodo } = useTodos();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    await addTodo(text);
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add new todo"
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default TodoForm;
//test