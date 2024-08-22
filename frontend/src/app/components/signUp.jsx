'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Box, Button, TextField, Typography } from '@mui/material';
import styles from './signUp.module.css';  // Import your module CSS (you can reuse signIn.module.css or create a new one)

const SignUp = ({ theme }) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSignUp = (event) => {
    event.preventDefault();
    console.log("Sign-Up Simulated");
    router.push('/'); // Navigate to the homepage after sign-up
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
