import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { ChildrenDemo } from './pages/index';
import { theme } from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <ChildrenDemo />
      </div>
    </ThemeProvider>
  );
}

export default App;
