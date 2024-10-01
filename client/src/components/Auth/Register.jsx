import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/register', { name, email, password });
      navigate('/login');
    } catch (err) {
      console.error('Registration failed:', err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form className="bg-white p-6 rounded shadow-md" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-6">Register</h2>
        <input 
          type="text" 
          placeholder="Name" 
          className="border p-2 w-full mb-4" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
        />
        <input 
          type="email" 
          placeholder="Email" 
          className="border p-2 w-full mb-4" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
        <input 
          type="password" 
          placeholder="Password" 
          className="border p-2 w-full mb-4" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
        <button type="submit" className="bg-blue-500 text-white p-2 w-full">Register</button>
      </form>
    </div>
  );
};

export default Register;
