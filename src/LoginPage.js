import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';  
import './LoginPage.css'; 

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const history = useHistory();  

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/auth/login', {
        email,
        password,
      });
      localStorage.setItem('access_token', response.data.access_token);
      alert('Login successful');
      history.push('/tasks');  
    } catch (error) {
      setErrorMessage('Invalid credentials');
    }
  };

  return (
    <div className="container login-page"> 
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
