"use client"

import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface User {

  username: string;
  email: string;
  password: string;
  plainpassword: string;
  phone: string;
  address: string;
  img?: string;
  isAdmin?: boolean;
  isActive?: boolean;
}

const Register: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<User>({
    username: '',
    email: '',
    password: '',
    plainpassword: '',
    phone: '',
    address: ''
  });

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   setFormData(prevState => ({
  //     ...prevState,
  //     [name]: value
  //   }));
  // };

  // //axios
  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   try {
  //     const response = await axios.post('http://localhost:4000/users', formData);
  //     console.log('Registration successful:', response.data);
  //     router.push('/login')
  //   } catch (error) {
  //     console.error('Error registering user:', error);
  //   }
  // };


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'password') {
      const [password, plainpassword] = value.split(' ');
      setFormData(prevState => ({
        ...prevState,
        password: password || '',
        plainpassword: plainpassword || ''
      }));
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const modifiedFormData = {
        ...formData,
        password: formData.password,
        plainpassword: formData.plainpassword
      };
      const response = await axios.post('http://localhost:4000/users', modifiedFormData);
      console.log('Registration successful:', response.data);
      router.push('/login');
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
        <Typography variant="h4" component="h1" gutterBottom>
          Register
        </Typography>
        <Box component="form" onSubmit={handleSubmit} width="100%">
          <TextField
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Password"
            name="password"
            type="text"
            value={`${formData.password} ${formData.plainpassword}`}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Phone Number"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <Box mt={3}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Register
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Register;
