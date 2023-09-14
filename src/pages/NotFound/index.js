import React from 'react';
import {Paper, Container, Typography, Button} from '@material-ui/core';
import {Link} from 'react-router-dom';
import useStyles from './styles';

const NotFound = () => {
  const classes = useStyles();

  return (
    <Container maxWidth="xs">
      <Paper className={classes.paper}>
        <Typography variant="h6">Page Not Found</Typography>
        <Typography variant="h2">404</Typography>
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          component={Link}
          to="/"
        >
          Back
        </Button>
      </Paper>
    </Container>
  );
};

export default NotFound;
