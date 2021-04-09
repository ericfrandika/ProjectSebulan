import { Button } from '@material-ui/core';
import {  withStyles } from '@material-ui/core/styles';
import {green, purple } from '@material-ui/core/colors';

const UpdateButton = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText(purple[500]),
      backgroundColor: green[500],
      '&:hover': {
        backgroundColor: green[700],
      },
    },
  }))(Button);

  export default UpdateButton;