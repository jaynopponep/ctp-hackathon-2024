'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Button, TextField, Typography } from '@mui/material';
import styles from './signUp.module.css';  

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // State for handling errors
  const [errorColor, setErrorColor] = useState(''); // State for error color
  const router = useRouter();

  const handleSignUp = async (event) => {
    event.preventDefault();
    setError(''); // Reset error before new attempt
    setErrorColor(''); // Reset error color

    try {
      const response = await fetch(`http://localhost:5000/sign-up?user=${username}&email=${email}&password=${password}`, {
        method: 'GET', // Using GET as per the provided documentation
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Sign-Up Successful');
        router.push('/'); // Navigate to the homepage after sign-up
      } else {
        setError(data.error || 'Sign-up failed. Please try again.');
        setErrorColor(response.status >= 500 ? 'orange' : 'red'); // Set color based on status code
      }
    } catch (err) {
      console.error('Sign-Up Error:', err);
      setError('Something went wrong. Please try again later.');
      setErrorColor('orange'); // Set color for unexpected errors
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSignUp}
      className={styles.container}
    >
      <Typography
        variant="h4"
        component="h2"
        className={styles.heading}
      >
        Join Campus Quest!
      </Typography>
      <Typography
        variant="subtitle1"
        component="h3"
        className={styles.subheading}
      >
        Create an account to get started.
      </Typography>
      {error && (
        <Typography
          variant="body1"
          style={{ color: 'blue' }} // Apply the error color here
          className={styles.error}
        >
          {error}
        </Typography>
      )}
      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={styles.input}
      />
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
        Sign Up
      </Button>
    </Box>
  );
};

export default SignUp;