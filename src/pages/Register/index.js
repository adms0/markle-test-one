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

const Register = () => {
  // import link from react-router-dom
  const classes = useStyles();
  const [form, setForm] = useState({
    email: '',
    password: '',
    confirm_password: '',
  });

  // error for validation
  const [error, setError] = useState({
    email: '',
    password: '',
    confirm_password: '',
  });

  // submit disable text
  const [isSubmitting, setSubmitting] = useState(false);

  // call usefirebase
  const {auth, user, loading} = useFirebase();
  const {enqueueSnackbar} = useSnackbar();

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

    if (!form.confirm_password) {
      newError.confirm_password = 'Confirm Password is required';
    } else if (form.confirm_password !== form.password) {
      newError.confirm_password =
        'Confirm password does not match with password ';
    }
    return newError;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const findErros = validate();
    if (Object.values(findErros).some((err) => err !== '')) {
      setError(findErros);
    } else {
      try {
        setSubmitting(true);
        await auth.createUserWithEmailAndPassword(form.email, form.password);
        enqueueSnackbar(`User Has been Success to regist`, {
          autoHideDuration: 1000,
          variant: 'success',
        });
      } catch (e) {
        const newError = {};
        switch (e.code) {
          case 'auth/email-already-in-use':
            newError.email = 'Email is already registered';
            break;
          case 'auth/invalid-email':
            newError.email = 'Invalid email address';
            break;
          case 'auth/week-password':
            newError.password = 'Password is too week';
            break;
          case 'auth/operation-not-allowed':
            newError.email = 'Should confirm to your email';
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

  if (loading) {
    return <AppLoading />;
  }

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <Container maxWidth="xs">
      <Paper className={classes.paper}>
        <Typography className={classes.title} variant="h5" component="h1">
          Registration
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
            disabled={isSubmitting}
            error={error.email ? true : false}
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
            disabled={isSubmitting}
            error={error.password ? true : false}
          />
          <TextField
            id="confirm_passwoord"
            type="password"
            name="confirm_password"
            margin="normal"
            label="Confirm password"
            fullWidth
            required
            value={form.confirm_password}
            onChange={(e) => handleChange(e)}
            helperText={error.confirm_password}
            disabled={isSubmitting}
            error={error.confirm_password ? true : false}
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
                Register
              </Button>
            </Grid>
            <Grid item>
              <Button
                component={Link}
                variant="contained"
                size="large"
                to="/login"
              >
                Login{' '}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Register;
