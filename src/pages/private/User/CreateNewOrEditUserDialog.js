import React, {useState} from 'react';
import {MainDialog} from '../../../Components/MainDialog';
import useStyles from './styles';
import {Grid, Typography} from '@material-ui/core';
import {TextInput} from '../../../Components/TextInput';

export default function CreateNewOrEditUserDialog(props) {
  const edit = props?.edit;
  const data = props?.data;
  const [open, setOpen] = props.openCloseState;
  const [userName, setUserName] = useState(undefined);
  const [street, setStreet] = useState(undefined);
  const [suite, setSuite] = useState(undefined);
  const [city, setCity] = useState(undefined);
  const [zipcode, setZipcode] = useState(undefined);

  const c = useStyles();

  const resetState = () => {
    setOpen(false);
    setUserName(undefined);
    setStreet(undefined);
    setSuite(undefined);
    setCity(undefined);
    setZipcode(undefined);
  };

  React.useEffect(() => {
    if (data) {
      setUserName(data?.username);
      setStreet(data?.address?.street);
      setSuite(data?.address?.suite);
      setCity(data?.address?.city);
      setZipcode(data?.address?.zipcode);
    }
  }, [data]);

  const handleSubmit = () => {
    props.postUserData({
      id: props?.stateData?.length + 1,
      username: userName,
      address: {
        street,
        suite,
        city,
        zipcode,
      },
    });
  };

  const handleEdit = () => {
    props.postEditData(data.id, {
      ...props?.data,
      userName,
      address: {
        ...props?.data?.address,
        street: street,
        suite,
        city,
        zipcode,
      },
    });
  };

  return (
    <MainDialog
      showDivider
      open={open}
      title={edit ? 'Edit User' : 'Create User'}
      okLabel={edit ? 'Edit' : 'Submit'}
      onCancel={() => {
        resetState();
      }}
      onOkey={() => {
        if (!edit) {
          handleSubmit();
          resetState();
        } else if (edit) {
          handleEdit();
          resetState();
        }
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="subtitle1" className={c.heading}>
            User Data
          </Typography>
        </Grid>
        <Grid item xs={12} lg={6}>
          <TextInput
            required
            id={'username'}
            variant={'standard'}
            placeholder={'example: 1'}
            type={'text'}
            label={'User Name'}
            value={userName}
            error={false}
            onChange={(e) => {
              const value = e?.target?.value;
              setUserName(value);
            }}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <TextInput
            required
            id={'street'}
            variant={'standard'}
            placeholder={'Please Type here...'}
            type={'text'}
            label={'Street'}
            value={street}
            error={false}
            onChange={(e) => {
              const value = e?.target?.value;
              setStreet(value);
            }}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <TextInput
            required
            id={'suite'}
            variant={'standard'}
            placeholder={'Please Type here...'}
            type={'text'}
            label={'Suite'}
            value={suite || ''}
            error={false}
            onChange={(e) => {
              const value = e?.target?.value;
              setSuite(value);
            }}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <TextInput
            required
            id={'city'}
            variant={'standard'}
            placeholder={'Please Type here...'}
            type={'text'}
            label={'City'}
            value={city || ''}
            error={false}
            onChange={(e) => {
              const value = e?.target?.value;
              setCity(value);
            }}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <TextInput
            required
            id={'zipcode'}
            variant={'standard'}
            placeholder={'Please Type here...'}
            type={'text'}
            label={'ZipCode'}
            value={zipcode || ''}
            error={false}
            onChange={(e) => {
              const value = e?.target?.value;
              setZipcode(value);
            }}
          />
        </Grid>
      </Grid>
    </MainDialog>
  );
}
