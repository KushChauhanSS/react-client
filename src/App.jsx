import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {
  BrowserRouter, Switch,
} from 'react-router-dom';

import {
  Trainee, Login, TextFieldDemo, InputDemo, ChildrenDemo,
} from './pages/index';
import { AuthRoute, PrivateRoute } from './routes';
import { NotFound } from './pages/NotFound';
import { theme } from './theme';

function App() {
  return (
    <BrowserRouter>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <div className="App">
          <Switch>
            <AuthRoute exact path="/login" component={Login} />
            <PrivateRoute exact path="/" component={Trainee} />
            <PrivateRoute exact path="/text-field-demo" component={TextFieldDemo} />
            <PrivateRoute exact path="/input-demo" component={InputDemo} />
            <PrivateRoute exact path="/children-demo" component={ChildrenDemo} />
            <PrivateRoute component={NotFound} />
          </Switch>
        </div>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
