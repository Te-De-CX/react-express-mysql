// Auth.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signin } from './authService';

const Auth: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      const response = await signin(username, password);
      console.log('Sign In Response:', response);
      // Store the token in localStorage
      localStorage.setItem('token', response.token);
      localStorage.setItem('username', username); // Store username for display
      navigate('/dashboard'); // Redirect to dashboard
    } catch (error) {
      console.error('Sign In Error:', error);
    }
  };

  

  return (
    <div>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignIn}>Sign In</button>
    </div>
  );
};

export default Auth;