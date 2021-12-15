import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {
  BrowserRouter, Switch, Route, Redirect,
} from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';

import {
  Trainee, Login, TextFieldDemo, InputDemo, ChildrenDemo,
} from './pages/index';
import { AuthRoute, PrivateRoute } from './routes';
import { NotFound } from './pages/NotFound';
import { theme } from './theme';
import { SnackBarProvider } from './contexts';
import apolloClient from './libs/apollo-client';

function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <BrowserRouter>
        <CssBaseline />
        <ThemeProvider theme={theme}>
          <SnackBarProvider>
            <div className="App">
              <Switch>
                <Route exact path="/">
                  <Redirect to="/login" />
                </Route>
                <AuthRoute exact path="/login" component={Login} />
                <PrivateRoute path="/trainee" component={Trainee} />
                <PrivateRoute exact path="/text-field-demo" component={TextFieldDemo} />
                <PrivateRoute exact path="/input-demo" component={InputDemo} />
                <PrivateRoute exact path="/children-demo" component={ChildrenDemo} />
                <PrivateRoute path="*" component={NotFound} />
              </Switch>
            </div>
          </SnackBarProvider>
        </ThemeProvider>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
