'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Button, TextField, Typography } from '@mui/material';
import styles from './signIn.module.css';  

const SignIn = () => {
  const [username, setUsername] = useState('');  // Assuming you need username, not email, for login
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // State for handling errors
  const router = useRouter();

  const handleSignIn = async (event) => {
    event.preventDefault();
    setError(''); // Reset error before new attempt

    try {
      const response = await fetch(`http://127.0.0.1:5000/login?user=${username}&password=${password}`, {
        method: 'GET', // Using GET as per the documentation
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Sign-In Successful');
        router.push('/map'); // Navigate to the /map page after sign-in
      } else {
        setError(data.error || 'Login failed. Please try again.');
      }
    } catch (err) {
      console.error('Sign-In Error:', err);
      setError('Something went wrong. Please try again later.');
      setErrorColor('green'); 
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSignIn}
      className={styles.container}
    >
      <Typography
        variant="h4"
        component="h2"
        className={styles.heading}
      >
        Welcome To Campus Quest!
      </Typography>
      <Typography
        variant="subtitle1"
        component="h3"
        className={styles.subheading}
      >
        Please sign in to continue.
      </Typography>
      {error && (
        <Typography
          variant="body1"
          color="error"
          className={styles.error}
        >
          {error}
        </Typography>
      )}
      <TextField
        label="Username"
        variant="outlined"
        fullWidth
        margin="normal"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className={styles.input}
      />
      <TextField
        label="Password"
        type="password"
        variant="outlined"
        fullWidth
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className={styles.input}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 3 }}
      >
        Sign In
      </Button>
    </Box>
  );
};

export default SignIn;
