// Dashboard.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem('username');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/'); // Redirect to login page
  };

  return (
    <div>
      <h2>Welcome, {username}!</h2>
      <p>You are now logged in.</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;