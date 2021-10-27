import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Trainee } from './pages/index';
import { theme } from './theme';

function App() {
  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <div className="App">
          <Trainee />
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
