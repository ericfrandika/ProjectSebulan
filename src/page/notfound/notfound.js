import { Button } from "@material-ui/core";
import React, { Component } from "react";
import "./style.css";
import { withStyles } from "@material-ui/core/styles";
import { red, purple } from "@material-ui/core/colors";
import HomeIcon from "@material-ui/icons/Home";
const Back = withStyles((theme) => ({
    root: {
        color: theme.palette.getContrastText(purple[500]),
        backgroundColor: red[700],
        "&:hover": {
            backgroundColor: red[800],
        },
    },
}))(Button);
class FileNotFound extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <>
            <div className="containernotfound">
<div class="stage">
  <div class="layer"></div>
  <div class="layer"></div>
  <div class="layer"></div>
  <div class="layer"></div>
  <div class="layer"></div>
  <div class="layer"></div>
  <div class="layer"></div>
  <div class="layer"></div>
  <div class="layer"></div>
  <div class="layer"></div>
  <div class="layer"></div>
  <div class="layer"></div>
  <div class="layer"></div>
  <div class="layer"></div>
  <div class="layer"></div>
  <div class="layer"></div>
  <div class="layer"></div>
  <div class="layer"></div>
  <div class="layer"></div>
  <div class="layer"></div>
</div>

                <div>
                    <Back
                        startIcon={<HomeIcon />}
                        variant="contained"
                        size="small"
                        color="secondary"
                        onClick={() => {
                            this.props.history.push("/");
                        }}
                    >
                        HOME
          </Back>
                </div>
                </div>
            </>
        );
    }
}

export default FileNotFound;
