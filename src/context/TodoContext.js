import { createContext, useContext, useState } from 'react';
import api from '../services/api';

const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [];
  });

  // Backend से todos fetch करना
  const fetchTodos = async () => {
    try {
      const response = await api.get('/tasks');
      setTodos(response.data);
    } catch (error) {
      console.error('Failed to fetch todos:', error);
    }
  };

  // नया todo backend में add करना
  const addTodo = async (description) => {
    try {
      const response = await api.post('/tasks', { description });
      setTodos(prev => [...prev, response.data]);
    } catch (error) {
      console.error('Failed to add todo:', error);
    }
  };

  return (
    <TodoContext.Provider value={{ todos, setTodos, fetchTodos, addTodo }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodos = () => useContext(TodoContext);


// new joda he