import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { Trainee } from './pages/index';
import { theme } from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Trainee />
      </div>
    </ThemeProvider>
  );
}

export default App;
