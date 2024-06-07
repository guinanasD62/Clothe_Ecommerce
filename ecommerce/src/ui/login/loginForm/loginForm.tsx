"use client";

import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../../auth/auth-context';
import styles from '@/ui/login/loginForm/loginForm.module.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// const LoginForm = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const { login } = useAuth();
//   const router = useRouter();

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:4000/api/login', {
//         email,
//         password,
//       });
//       console.log('Login successful:', response.data);

//       // Dispatch the login action
//       login(response.data.token, response.data.user);
//       router.push('/customer/products')
//       // Handle successful login (e.g., redirect to another page)
//     } catch (error:any) {
//       console.error('Error logging in:', error);
//       if (error.response) {
//         // The request was made and the server responded with a status code
//         // that falls out of the range of 2xx
//         setError(error.response.data.message);
//       } else if (error.request) {
//         // The request was made but no response was received
//         setError('No response from server');
//       } else {
//         // Something happened in setting up the request that triggered an Error
//         setError('Error in login request');
//       }
//     }
//   };

//   return (
//     <form onSubmit={handleLogin} className={styles.form}>
//       <h1>Login</h1>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       <label>Email</label>
//       <input
//         type="text"
//         placeholder="Email"
//         name="email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />
//       <label>Password</label>
//       <input
//         type="password"
//         placeholder="Password"
//         name="password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       <button type="submit">Login</button>

//       <button> 
//         <Link href="/register">  Register
//         </Link>
//       </button>

//     </form>
//   );
// };

// export default LoginForm;



const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/login', { email, password });
      console.log('Login successful:', response.data);

      // Dispatch the login action
      login(response.data.token, response.data.user);
      router.push('/customer/products');
    } catch (error: any) {
      console.error('Error logging in:', error);
      if (error.response) {
        setError(error.response.data.message);
      } else if (error.request) {
        setError('No response from server');
      } else {
        setError('Error in login request');
      }
    }
  };

  return (
    <form onSubmit={handleLogin} className={styles.form}>
      <h1>Login</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <label>Email</label>
      <input
        type="email"
        placeholder="Email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label>Password</label>
      <input
        type="password"
        placeholder="Password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
      <br></br>
      <Link href="/register">
        Register
      </Link>
    </form>
  );
};

export default LoginForm;