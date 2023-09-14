import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import React from 'react';
import {ForgetPassword, Login, NotFound, Register} from './pages/index';
import Private from './pages/private';
import PrivateRoute from './Components/PrivateRoute';
import FirebaseProvider from './Components/FirebaseProvider';
import CssBaseline from '@material-ui/core/CssBaseline';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import theme from './Config/theme';
import {SnackbarProvider} from 'notistack';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider maxSnack={2} autoHideDuration={3500}>
        <FirebaseProvider>
          <Router>
            <Switch>
              <PrivateRoute exact path="/" component={Private} />
              <PrivateRoute path="/users" component={Private} />
              <Route path="/register" component={Register} />
              <Route path="/login" component={Login} />
              <Route path="/forgot-password" component={ForgetPassword} />
              <Route path="/not-found" component={NotFound} />
            </Switch>
          </Router>
        </FirebaseProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default App;
