import React from 'react';
import Typography from '@material-ui/core/Typography';

export default function ItemInfo(props) {
  return (
    <div
      style={{
        marginTop: 0,
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '330px',
      }}
      className={props.className}
    >
      <Typography
        variant={'subtitle2'}
        style={{fontSize: '15px', color: '#9c9c9c'}}
      >
        {props.name}
      </Typography>
      <Typography className={'font-semibold'} style={{fontSize: '13px'}}>
        <b>{props.value || '-'}</b>
      </Typography>
    </div>
  );
}
