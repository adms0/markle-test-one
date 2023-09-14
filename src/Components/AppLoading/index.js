import React from 'react';
import {CircularProgress} from '@material-ui/core';
import useStyles from './style';

const AppLoading = () => {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.backdrop} open>
        <CircularProgress />
      </div>
    </div>
  );
};

export default AppLoading;
