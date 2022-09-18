import React from "react";
import { Box, Text } from "theme-ui";

const Author = ({author}) => {
  return (
    <Box>
      <Text>{ author.displayName }</Text>
    </Box>
  )
}

export default Author;
