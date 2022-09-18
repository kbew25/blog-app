import React, { useState } from 'react';
import { auth, db } from '../../services/firebase';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { collection, doc, setDoc  } from 'firebase/firestore/lite';

import {
  Label,
  Input,
  Box,
  Button,
  Alert,
} from 'theme-ui';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState('');

  // Form submit.
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userInput = {
      displayName: `${data.get('firstName')} ${data.get('lastName')}`,
      email: data.get('email'),
      password: data.get('password'),
    };

    createUserWithEmailAndPassword(auth, userInput.email, userInput.password)
      .then((userCredential) => {
        // Signed in
        const { user } = userCredential;
        updateProfile(user, {
          displayName: userInput.displayName,
        });

        const newUser = {
          displayName: userInput.displayName,
          email: user.email,
          uid: user.uid,
        };

        setDoc(doc(collection(db, "users"), user.uid), newUser);
        setErrors('');
        navigate('/');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);

        if (errorCode == 'auth/user-not-found') {
          setErrors('User not found.')
        } else {
          setErrors(errorMessage);
        }
      });
  };

  return (
    <Box as="form" onSubmit={handleSubmit}>
      { errors ? (
        <Alert variant='secondary' mb={2}>{ errors }</Alert>
      ) : ''}
      <Label htmlFor="firstName">First Name</Label>
      <Input
        autoComplete="given-name"
        name="firstName"
        required
        id="firstName"
      />
      <Label htmlFor="lastName">Last Name</Label>
      <Input
        required
        id="lastName"
        name="lastName"
        autoComplete="family-name"
      />
      <Label htmlFor="email">Email</Label>
      <Input type="email" required
        id="email"
        name="email"
        autoComplete="email" mb={3} />
      <Label htmlFor="password">Password</Label>
      <Input type="password" name="password" id="password" autoComplete="new-password" mb={3} />
      <Button type="submit">Submit</Button>
    </Box>
  )
};

export default Signup;
