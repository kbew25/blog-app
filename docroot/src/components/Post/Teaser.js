import React, { useEffect, useState } from "react";
import moment from 'moment';
import { Box, Card, Flex, Heading, Link } from "theme-ui";
import { db } from "../../services/firebase";
import { doc, getDoc } from 'firebase/firestore/lite';
import Author from "../Author/Author";

const Post = ({
  id,
  title,
  body,
  date,
  uid,
  slug = id,
}) => {
  const [author, setAuthor] = useState(null);
  const utc = new Date(date.seconds*1000);
  const formattedDate = moment(utc).format("D MMM Y");
  const newBody = body && typeof body === 'object' ? body.join(' ') : body;
  const excerpt = newBody && newBody.length > 50 ? newBody.substring(0, 50) + "..." : newBody;

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
    }
  }

  return (
    <Card mb={4}>
      <Heading as="h2" mb={3}><Link variant="plain" href={`/post/${slug}`}>{ title }</Link></Heading>
      <Box mb="4">
        { excerpt }
      </Box>
      <Flex>
        {author && (<Author author={author} />) }
        <span>&nbsp;-&nbsp;</span>
        <time>{ formattedDate }</time>
      </Flex>
    </Card>
  )
};

export default Post;
