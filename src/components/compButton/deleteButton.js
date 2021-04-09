import { Button } from '@material-ui/core';
import {  withStyles } from '@material-ui/core/styles';
import {red, purple } from '@material-ui/core/colors';
const DeleteButton = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText(purple[500]),
      backgroundColor: red[700],
      '&:hover': {
        backgroundColor: red[800],
      },
    },
  }))(Button);

  export default DeleteButton;