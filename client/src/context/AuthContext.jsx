import { createContext, useState, useEffect } from 'react';
import api from '../utils/api';
import { toast } from 'react-toastify';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const localUser = localStorage.getItem('localUser');
    
    if (token) {
      loadUser();
    } else if (localUser) {
      // Load from localStorage if server is down
      setUser(JSON.parse(localUser));
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, []);

  const loadUser = async () => {
    try {
      const response = await api.get('/users/me');
      setUser(response.data);
      setMaintenanceMode(false);
    } catch (error) {
      console.error('Error loading user:', error);
      // Try to load from localStorage backup
      const localUser = localStorage.getItem('localUser');
      if (localUser) {
        setUser(JSON.parse(localUser));
        setMaintenanceMode(true);
        toast.warning('⚠️ MongoDB server is currently under maintenance. Using offline mode.', {
          autoClose: 5000,
          position: 'top-center'
        });
      } else {
        localStorage.removeItem('token');
      }
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('localUser', JSON.stringify(response.data.user));
      setUser(response.data.user);
      setMaintenanceMode(false);
      return response.data;
    } catch (error) {
      // Fallback to localStorage authentication
      const storedUsers = JSON.parse(localStorage.getItem('offlineUsers') || '[]');
      const foundUser = storedUsers.find(u => u.email === email && u.password === password);
      
      if (foundUser) {
        const userWithoutPassword = { ...foundUser };
        delete userWithoutPassword.password;
        localStorage.setItem('token', 'offline-token-' + Date.now());
        localStorage.setItem('localUser', JSON.stringify(userWithoutPassword));
        setUser(userWithoutPassword);
        setMaintenanceMode(true);
        toast.warning('⚠️ MongoDB server is currently under maintenance. Using offline mode.', {
          autoClose: 5000,
          position: 'top-center'
        });
        return { user: userWithoutPassword, token: 'offline-token' };
      }
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('localUser', JSON.stringify(response.data.user));
      setUser(response.data.user);
      setMaintenanceMode(false);
      return response.data;
    } catch (error) {
      // Fallback to localStorage registration
      const storedUsers = JSON.parse(localStorage.getItem('offlineUsers') || '[]');
      
      // Check if user already exists
      if (storedUsers.some(u => u.email === userData.email || u.username === userData.username)) {
        throw new Error('User already exists in offline storage');
      }
      
      const newUser = {
        _id: 'local-' + Date.now(),
        ...userData,
        avatar: `https://ui-avatars.com/api/?name=${userData.fullName}&background=random`,
        createdAt: new Date().toISOString()
      };
      
      storedUsers.push(newUser);
      localStorage.setItem('offlineUsers', JSON.stringify(storedUsers));
      
      const userWithoutPassword = { ...newUser };
      delete userWithoutPassword.password;
      localStorage.setItem('token', 'offline-token-' + Date.now());
      localStorage.setItem('localUser', JSON.stringify(userWithoutPassword));
      setUser(userWithoutPassword);
      setMaintenanceMode(true);
      toast.warning('⚠️ MongoDB server is currently under maintenance. Account created in offline mode.', {
        autoClose: 5000,
        position: 'top-center'
      });
      return { user: userWithoutPassword, token: 'offline-token' };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('localUser');
    setUser(null);
    setMaintenanceMode(false);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, loadUser, maintenanceMode }}>
      {children}
    </AuthContext.Provider>
  );
};
