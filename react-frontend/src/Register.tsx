import {useState} from 'react'
// import { useNavigate } from 'react-router-dom';
import { signup } from './authService';

export default function Register() {
    const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
    const handleSignUp = async () => {
        try {
          const response = await signup(username, password);
          console.log('Sign Up Response:', response);
          alert('Sign up successful! Please sign in.');
        } catch (error) {
          console.error('Sign Up Error:', error);
        }
      };

  return (
    <>
        <h2>Register</h2>
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
        onChange={(e) => setPassword(e.target.value)}/>
        <button onClick={handleSignUp}>Sign Up</button>
    </>
  )
}
