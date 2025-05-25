import { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  // Properly destructure setTodos
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [];
  });

  // Example usage of setTodos
  const fetchTodos = async () => {
    try {
      const response = await api.get('/todos');
      setTodos(response.data); // ✅ Now works
    } catch (error) {
      console.error('Failed to fetch todos:', error);
    }
  };

  // ... rest of your functions (addTodo, deleteTodo, etc.)

  return (
    <TodoContext.Provider value={{ todos, setTodos, fetchTodos }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodos = () => useContext(TodoContext);