import React, { useEffect, useState } from "react";
import moment from 'moment';
import { Box, Button, Card, Flex, Heading, Alert, Link } from "theme-ui";
import { db, auth } from "../../services/firebase";
import { doc, getDoc, updateDoc } from 'firebase/firestore/lite';
import Author from "../Author/Author";
import RichText from "../RichText/RichText";
import { serialize } from "../../helpers/helpers";

const Post = ({
  title,
  body,
  date,
  uid,
  bodyObj,
  pid
}) => {
  const [author, setAuthor] = useState(null);
  const [editing, setEditing] = useState(false);
  const [content, setContent] = useState({
    body,
    bodyObj
  });
  const utc = new Date(date.seconds*1000);
  const formattedDate = moment(utc).format("D MMM Y");
  const [messages, setMessages] = useState('');
  const [isAuthor, setIsAuthor] = useState(null);

  useEffect(() => {
    getAuthor();
  })


  const getAuthor = async () => {
    if (uid) {
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setAuthor(docSnap.data());
      }

      if (auth.currentUser.uid) {
        setIsAuthor(auth.currentUser.uid == uid);
      }
    }
  }


  // Form submit.
  const handleSubmit = async (event) => {
    event.preventDefault();
    const userInput = {
      richText: JSON.parse(localStorage.getItem('content'))
    }

    const docRef = doc(db, "posts", pid);
    await updateDoc(docRef, userInput).then(() => {
      setMessages('Post updated');
      setEditing(false);
      setContent({
        body: userInput.richText?.map(node => serialize(node)),
        bodyObj: userInput.richText
      });
    }).catch((error) => {
      setMessages(error.message);
    });
  };

  return (
   <Card>
    { messages ? (
      <Alert mb={4}>{ messages }</Alert>
    ) : ''}
    {isAuthor && !editing && (
      <Button p={2} mb={4} variant="tertiary" onClick={() => {setEditing(current => !current)}}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="24"
height="24" stroke="currentColor" fill="currentColor"><use xlinkHref="#icon-pencil"></use>
        <symbol id="icon-pencil"><path d="M84.375 0c8.629 0 15.625 6.996 15.625 15.625 0 3.518-1.163 6.763-3.125 9.375l-6.25 6.25-21.875-21.875 6.25-6.25c2.612-1.962 5.857-3.125 9.375-3.125zM6.25 71.875l-6.25 28.125 28.125-6.25 57.813-57.813-21.875-21.875-57.813 57.813zM69.881 35.506l-43.75 43.75-5.386-5.386 43.75-43.75 5.386 5.386z"></path></symbol></svg>
        <span style={{ marginLeft: '5px'}}>Edit post</span>
      </Button>
    )}
    <Heading as="h1">{ title }</Heading>
    <Flex mb="4">
      {author && (<Author author={author} />) }
      <span>&nbsp;-&nbsp;</span>
      <time>{ formattedDate }</time>
    </Flex>

    { editing ? (
      <Box as="form" onSubmit={handleSubmit}>
        <RichText defaultValue={content.bodyObj} />
        <Button type="submit" mr={2} mt={4}>Update</Button>
        <Link href="#" onClick={(e) => {e.preventDefault(); setEditing(false)}}>Cancel</Link>
      </Box>
    ) : (
      <Box>
        {content.body}
      </Box>
    )}
   </Card>
  )
};

export default Post;
