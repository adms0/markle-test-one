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
// notistack hook
import {useSnackbar} from 'notistack';

const ForgotPassword = () => {
  // import link from react-router-dom
  const classes = useStyles();
  const [form, setForm] = useState({
    email: '',
  });

  // error for validation
  const [error, setError] = useState({
    email: '',
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
        const actionCodeSettings = {
          url: `${window.location.origin}/login`,
        };
        await auth.sendPasswordResetEmail(form.email, actionCodeSettings);
        enqueueSnackbar(
          `Please check email sendbox ${form.email}. reset password has sent`,
          {variant: 'success'}
        );
        setSubmitting(false);
      } catch (e) {
        const newError = {};
        switch (e.code) {
          case 'auth/invalid-email':
            newError.email = 'Invalid email address';
            break;
          case 'auth/user-not-found':
            newError.password = 'Email address not found';
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
          <Grid container className={classes.buttons}>
            <Grid item xs>
              <Button
                type="submit"
                color="primary"
                variant="contained"
                size="large"
              >
                {' '}
                Send
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

export default ForgotPassword;
