import React, { useState } from 'react';
import axios from 'axios';

const Auth = ({ setToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isLogin ? 'http://localhost:5000/api/auth/login' : 'http://localhost:5000/api/auth/register';
    try {
      const response = await axios.post(url, { email, password });
      setToken(response.data.token);
    } catch (error) {
      alert(error.response.data)
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='form'>
      <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
      <input type="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <button type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
      <button type="button" onClick={() => setIsLogin(!isLogin)}>
        Switch to {isLogin ? 'Sign Up' : 'Login'}
      </button>
    </form>
  );
};

export default Auth;