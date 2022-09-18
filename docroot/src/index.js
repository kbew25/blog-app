import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { auth } from './services/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { Container, ThemeProvider } from 'theme-ui';
import { theme } from './theme/theme';

import Header from './components/Header/Header';

// Pages
import AddPost from './components/AddPost/AddPost';
import PostList from './pages/PostList';

/** @jsx jsx */
import { jsx } from 'theme-ui';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import PostPage from './pages/PostPage';

const App = () => {
  const [user, setUser] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  onAuthStateChanged(auth, (user) => {
    setUser(user);
    setIsLoaded(true)
  });

  const ProtectedRoute = ({ children }) => {
    return !user && isLoaded ? <Navigate to="/" replace /> : children
  };

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Container p={4}>
          <Header user={user} />

          <Routes>
            <Route index path="/" element={<PostList />} />
            <Route path="/add-post" element={
              <ProtectedRoute>
                <AddPost user={user}/>
              </ProtectedRoute>
            } />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/post/:id" element={<PostPage />} />
          </Routes>
        </Container>
      </Router>
    </ThemeProvider>
  );
};

// Create a root.
const root = ReactDOM.createRoot(document.getElementById('root'));
// Render app to root.
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

