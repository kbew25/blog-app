import React, { useEffect, useState } from "react";
import { Box, Flex, Spinner } from "theme-ui";
import { db } from "../services/firebase";
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore/lite';
import { useParams } from "react-router-dom";
import Post from "../components/Post/Full";
import { serialize } from "../helpers/helpers";

const PostPage = () => {
  let { id } = useParams();
  const [post, setPost] = useState(null);
  const [pid, setPid] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getPost();
  })

  const getPost = async () => {
    if (id) {
      let postDoc = null;
      const posts = collection(db, "posts");
      const q = query(posts, where("slug", "==", id));
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        postDoc = doc.data();
        setPid(doc.id);
      });

      const docRef = doc(db, "posts", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        postDoc = docSnap.data();
      }
      setPost(postDoc);
      setIsLoading(false);
    }
  }

  return (
   <Box mb={4}>
    { isLoading && (
      <Flex p={6} sx={{ justifyContent: 'center' }}>
        <Spinner />
      </Flex>
    )}
    { post && (
      <Post
        key="1"
        id={ post.id }
        pid={ pid }
        title={ post.title }
        body={ post.richText[0] ?
          (post.richText.map(node => serialize(node)))
         : post.body }
        bodyObj={ post.richText[0] && post.richText }
        date={ post.date }
        uid={ post.uid }
      />
    )}
    </Box>
  )
};

export default PostPage;
