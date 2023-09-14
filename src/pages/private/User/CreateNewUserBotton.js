import React, {useState} from 'react';
import {Button, Typography} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import CreateNewOrEditUserDialog from './CreateNewOrEditUserDialog';

export default function CreateNewUserButton(props) {
  const dialogState = useState(false);
  return (
    <>
      <Button
        disableElevation
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={() => {
          dialogState[1](true);
        }}
      >
        Add User
      </Button>
      <CreateNewOrEditUserDialog
        stateData={props?.data}
        openCloseState={dialogState}
        postUserData={props?.postUserData}
      />
    </>
  );
}
