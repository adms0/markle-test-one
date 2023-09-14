import React, {useMemo} from 'react';
import TextField, {TextFieldProps} from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import {makeStyles} from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles((theme) => ({
  label: {
    marginBottom: 12 * 0.75,
  },
  textInput: {
    width: '100%',
    marginBottom: 12,
  },
  disabled: {
    backgroundColor: '#EEE',
  },
  required: {
    color: '#ef9a9a',
  },
}));

export const TextInput = (props) => {
  const classes = useStyles();
  const small = props.size === 'small';
  const medium = props.size === 'medium';
  const textArea = props.textArea;

  const inputPropsValue = useMemo(() => {
    if (small) {
      if (!textArea) {
        return {
          style: {paddingTop: 10, paddingBottom: 10, lineHeight: 1.5},
        };
      }
      return {style: {paddingTop: 6, paddingBottom: 3, lineHeight: 1.62}};
    } else if (medium) {
      if (!textArea) {
        return {
          style: {paddingTop: 13, paddingBottom: 13, lineHeight: 1.5},
        };
      }
      return {style: {paddingTop: 8, paddingBottom: 5, lineHeight: 1.62}};
    }
  }, []);

  return (
    <div className={props?.className}>
      {props.label ? (
        <Tooltip title={props?.tooltip ?? ''} placement="top-start">
          <InputLabel
            htmlFor={props.id}
            className={props.variant === 'standard' ? undefined : classes.label}
            style={{fontSize: 12, lineHeight: 1.5}}
          >
            {props.label}
            {props.required ? (
              <span className={classes.required}>*</span>
            ) : null}
          </InputLabel>
        </Tooltip>
      ) : null}
      <TextField
        style={{
          backgroundColor: props?.backgroundColor
            ? props.backgroundColor
            : '#FFFFFF',
        }}
        inputProps={inputPropsValue}
        size={props.size || 'medium'}
        value={props.value}
        onChange={props.onChange ?? function (e) {}}
        onKeyPress={props.onKeyPress ?? function (e) {}}
        className={`${classes.textInput} ${
          props?.disabled ? classes.disabled : ''
        }`}
        error={props?.error ?? false}
        id={props.id}
        placeholder={props.placeholder}
        type={props.type}
        helperText={props?.helperText}
        variant={props?.variant ?? 'outlined'}
        disabled={props?.disabled ?? false}
        multiline={props?.textArea}
        rows={props?.textArea ? (props?.variant === 'standard' ? 2 : 6) : 1}
        rowsMax={props.rowsMax}
        InputProps={props.InputProps}
      />
    </div>
  );
};
