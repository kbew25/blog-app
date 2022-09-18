import React, { useState } from 'react';
import { auth } from '../../services/firebase';
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

import {
  Label,
  Input,
  Box,
  Button,
  Alert,
  Link
} from 'theme-ui';

const Login = () => {
  const [errors, setErrors] = useState('');
  const navigate = useNavigate();
  // Form submit.
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userInput = {
      email: data.get('email'),
      password: data.get('password'),
    };
    // Clear errors.
    setErrors('');

    signInWithEmailAndPassword(auth, userInput.email, userInput.password)
      .then(() => {
          navigate('/');
        }
      )
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        if (errorCode == 'auth/user-not-found') {
          setErrors('User not found.')
        } else {
          setErrors(errorMessage);
        }
      });
  };

  return (
      <Box as="form" onSubmit={handleSubmit} noValidate>
       { errors ? (
        <Alert variant='secondary' mb={2}>{ errors }</Alert>
      ) : ''}
      <Label htmlFor="email">Email</Label>
      <Input type="email" required
        id="email"
        name="email"
        autoComplete="email" mb={3} />
      <Label htmlFor="password">Password</Label>
      <Input type="password" name="password" id="password" required mb={3} />
      <Button type="submit">Sign in</Button>
      <p>Not yet a member? <Link href="/signup">Signup here</Link></p>
    </Box>
  )
};

export default Login;
