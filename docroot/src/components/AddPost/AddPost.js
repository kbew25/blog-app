import React, { useState } from "react";
import { db } from '../../services/firebase';
import { collection, doc, setDoc, serverTimestamp } from 'firebase/firestore/lite';

import {
  Label,
  Input,
  Box,
  Button,
  // Textarea,
  Alert,
} from 'theme-ui';
import RichText from "../RichText/RichText";

const AddPost = (user) => {
  const [messages, setMessages] = useState('');
  const currentUser = user.user;

  function convertToSlug(Text) {
    return Text.toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
  }

  // Form submit.
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const userInput = {
      title: data.get('title'),
      // body: data.get('body'),
      date: serverTimestamp(),
      uid: currentUser.uid,
      richText: JSON.parse(localStorage.getItem('content')),
      slug: convertToSlug(data.get('title'))
    }

    await setDoc(doc(collection(db, "posts")), userInput).then(() => {
      setMessages('Post submitted');
    }).catch((error) => {
      setMessages(error.message);
    });
  };

  return (
    <>
      { messages ? (
        <Alert mb={4}>{ messages }</Alert>
      ) : ''}
      <Box as="form" onSubmit={handleSubmit}>
        <Label htmlFor="title">Post Title</Label>
        <Input
          name="title"
          required
          id="title"
          placeholder="Title..."
          />
        <Label htmlFor="body">Post</Label>
        {/* <Textarea name="body" id="body" rows={6} mb={3} /> */}
        <RichText />
        <Button mt={4} type="submit">Submit</Button>
      </Box>
    </>
  );
};

export default AddPost;
