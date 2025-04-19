import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
// src/pages/LoginPage.tsx
const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const {login: authLogin} = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
  
    try {
      // Call the backend login endpoint
      const response = await axios.post('http://127.0.0.1:8000/api/login/', { username, password });
      const { access, refresh } = response.data;
  
      // Store tokens in localStorage
      localStorage.setItem('token', access);
      localStorage.setItem('refreshToken', refresh);
  
      // Update the AuthContext state
      authLogin(access, refresh);
  
      // Redirect to the product listing page
      navigate('/products');
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form className="bg-white p-8 rounded-lg shadow-md w-full max-w-md" onSubmit={handleLogin}>
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        {error && 
          <div className="mx-auto flex max-w-sm items-center 
          gap-x-4 rounded-xl bg-white p-6 shadow-lg outline 
          outline-black/5 dark:bg-red-400
          dark:shadow-none dark:-outline-offset-1
        dark:outline-white/10">
            <div>
              <div className="text-xl font-medium  text-black">Error</div>
              <p className="text-white">{error}</p>
            </div>
          </div>
        }

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Username</label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;