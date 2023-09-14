import {makeStyles} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    padding: theme.spacing(6),
    textAlign: 'center',
  },
  button: {
    marginTop: theme.spacing(1),
  },
}));

export default useStyles;
