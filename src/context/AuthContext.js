import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api'; // Instead of axios

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

// In your AuthProvider component
const login = async (email, password) => {
  try {
    const response = await api.post('/auth/login', { email, password });
    localStorage.setItem('token', response.data.token);
    setUser({ email });
    navigate('/dashboard');
  } catch (error) {
    console.error('Login failed:', error.response?.data?.message || error.message);
  }
};

const register = async (email, password) => {
  try {
    await api.post('/auth/register', { email, password });
    navigate('/login');
  } catch (error) {
    console.error('Registration failed:', error.response?.data?.message || error.message);
  }
};

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);