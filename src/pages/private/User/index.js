import React, {useEffect, useState} from 'react';
import {httpHelper} from '../../../utils/helper';
import {
  Divider,
  Grid,
  InputBase,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  TablePagination,
  DialogTitle,
  DialogContent,
  Typography,
} from '@material-ui/core';
import useStyles from './styles';
import TableRowsLoader from '../../../Components/TableRowsLoader';
import IconButton from '@material-ui/core/IconButton';
import {CreateOutlined, DeleteOutlineOutlined} from '@material-ui/icons';
import FindInPageIcon from '@material-ui/icons/FindInPage';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import CreateNewOrEditUserDialog from './CreateNewOrEditUserDialog';
import CreateNewUserButton from './CreateNewUserBotton';
import ItemInfo from '../../../Components/ItemInfo';
import CloseIcon from '@material-ui/icons/Close';

const UserDetail = (props) => {
  const {onClose, selectedValue, open} = props;
  const classes = useStyles();
  const handleClose = () => {
    onClose('');
  };
  return (
    <Dialog
      open={open}
      fullWidth={true}
      maxWidth={'sm'}
      aria-labelledby="form-dialog-title"
      PaperProps={{
        style: {
          borderRadius: 20,
          zIndex: 200,
        },
      }}
    >
      <DialogTitle
        disableTypography
        style={{
          padding: '16px 24px',
        }}
      >
        <Typography variant="h6">Detail Post</Typography>
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <div style={{padding: '0 6px 6px 6px'}}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <ItemInfo
                name={'User Name'}
                value={selectedValue?.username || '-'}
              />
              <ItemInfo
                name={'Street Address'}
                value={selectedValue?.address?.street || '-'}
              />
              <ItemInfo
                name={'City Address'}
                value={selectedValue?.address?.city || '-'}
              />
              <ItemInfo
                name={'Suite Address'}
                value={selectedValue?.address?.suite || '-'}
              />
              <ItemInfo
                name={'ZipCode Address'}
                value={selectedValue?.address?.zipcode || '-'}
              />
            </Grid>
          </Grid>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const User = (props) => {
  const c = useStyles();
  const [stateData, setStateData] = useState([]);
  const [currPage, setCurrPage] = useState(0);
  const [currLimit, setCurrLimit] = useState(5);
  const [searchQueryUserId, setSearchQueryUserId] = useState('');
  const [searchQueryUserName, setSearchQueryUserName] = useState('');
  const [selectedData, setSelectedData] = useState();
  const [openDialogDetail, setOpenDialogDetail] = useState(false);
  const [stateDetail, setStateDetail] = useState({});
  const [openEdit, setOpenEdit] = useState(false);

  /**
   * we use json server to store data and please run npm run server for this module
   *
   */
  const url = 'https://fakestoreapi.com/';
  const api = httpHelper();

  useEffect(() => {
    getData(currPage, currLimit, searchQueryUserId);
  }, [currLimit, currPage, searchQueryUserId]);

  // const getData = (username) => {
  //   api
  //     .get(url + `?username_like=${username}`)
  //     .then((res) => setTimeout(setStateData(res), 2000))
  //     .catch((err) => console.log(err));
  // };
  const getData = (currPage, currLimit, searchQueryUserId) => {
    api
      .get(
        url +
          `${
            searchQueryUserId === ''
              ? `users?limit=${currLimit}&page=${currPage}`
              : `users?limit=${currLimit}&page=${currPage}&userId=${searchQueryUserId}`
          }`
      )
      .then((result) => setTimeout(setStateData(result), 2000))
      .catch((err) => console.log(err));
  };

  const updateUserData = (id, post) => {
    api
      .put(`${url}users`, {body: post})
      .then((res) => {
        const updatedUser = stateData?.map((data) => {
          if (data?.id === id) {
            data.title = post.title;
            data.body = post.body;
          }
          return data;
        });
        setStateData((stateData) => updatedUser);
      })
      .catch((err) => console.log(err));
  };

  const postUserData = (post) => {
    api
      .post(`${url}users`, {body: post})
      .then((res) => {
        setStateData((stateData) => [...stateData, res]);
      })
      .catch((err) => console.log(err));
  };

  const deleteUser = (id) => {
    api
      .del(`${url}users/${id}`, {})
      .then((res) => {
        setCurrLimit(currLimit - 1);
        getData(currPage, currLimit - 1, searchQueryUserId);
      })
      .catch((err) => console.log(err));
  };

  const detailUser = (id) => {
    api
      .get(`${url}/${id}`)
      .then((res) => setStateDetail(res))
      .catch((err) => console.log(err));
  };

  const handleSearchSubmit = function () {};

  return (
    <>
      <Grid container>
        <Grid elevation={0} style={{width: '100%'}}>
          <div className={c.Header}>
            <div className={c.itemCenters}>
              <div className={c.fleRow}>
                <CreateNewUserButton
                  data={stateData}
                  postUserData={postUserData}
                />
              </div>
              <div>
                <InputBase
                  className={c.searchInput}
                  placeholder={'Search By Keywords'}
                  value={searchQueryUserName}
                  onChange={(e) => {
                    const {value} = e?.target;
                    setSearchQueryUserName(value);
                  }}
                  onKeyUp={(event) => {
                    if (event.key.toLowerCase() === 'enter') {
                      handleSearchSubmit();
                    }
                  }}
                />
                <Button
                  disableElevation
                  onClick={handleSearchSubmit}
                  className={c.searchIcon}
                  style={{
                    minWidth: 30,
                    width: 30,
                    background: '#f5f5f5bf',
                    borderColor: '#f5f5f5bf',
                  }}
                  variant={'outlined'}
                >
                  <SearchIcon />
                </Button>
              </div>
            </div>
          </div>
          <Divider />
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>No</TableCell>
                  <TableCell>UserName</TableCell>
                  <TableCell>Address</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {!stateData ? (
                  <TableRowsLoader rowsNum={10} />
                ) : (
                  stateData?.map((row, index) => {
                    return (
                      <TableRow key={row?.id + `-table-use${index + 1}`}>
                        <TableCell component="th" scope="row">
                          {row?.id}
                        </TableCell>
                        <TableCell>{row?.username || '-'}</TableCell>
                        <TableCell>
                          {`${row?.address?.street || '-'} ${
                            row?.address?.suite
                          }, ${row?.address?.city}, ${
                            row?.address?.zipcode || ''
                          }`}{' '}
                        </TableCell>
                        <TableCell>
                          <div className="flex">
                            <div style={{flex: 1}}>
                              <IconButton
                                onClick={() => {
                                  setOpenDialogDetail(true);
                                  detailUser(row?.id);
                                }}
                              >
                                <FindInPageIcon />
                              </IconButton>
                              <IconButton
                                onClick={() => {
                                  setSelectedData(row);
                                  setOpenEdit(true);
                                }}
                              >
                                <CreateOutlined />
                              </IconButton>
                              <IconButton
                                onClick={() => {
                                  deleteUser(row?.id);
                                }}
                              >
                                <DeleteOutlineOutlined />
                              </IconButton>
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            component="div"
            {...props}
            nextIconButtonProps={{style: {visibility: 'hidden'}}}
            backIconButtonProps={{style: {visibility: 'hidden'}}}
            count={stateData.length}
            rowsPerPageOptions={[5, 10, 15, 20, {label: 'All', value: -1}]}
            rowsPerPage={currLimit || 5}
            page={currPage}
            SelectProps={{
              inputProps: {'aria-label': 'rows per page'},
              native: true,
            }}
            onPageChange={(e, page) => {
              setCurrPage(currPage + 1);
            }}
            onRowsPerPageChange={(e) => {
              const val = e?.target?.value;
              setCurrLimit(+val || 0);
              setCurrPage(0);
            }}
          />
          <CreateNewOrEditUserDialog
            openCloseState={[openEdit, setOpenEdit]}
            data={selectedData}
            postEditData={updateUserData}
            edit={true}
          />
          <UserDetail
            selectedValue={stateDetail}
            open={openDialogDetail}
            onClose={() => {
              setOpenDialogDetail(!openDialogDetail);
            }}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default User;
