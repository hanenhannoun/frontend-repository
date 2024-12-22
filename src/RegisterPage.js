import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';  
import './RegisterPage.css';  

function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const history = useHistory();  

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    try {
      await axios.post('http://localhost:3000/auth/register', {
        username,
        email,
        password,
      });
      alert('Registration successful');
      history.push('/login'); 
    } catch (error) {
      setErrorMessage('Error during registration');
    }
  };

  return (
    <div className="container register-page"> 
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <div>
          <label>Full Name:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
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
        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default RegisterPage;
