import React from 'react';
import logo from './logo.svg';
import {AppBar, Container, Toolbar} from '@mui/material';
import {Routes, Route, Link} from 'react-router-dom';
import Articles from './components/routes/Articles/Articles';
import Article from './components/routes/Article/Article';

function App() {
  return (
    <div>
      <AppBar style={{height: '7vh'}} position="sticky">
        <Container maxWidth="xl">
          <Toolbar style={{minHeight: '7vh'}} disableGutters>
            <Link to="/">
              <img src={logo} style={{height: '4vh'}} alt="logo" />
            </Link>
          </Toolbar>
        </Container>
      </AppBar>

      <Routes>
        <Route path="article/:id" Component={Article} />
        <Route path="/" Component={Articles} />
      </Routes>
    </div>
  );
}

export default App;
