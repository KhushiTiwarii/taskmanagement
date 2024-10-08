// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const { data } = await axios.post('https://taskmanagement-eosin.vercel.app/api/auth/login', { email, password });
//       localStorage.setItem('token', data.token);
//       navigate('/tasks');
//     } catch (err) {
//       console.error('Login failed:', err);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <form className="bg-white p-6 rounded shadow-md" onSubmit={handleSubmit}>
//         <h2 className="text-2xl font-bold mb-6">Login</h2>
//         <input 
//           type="email" 
//           placeholder="Email" 
//           className="border p-2 w-full mb-4" 
//           value={email} 
//           onChange={(e) => setEmail(e.target.value)} 
//         />
//         <input 
//           type="password" 
//           placeholder="Password" 
//           className="border p-2 w-full mb-4" 
//           value={password} 
//           onChange={(e) => setPassword(e.target.value)} 
//         />
//         <button type="submit" className="bg-blue-500 text-white p-2 w-full">Login</button>
//       </form>
//     </div>
//   );
// };

// export default Login;


import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Import Link
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('https://taskmanagement-eosin.vercel.app/api/auth/login', { email, password });
      localStorage.setItem('token', data.token);
      navigate('/tasks');
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form className="bg-white p-6 rounded shadow-md" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-6">Login</h2>
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
        <button type="submit" className="bg-blue-500 text-white p-2 w-full">Login</button>
        {/* Add the sign-up link below the button */}
        <p className="mt-4 text-center">
          Don't have an account? 
          <Link to="/register" className="text-blue-500 hover:underline ml-1">Sign up</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
