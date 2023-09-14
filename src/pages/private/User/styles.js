import {makeStyles} from '@material-ui/styles';
// import {createTheme} from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
  Header: {
    padding: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
  },
  itemCenters: {
    display: 'flex',
    'align-items': 'center',
    justifyContent: 'space-between',
  },
  fleRow: {
    display: 'flex',
    'align-items': 'center',
    'flex-direction': 'row',
  },
  heading: {
    fontWeight: 700,
  },
  searchBox: {
    width: '300px',
    height: '36px',
    borderRadius: '6px',
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 0,
  },
  searchInput: {
    flexGrow: 1,
    padding: '0 6px 0 6px',
    marginLeft: 0,
    borderRadius: '6px 0 0 6px',
    background: '#f5f5f5bf',
    border: `1px solid #f5f5f5bf`,
  },
  searchIconStyle: {
    borderRadius: '0 6px 6px 0',
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  ownerBox: {
    backgroundColor: '#f2f2f2',
    borderRadius: 12,
    marginBottom: 25,
    padding: 12,
  },
  ownerBoxCont: {
    borderTop: `1px solid #f2f2f2`,
  },
}));

export default useStyles;
