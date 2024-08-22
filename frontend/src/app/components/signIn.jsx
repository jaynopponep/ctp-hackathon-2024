'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Box, Button, TextField, Typography } from '@mui/material';
import styles from './signIn.module.css';  // Import your module CSS

const SignIn = ({ theme }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSignIn = (event) => {
    event.preventDefault();
    console.log("Sign-In Simulated");
    router.push('/'); // Navigate to the homepage after sign-in
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
        Sign In
      </Button>
    </Box>
  );
};

export default SignIn;
