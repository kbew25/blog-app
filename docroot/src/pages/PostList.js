import { useEffect, useState } from "react";
import { db } from "../services/firebase";
import { collection, getDocs, orderBy, query } from 'firebase/firestore/lite';

import Post from "../components/Post/Teaser";
import { Box, Flex, Spinner } from "theme-ui";
/** @jsx jsx */
import { jsx } from 'theme-ui';
import { plainText } from "../helpers/helpers";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    const data = [];
    const q = query(collection(db, "posts"), orderBy("date", "desc"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      data.push({...doc.data(), ...{id: doc.id}});
    });

    setPosts(data);
    setIsLoading(false);
  };

  return (
    <Box>
      { isLoading && (
        <Flex p={6} sx={{ justifyContent: 'center' }}>
          <Spinner />
        </Flex>
      )}
      {!posts.length && !isLoading ? (
        <h2>No Blog Posts Found</h2>
      ) : (
        <ul
          sx={{
            listStyle: 'none',
            m: 0,
            p: 0,
          }}>
            {
              posts.map((post, index) => (
                <li
                  key={index}
                  sx={{
                    mb: 4,
                    listStyle: 'none',
                  }}>
                  <Post
                    id={ post.id }
                    title={ post.title }
                    body={ post.richText && post.richText[0] ?
                      (post.richText.map(node => `${plainText(node)}\n`))
                     : post.body }
                    date={ post.date }
                    uid={ post.uid }
                    display="teaser"
                    slug={ post.slug }
                  />
                </li>
              ))
            }
        </ul>
      )}
    </Box>
  )
};

export default PostList;
