import React from 'react';
import logo from './logo.svg';
import {AppBar, Container, Toolbar} from '@mui/material';
import {Routes, Route} from 'react-router-dom';
import Articles from './components/routes/Articles';
import Article from './components/routes/Article';

function App() {
  return (
    <div>
      <AppBar position="sticky">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <img
              src={logo}
              style={{height: 30}}
              className="App-logo"
              alt="logo"
            />
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
