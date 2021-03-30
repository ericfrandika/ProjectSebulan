import React, { Component } from 'react';
import './style.css'
import axios from 'axios'
import Swal from 'sweetalert2';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { Button, Dialog } from '@material-ui/core';
import Kotak from '../../components/compDiv/div';
import InputPrin from '../../components/comp_principal/inputPrin';
import { Label } from '@material-ui/icons';
import LabelPrin from '../../components/comp_principal/labelPrin';
import Ikon from '../../components/compIcon/FontIcon';
import PrintLn from '../../components/compGaris/Println';

const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);

class BackUpData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nmDatabase: "",
            fileData: "",
            backUpdata: [],
            nameDatabase: "",
            setOpen: false,
            namaFileRestore:""
        }
    }

    componentDidMount() {
        this.getAPIDownload();
        this.getApiALLBackup();
    }
    setValueFile = (el) => {
        console.log(el);
        this.setState({
            [el.target.name]: el.target.files[0],
            namaFileRestore : el.target.files[0].name
        })
    }
    HandleRestore = () => {
        let regEkstenSql = /^.*\.(sql)$/;
        if(this.state.nameDatabase ===""){
            Swal.fire(
                'Import your file Sql, Before You Save!',
                '',
                'warning'
              )
        }
        else if (!regEkstenSql.test(this.state.namaFileRestore)){
            Swal.fire({
                title: 'Ekstension File Must be .SQL',
                icon: 'warning'
            })
        }
        else{
        Swal.fire({
            title: 'Do you want to Restore File?',
            showDenyButton: false,
            showCancelButton: true,
            confirmButtonText: `Save`,
            denyButtonText: `Don't save`,
        }).then((result) => {
            if (result.isConfirmed) {
                const file = new FormData();
                file.append('nameDatabase', this.state.nameDatabase, this.state.nameDatabase.name)
                axios.post("http://localhost:8080/admin/nexchief/uploadRestore/", file)
                    .then((resp) => {
                        this.setState({
                            nameDatabase: "",
                            setOpen: false,
                            namaFileRestore:""
                        })
                        Swal.fire('Saved!', '', 'success')
                    })
                    .catch((resp) => {
                        this.setState({
                            nameDatabase: ""
                        })
                    })
            } else if (result.isDenied) {
                Swal.fire('Changes are not saved', '', 'info')
            }
        })
    }
    }
    //--------------------------------------GET API ALL---------------------------------------------
    getApiALLBackup = () => {
        axios.get("http://localhost:8080/admin/nexchief/all/backupdatabase/")
            .then(resp => {
                this.setState({
                    backUpdata: resp.data
                })
            })
            .catch(() => {
                alert("Failed fetching")
            })
    }
    getAPIDownload = () => {
        axios.get("http://localhost:8080/admin/nexchief/backupdatabase/")
            .then(resp => {

            })
            .catch(() => {
                alert("Failed fetching")
            })
    }

    databaseBackup = () => {
        let createNow = new Date().toLocaleDateString() + "_" + new Date().toLocaleTimeString() + "_nexchief.sql"
        let newBackupData = this.state.backUpdata
        const blob = new Blob([newBackupData[0].fileData], { type: "text/plain" });
        this.downloadfile(blob, createNow)
    }
    downloadfile = (blob, fileName) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = fileName;
        a.click();
    }

    //-----------------------------------------------------------------------------------------------
    handleClickOpen = () => {
        this.setState({
            setOpen: true
        })
    };

    handleClose = () => {
        this.setState({
            nameDatabase: "",
            setOpen: false,
            namaFileRestore:""
        })
    };


    render() {
        console.log("ini Log : ", this.state.namaFileRestore);
        const { show, setShow } = this.state
        return (
            <>
                <Kotak className="bodyDatabase">
                    <Kotak className="containerBackup">
                        <Kotak className="kiriBackUp">
                        <Ikon className="fas fa-download" onClick={() => this.databaseBackup()} style={{ color: "white", display: 'inline-block', width: "70px", fontSize: "65px", cursor: "pointer" }}></Ikon>
                        <PrintLn/>
                        <LabelPrin className="principal" style={{ fontFamily: '-moz-initial', color: "white", display: 'inline-block', width: "250px", fontSize: "20px" }} ><b>BACKUP</b></LabelPrin>
                        </Kotak>
                        <Kotak className="kiriBackUp">
                        <Ikon className="fas fa-upload" onClick={this.handleClickOpen}  style={{ color: "white", display: 'inline-block', width: "70px", fontSize: "65px", cursor: "pointer" }}></Ikon>
                        <PrintLn/>
                        <LabelPrin className="principal" style={{ fontFamily: '-moz-initial', color: "white", display: 'inline-block', width: "250px", fontSize: "20px" }} ><b>RESTORE</b></LabelPrin>
                        </Kotak>
                    </Kotak>
                 <Dialog onClose={this.handleClose} aria-labelledby="customized-dialog-title" open={this.state.setOpen}>
                        <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
                            RESTORE FILE
        </DialogTitle>
                        <DialogContent dividers>
                            <Typography gutterBottom>
                                Before Insert File, Make Sure your uploaded file with Extension .SQL
                             </Typography>
                             <Typography gutterBottom>
                                ------
                             </Typography>
                 <InputPrin className="importFile" type="file" onChange={(el) => this.setValueFile(el)} name="nameDatabase"></InputPrin>

                        </DialogContent>
                        <DialogActions>
                            <Button variant="contained" size="small" color="primary" autoFocus onClick={()=>{this.HandleRestore()}} color="primary">
                                SAVE
          </Button>
                        </DialogActions>
                    </Dialog>
                </Kotak>

            </>
        );
    }
}

export default BackUpData;