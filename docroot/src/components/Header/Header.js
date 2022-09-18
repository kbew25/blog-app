import React from "react";
import { Flex, Link, Button, Text, Heading, Box, Divider, useColorMode } from "theme-ui";
import { auth } from "../../services/firebase";
import { signOut } from "firebase/auth";
import ButtonLink from "../../theme/ButtonLink";

const Header = (user) => {
  const currentUser = user.user;
  const [colorMode, setColorMode] = useColorMode()

  return (
    <Box as="header">
      <Button
        onClick={(e) => {
          e.preventDefault();
          setColorMode(colorMode === 'default' ? 'dark' : 'default')
        }}
        sx={{
          lineHeight: 1,
          position: "absolute",
          top: 2,
          right: 2,
        }}
      >
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 512 512" fill="currentColor">
        <path d="M256 128c-70.692 0-128 57.308-128 128s57.308 128 128 128 128-57.308 128-128-57.308-128-128-128zM256 336v-160c44.112 0 80 35.888 80 80s-35.888 80-80 80zM256 416c17.673 0 32 14.327 32 32v32c0 17.673-14.327 32-32 32s-32-14.327-32-32v-32c0-17.673 14.327-32 32-32zM256 96c-17.673 0-32-14.327-32-32v-32c0-17.673 14.327-32 32-32s32 14.327 32 32v32c0 17.673-14.327 32-32 32zM480 224c17.673 0 32 14.327 32 32s-14.327 32-32 32h-32c-17.673 0-32-14.327-32-32s14.327-32 32-32h32zM96 256c0 17.673-14.327 32-32 32h-32c-17.673 0-32-14.327-32-32s14.327-32 32-32h32c17.673 0 32 14.327 32 32zM414.392 369.137l22.628 22.628c12.496 12.496 12.496 32.758 0 45.255-12.497 12.496-32.759 12.496-45.255 0l-22.628-22.628c-12.496-12.496-12.496-32.758 0-45.255 12.497-12.496 32.759-12.496 45.255 0zM97.608 142.863l-22.628-22.628c-12.497-12.497-12.497-32.758 0-45.255s32.758-12.497 45.255 0l22.628 22.628c12.497 12.497 12.497 32.758 0 45.255s-32.758 12.497-45.255 0zM414.392 142.863c-12.496 12.496-32.758 12.496-45.255 0-12.496-12.497-12.496-32.758 0-45.255l22.628-22.627c12.496-12.497 32.758-12.497 45.255 0 12.496 12.497 12.496 32.758 0 45.255l-22.628 22.627zM97.608 369.137c12.496-12.496 32.758-12.496 45.254 0 12.497 12.497 12.497 32.759 0 45.255l-22.627 22.628c-12.497 12.496-32.758 12.496-45.255 0-12.497-12.497-12.497-32.759 0-45.255l22.628-22.628z"></path>
        </svg>
      </Button>
      <Heading as="h1" mb={4} sx={{textAlign: 'center'}}><Link href="/" variant="plain">The Blog</Link></Heading>
      <Divider mb={4} />
      <Flex mb={4} sx={{ justifyContent: 'space-between', alignContent: 'center'}}>
        { currentUser && (
          <Flex>
            <ButtonLink href="/add-post" p={2} variant="tertiary" style={{ display: 'inline-flex'}}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="24"
    height="24" stroke="currentColor" fill="currentColor"><use xlinkHref="#icon-pencil"></use>
              <symbol id="icon-pencil"><path d="M84.375 0c8.629 0 15.625 6.996 15.625 15.625 0 3.518-1.163 6.763-3.125 9.375l-6.25 6.25-21.875-21.875 6.25-6.25c2.612-1.962 5.857-3.125 9.375-3.125zM6.25 71.875l-6.25 28.125 28.125-6.25 57.813-57.813-21.875-21.875-57.813 57.813zM69.881 35.506l-43.75 43.75-5.386-5.386 43.75-43.75 5.386 5.386z"></path></symbol></svg>
              <span style={{ marginLeft: '5px'}}>Create post</span>
            </ButtonLink>
          </Flex>
        )}
        <Flex sx={{
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}>
          { currentUser && (
            <Text pr={4}>Hello {currentUser.displayName}</Text>
          ) }
          { !currentUser ?
            <ButtonLink href="/login" p={2} ml={'auto'}>Login/Signup</ButtonLink>
            : <Button onClick={() => signOut(auth)}>Sign out</Button>
          }
        </Flex>
      </Flex>
    </Box>
  )
};

export default Header;
