import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTodos } from '../context/TodoContext';
import TodoForm from '../components/TodoForm';
import TodoList from '../components/TodoList';

const Dashboard = () => {
  const { user,formatNameFromEmail} = useAuth();
  const { todos, fetchTodos } = useTodos();

  useEffect(() => {
    fetchTodos();
  }, []);


  return (
    <div className="dashboard">
      <h1>Welcome {formatNameFromEmail(user?.email)}</h1>
      <TodoForm />
      <TodoList todos={todos} />
    </div>
  );
};

export default Dashboard;