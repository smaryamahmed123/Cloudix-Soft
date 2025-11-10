import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  TextField,
  Button,
  Paper,
  Typography,
  Divider,
} from '@mui/material';
const ADMIN_LOGIN_URL = `${import.meta.env.VITE_ADMIN_LOGIN_URL}`;

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const token = query.get('token');
    const error = query.get('error');

    if (token) {
      localStorage.setItem('token', token);
      navigate('/dashboard');
    }

    if (error === 'unauthorized') {
      alert('You are not authorized to log in with this account.');
    }
  }, [navigate]);

  const handleLoginWithGoogle = () => {
    window.open('http://localhost:8000/api/auth/google/login', '_self');
  };

  const handleSignupWithGoogle = () => {
    window.open('http://localhost:8000/api/auth/google/signup', '_self');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(ADMIN_LOGIN_URL, form);
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      alert('Invalid credentials');
      console.error(err);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #2C3E50 40%, #18BC9C)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        px: 2,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 5,
          maxWidth: 420,
          width: '100%',
          borderRadius: 4,
          backgroundColor: '#ECF0F1',
          boxShadow: '0px 6px 20px rgba(0,0,0,0.15)',
        }}
      >
        <Typography
          variant="h5"
          sx={{
            mb: 3,
            color: '#2C3E50',
            textAlign: 'center',
            fontWeight: 700,
          }}
        >
          Admin Login
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            required
            sx={{ mb: 2 }}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            required
            sx={{ mb: 3 }}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              backgroundColor: '#2C3E50',
              color: '#fff',
              py: 1.2,
              fontWeight: 'bold',
              '&:hover': { backgroundColor: '#1E2C3A' },
            }}
          >
            Login
          </Button>
        </form>

        <Divider sx={{ my: 3 }}>or</Divider>

        <Button
          fullWidth
          variant="contained"
          onClick={handleLoginWithGoogle}
          sx={{
            backgroundColor: '#E74C3C',
            color: '#fff',
            fontWeight: 'bold',
            mb: 1,
            py: 1.2,
            '&:hover': { backgroundColor: '#C0392B' },
          }}
        >
          Login with Google
        </Button>

        <Button
          fullWidth
          variant="outlined"
          onClick={handleSignupWithGoogle}
          sx={{
            color: '#2C3E50',
            borderColor: '#2C3E50',
            fontWeight: 'bold',
            py: 1.2,
            '&:hover': {
              backgroundColor: '#ECF0F1',
              borderColor: '#18BC9C',
              color: '#18BC9C',
            },
          }}
        >
          Sign up with Google
        </Button>
      </Paper>
    </Box>
  );
};

export default Login;
