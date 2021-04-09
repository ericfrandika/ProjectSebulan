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
import LabelPrin from '../../components/comp_principal/labelPrin';
import Ikon from '../../components/compIcon/FontIcon';
import PrintLn from '../../components/compGaris/Println';
import { connect } from 'react-redux';

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
            namaFileRestore: "",
            forbidden: false
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
            namaFileRestore: el.target.files[0].name
        })
    }
    HandleRestore = () => {
        let regEkstenSql = /^.*\.(sql)$/;
        if (this.state.nameDatabase === "") {
            Swal.fire(
                'Import your file Sql, Before You Save!',
                '',
                'warning'
            )
        }
        else if (!regEkstenSql.test(this.state.namaFileRestore)) {
            Swal.fire({
                title: 'Ekstension File Must be .SQL',
                icon: 'warning'
            })
        }
        else {
            Swal.fire({
                title: 'Do you want to Restore File?',
                showCancelButton: true,
                confirmButtonText: `Save`,
            }).then((result) => {
                if (result.isConfirmed) {
                    const file = new FormData();
                    file.append('nameDatabase', this.state.nameDatabase, this.state.nameDatabase.name)
                    axios.post("http://localhost:8080/admin/nexchief/uploadRestore/", file,
                        {
                            headers: {
                                'Authorization': "Bearer " + this.props.dataToken
                            }
                        })
                        .then((resp) => {
                            console.log(resp.response)
                            this.setState({
                                nameDatabase: "",
                                setOpen: false,
                                namaFileRestore: ""
                            })
                            this.getAPIDownload();
                            this.getApiALLBackup();
                            Swal.fire('Saved!', '', 'success')
                        })
                        .catch((resp) => {
                            if (resp.response.status === 403) {
                                console.log(resp.response.status)
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Oops...',
                                    text: 'Session expired, please login again'
                                })
                                this.props.logout()
                            }
                            else {
                                this.setState({
                                    nameDatabase: ""
                                })
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Oops...',
                                    text: resp.response
                                })
                            }
                        })
                }
            })
        }
    }
    //--------------------------------------GET API ALL---------------------------------------------
    getApiALLBackup = () => {
        axios.get("http://localhost:8080/admin/nexchief/all/backupdatabase/",
            {
                headers: {
                    'Authorization': "Bearer " + this.props.dataToken
                }
            })
            .then(resp => {
                this.setState({
                    backUpdata: resp.data
                })
            })
            .catch((resp) => {
                if (resp.response.status === 403) {
                    console.log(resp.response.status)
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Session expired, please login again'
                    })
                    this.setState({
                        forbidden: true
                    })
                    this.props.logout()
                }
                else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Fetching Failed'
                    })
                }
            })
    }
    getAPIDownload = () => {
        axios.get("http://localhost:8080/admin/nexchief/backupdatabase/",
            {
                headers: {
                    'Authorization': "Bearer " + this.props.dataToken
                }
            })
            .then(resp => {

            })
            .catch((resp) => {
                if (resp.response.status === 403) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Session expired, please login again'
                    })
                    this.setState({
                        forbidden: true
                    })
                    this.props.logout()
                }
                else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Fetching Failed'
                    })
                }
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
            namaFileRestore: ""
        })
    };


    render() {
        return (
            <>
                <Kotak className="bodyDatabase">
                    <Kotak className="containerBackup">
                        <Kotak className="kiriBackUp">
                            <Ikon className="fas fa-download" onClick={() => this.databaseBackup()} style={{ color: "white", display: 'inline-block', width: "70px", fontSize: "65px", cursor: "pointer" }}></Ikon>
                            <PrintLn />
                            <LabelPrin className="principal" style={{ fontFamily: '-moz-initial', color: "white", display: 'inline-block', width: "250px", fontSize: "20px" }} ><b>BACKUP</b></LabelPrin>
                        </Kotak>
                        <Kotak className="kiriBackUp">
                            <Ikon className="fas fa-upload" onClick={()=>{this.handleClickOpen()}} style={{ color: "white", display: 'inline-block', width: "70px", fontSize: "65px", cursor: "pointer" }}></Ikon>
                            <PrintLn />
                            <LabelPrin className="principal" style={{ fontFamily: '-moz-initial', color: "white", display: 'inline-block', width: "250px", fontSize: "20px" }} ><b>RESTORE</b></LabelPrin>
                        </Kotak>
                    </Kotak>
                    <Kotak>
                    <Dialog onClose={()=>{this.handleClose()}} aria-labelledby="customized-dialog-title" open={this.state.setOpen}>
                        <DialogTitle id="customized-dialog-title" onClose={()=>{this.handleClose()}}>
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
                            <Button variant="contained" size="small" color="primary" autoFocus onClick={() => { this.HandleRestore() }} >
                                SAVE
          </Button>
                        </DialogActions>
                    </Dialog>
                </Kotak>
                </Kotak>
            </>
        );
    }
}
const mapStateToProps = state => ({
    dataToken: state.authReducer.token

})
const mapDispatchToProps = dispatch => { // NGIRIM DATA
    return {
        logout: () => dispatch({ type: "LOGOUT" })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BackUpData);