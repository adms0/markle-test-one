import React, {useState} from 'react';
import {
  Container,
  Paper,
  Button,
  Typography,
  Grid,
  TextField,
} from '@material-ui/core';
import useStyles from './styles';
import {Link, Redirect} from 'react-router-dom';
import isEmail from 'validator/lib/isEmail';
import AppLoading from '../../Components/AppLoading/index';
// firebase hook
import {useFirebase} from '../../Components/FirebaseProvider';
import {useSnackbar} from 'notistack';

const Login = (props) => {
  const {location} = props;
  const classes = useStyles();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  // error for validation
  const [error, setError] = useState({
    email: '',
    password: '',
  });

  // submit disable text
  const [isSubmitting, setSubmitting] = useState(false);

  // call usefirebase
  const {auth, user, loading} = useFirebase();
  const {enqueueSnackbar} = useSnackbar();

  const validate = () => {
    const newError = {...error};
    if (!form.email) {
      newError.email = 'Email is required';
    } else if (!isEmail(form.email)) {
      newError.email = 'Email is not valid';
    }

    if (!form.password) {
      newError.password = 'Password is required';
    }
    return newError;
  };
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    setError({
      ...error,
      [e.target.name]: '',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const findErros = validate();
    if (Object.values(findErros).some((err) => err !== '')) {
      setError(findErros);
    } else {
      try {
        setSubmitting(true);
        await auth.signInWithEmailAndPassword(form.email, form.password);
        enqueueSnackbar(`Login Success`, {
          autoHideDuration: 1000,
          variant: 'success',
        });
      } catch (e) {
        const newError = {};
        console.log(e.code, '<<<<ecode');
        switch (e.code) {
          case 'auth/user-not-found':
            newError.email = 'Email not found';
            break;
          case 'auth/invalid-email':
            newError.email = 'Invalid email address';
            break;
          case 'auth/wrong-password':
            newError.password = 'Invalid password';
            break;
          case 'auth/user-disabled':
            newError.email = 'Your account has been disabled';
            break;
          default:
            newError.email = 'An error occurred. Please try again later';
            break;
        }
        // karena async harus di invoke
        setError(newError);
        setSubmitting(false);
      }
    }
  };

  // console.log(user, '<<<check usert authentication');

  if (loading) {
    return <AppLoading />;
  }

  if (user) {
    const redirectTo =
      location.state && location.state.from && location.state.from.pathname
        ? location.state.from.pathname
        : '/';
    return <Redirect to={redirectTo} />;
  }

  return (
    <Container maxWidth="xs">
      <Paper className={classes.paper}>
        <Typography className={classes.title} variant="h5" component="h1">
          Login
        </Typography>

        <form onSubmit={(e) => handleSubmit(e)} noValidate>
          <TextField
            id="email"
            type="email"
            name="email"
            margin="normal"
            label="Email address"
            fullWidth
            required
            value={form.email}
            onChange={(e) => handleChange(e)}
            helperText={error.email}
            error={error.email ? true : false}
            disabled={isSubmitting}
          />
          <TextField
            id="password"
            type="password"
            name="password"
            margin="normal"
            label="Password"
            fullWidth
            required
            value={form.password}
            onChange={(e) => handleChange(e)}
            helperText={error.password}
            error={error.password ? true : false}
            disabled={isSubmitting}
          />
          <Grid container className={classes.buttons}>
            <Grid item xs>
              <Button
                type="submit"
                color="primary"
                variant="contained"
                size="large"
              >
                {' '}
                Login
              </Button>
            </Grid>
            <Grid item>
              <Button
                component={Link}
                variant="contained"
                size="large"
                to="/register"
              >
                Register{' '}
              </Button>
            </Grid>
          </Grid>
          <div className={classes.forgotPassword}>
            <Typography component={Link} to="/forgot-password">
              Forgot Password
            </Typography>
          </div>
        </form>
      </Paper>
    </Container>
  );
};

export default Login;
