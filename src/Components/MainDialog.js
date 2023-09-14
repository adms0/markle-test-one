import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  actionButton: {
    minWidth: 100,
    margin: 12,
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
}));

export const MainDialog = (props) => {
  const c = useStyles();

  return (
    <Dialog
      open={props.open}
      fullWidth={true}
      fullScreen={props.fullScreen || false}
      maxWidth={props.maxWidth ? props.maxWidth : 'sm'}
      aria-labelledby="form-dialog-title"
      PaperProps={{
        style: {
          borderRadius: 20,
          zIndex: 200,
        },
      }}
    >
      <DialogTitle disableTypography style={{padding: '16px 24px'}}>
        <Typography variant="h6">
          <b>{props.title}</b>
        </Typography>
        <IconButton
          aria-label="close"
          className={c.closeButton}
          onClick={props.onCancel}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers={props.showDivider}>
        {props.children}
      </DialogContent>
      <DialogActions className={c.flexEnd}>
        {props.hideCancelButton ? null : (
          <Button
            className={c.actionButton}
            disableElevation
            variant={'outlined'}
            color={'primary'}
            onClick={props.onCancel}
          >
            {props.cancelLabel ? props.cancelLabel : 'Cancel'}
          </Button>
        )}
        <Button
          style={{
            minWidth: 150,
            backgroundColor: '#EF2531',
          }}
          disabled={props.disabledOkButton}
          className={c.actionButton}
          disableElevation
          variant={
            props.submitButtonVariant ? props.submitButtonVariant : 'contained'
          }
          onClick={props.onOkey}
        >
          {'Submit'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
