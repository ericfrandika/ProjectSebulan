import React, { Component } from 'react';
import InputPrin from '../../components/comp_principal/inputPrin'
import LabelPrin from '../../components/comp_principal/labelPrin'
import { connect } from 'react-redux';
import axios from 'axios'
import Pagination from '@material-ui/lab/Pagination';
import Swal from 'sweetalert2'
import './style.css'
import FormGroup from '@material-ui/core/FormGroup';
import AntSwitch from './CustomizedSwitches'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Kotak from '../../components/compDiv/div';
import Garis from '../../components/compGaris/garis';
import Pilih from '../../components/compSelect/select';
import Pilihan from '../../components/compSelect/value';
import InputArea from '../../components/comp_principal/textArea';
import Ikon from '../../components/compIcon/FontIcon';
import PrintLn from '../../components/compGaris/Println';
import { Button } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import UpdateIcon from '@material-ui/icons/Update';
import DeleteIcon from '@material-ui/icons/Delete';
import DataNotFound from '../../components/compNotfound/Notfound.gif'
import SearchIcon from '@material-ui/icons/Search';
import UpdateButton from '../../components/compButton/updateButton';
import DeleteButton from '../../components/compButton/deleteButton';

class Customer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //-------------------------------------------------Page---------------------------------------------
            page: 1,
            count: 0,
            limit: 5,
            pageNow: 1,
            //-------------------------------------------------------------State Form---------------------------------------------------------------
            cusId: "",
            cusName: "",
            cusPass: "",
            cusAddress: "",
            cusPhone: "",
            prinId: "",
            disId: "",
            cusOnOff: true,
            cusRegis: "",
            cusValid: "",
            cuscreatedAt: "",
            cuscreatedBy: "",
            cusupdatedAt: "",
            cusupdatedBy: "",
            customers: [],
            searchCus: "",
            objCus: {},
            //---------------------------------------------------ini Seluruh State Condisii button------------------------------------
            butCondi: true,
            butCondEdit: true,
            butCondAdd: false,
            butCondDelete: true,
            disableBut: false,
            disableInput: true,
            disabledButDel: true,
            disabledButEdit: true,
            tableClick: false,
            act: 0,
            actEdit: 0,
            actDelete: 0,
            actSearch: 0,
            apiCus:"http://localhost:8080/admin/nexchief/customer/",
            //-----------------------------------------------------------------------------------------------------------------
        }
    }
    //------------------------------------------------SET VALUE--------------------------------------------------
    setValue = el => {
        if(el.target.name === "searchCus" && el.target.value === ""){
            this.getPaging(this.state.pageNow, this.state.limit);
            this.setState({
                page:1
            })
          }
        this.setState({
            [el.target.name]: el.target.value
        })
    }
    setValueCus = el => {
        if (el.target.value === "") {
            this.setState({
                [el.target.name]: null
            })
        }
        else {
            this.setState({
                [el.target.name]: el.target.value
            })
        }
    }

    setValueName = el => {
        if (this.state.actEdit === 1) {
            this.setState({
                [el.target.name]: el.target.value,
            })
        }
        else {
            if (el.target.name === "prinId") {
                this.setState({
                    [el.target.name]: el.target.value,
                    cusId: this.state.cusName + "." + el.target.value
                })
            }
            else {
                this.setState({
                    [el.target.name]: el.target.value,
                    cusId: el.target.value + "." + this.state.prinId
                })
            }
        }

    }


    //-----------------------------------------------------Component Did Mount-------------------------------------------------------------------------
    componentDidMount() {
        this.getPaging(this.state.pageNow, this.state.limit);
    }
   
    //--------------------------------------GetCountAndApiName-------------------------------
    getApiName = (value, limit) => {
        axios.get(this.state.apiCus+"name/" + this.state.searchCus + "?page=" + value + "&limit=" + limit,
        {
            headers: {
                'Authorization': "Bearer " +this.props.dataToken       
          }})
            .then((resp) => {
                let limitPage = resp.data.count / this.state.limit
                this.setState({
                    customers: resp.data.customer,
                    count: Math.ceil(limitPage)
                });
            })
            .catch((resp) => {
                if(resp.response.status === 403 ){
                  Swal.fire({
                      icon: 'error',
                      title: 'Oops...',
                      text: ' Session expired, please login again'
                    })
                    this.props.logout()
                }
                else{
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Fetching Failed'
                      })
                }
            })
       
    }
    searchName = () => {
        this.getPaging(this.state.page, this.state.limit);
        this.setState({
            searchCus: ""
        })
    }

    //-------------------------------------------Search Name Distributor------------------------------------------------------------
    buttonSearch = () => {
        if (this.state.searchCus === "") {
            this.getPaging(this.state.pageNow, this.state.limit);
            this.setState({
                searchCus: "",
                page:1
            })
        }
        else {
            this.getApiName(this.state.pageNow, this.state.limit)
            this.setState({
                actSearch: 1,
                page:1
            })
        }
    }
    //--------------------------------------------handlePage---------------------------------------
    handleChange = (event, value) => {
        this.setState({
            page: value
        })
        if (this.state.searchCus === "") {
            this.getPaging(value, this.state.limit);
        }
        else {
            this.getApiName(value, this.state.limit)
        }
    }
    getPaging = (value, limit) => {
        axios.get(this.state.apiCus+"paging/?page=" + value + "&limit=" + limit,
        {
            headers: {
                'Authorization': "Bearer " +this.props.dataToken       
          }})
            .then((resp) => {
                let limitPage = resp.data.count / this.state.limit
                this.setState({
                    customers: resp.data.customer,
                    count: Math.ceil(limitPage)
                });
            })
            .catch((resp) => {
                if(resp.response.status === 403 ){
                  Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: ' Session expired, please login again'
                  })
                  this.props.logout()             
              }
              else{
                alert("Failed fetching")
              }
              }) ;
    }
    setLimit = el => {
        this.setState({
            limit: el.target.value,
            page: 1
        })
        if (this.state.searchCus === "") {
            this.getPaging(this.state.pageNow, el.target.value);
        }
        else {
            this.getApiName(this.state.pageNow, el.target.value);
        }
    }

    //---------------------------------------------------button Add--------------------------------------
    buttonAdd = () => {
        let regUsername = /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;
        let regPass = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-8])(?=.*?[^\w\s]).{8,}$/
        let regPhone = /^(^\+62\s?|^0)(\d{3,4}-?){2}\d{3,4}$/
        if (this.state.act === 0) {
            let createNow = new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString()
            let current_datetime = new Date()
        let yearTwoDigit = current_datetime.getFullYear();
        let monthTwoDigit = ("0" + (current_datetime.getMonth() + 1)).slice(-2)
        let dateTwoDigit = ("0" + current_datetime.getDate()).slice(-2)
        let formatted_date = yearTwoDigit + "-" + monthTwoDigit + "-" + dateTwoDigit
            this.setState({
                butCondi: false,
                disableButEdit: true,
                butCondDelete: false,
                disableInput: false,
                disabledButDel: false,
                disabledButEdit: true,
                cuscreatedAt: createNow,
                cuscreatedBy: this.props.dataLoginUser.username,
                act: 1,
                actDelete: 1,
                tableClick: true,
                cusRegis :formatted_date

            });
            this.props.dataNavbar({ dataNavbar: true})
            this.resetState()
        }
        else {

            const { cusId, cusName, cusPass, cusAddress, cusPhone, prinId, disId, cusOnOff, cusRegis, cusValid, cuscreatedAt, cuscreatedBy, cusupdatedAt, cusupdatedBy } = this.state
            let objCustomer = { cusId, cusName, cusPass, cusAddress, cusPhone, prinId, disId, cusOnOff, cusRegis, cusValid, cuscreatedAt, cuscreatedBy, cusupdatedAt, cusupdatedBy }
            if (cusId === "" || cusName === "" || cusPass === "" || cusAddress === "" ||
                cusPhone === "" || prinId === "" || cusRegis === "" || cusValid === "") {
                Swal.fire({
                    title:'Insert all data!',
                    icon: 'warning'
               })
            }
            else if (!regUsername.test(cusName)){
                Swal.fire({
                    title: 'Username is 8-20 characters long',
                    icon: 'warning'
                })
            }
            else if (!regPass.test(cusPass)){
                Swal.fire({
                    title: 'Password at least 8 characters, 1 numeric character , 1 lowercase letter, 1 uppercase letter, 1 special character',
                    icon: 'warning'
                })
            } 
            else if (!regPhone.test(cusPhone)){
                Swal.fire({
                    title: 'Phone number min. 11 number and max.14 number, must in Indonesia type (ex: 08134455555)',
                    icon: 'warning'
                })
            }
            
            else {
                Swal.fire({
                    title: 'Do you want to save the changes?',
                    showCancelButton: true,
                    confirmButtonText: `Save`,
                }).then((result) => {
                    /* Read more about isConfirmed, isDenied below */
                    if (result.isConfirmed) {
                        axios.post(this.state.apiCus, {
                            ...objCustomer
                        },
                        {
                            headers: {
                                'Authorization': "Bearer " +this.props.dataToken       
                          }})
                            .then((resp) => {
                                this.setState({
                                    butCondi: true,
                                    disableButEdit: false,
                                    disableInput: true,
                                    butCondDelete: true,
                                    disabledButDel: true,
                                    act: 0,
                                    actDelete: 1,
                                    tableClick: false
                                })
                                this.props.dataNavbar({ dataNavbar: false})
                                this.getPaging(this.state.pageNow, this.state.limit);
                                Swal.fire('Saved!', '', 'success')
                            })
                            .catch((resp) => {
                                    if(resp.response.status === 403 ){
                                      Swal.fire({
                                        icon: 'error',
                                        title: 'Oops...',
                                        text: ' Session expired, please login again'
                                      })
                                      this.props.logout()             
                                  }
                                else{
                                    Swal.fire({
                                    icon: 'error',
                                    title: 'Oops...',
                                    text: resp.response.data.errorMessage || resp.response.data
                                })
                            }
                            })
                    }
                })
            }
        }
    }
    //// ------------------------------------------------------Button edit--------------------------------------
    buttonEdit = () => {

        if (this.state.actEdit === 0) {
            let createNow = new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString()
            
            this.setState({
                butCondEdit: false,
                disableInput: false,
                butCondAdd: true,
                butCondDelete: false,
                actEdit: 1,
                actDelete: 1,
                cusupdatedAt: createNow,
                cusupdatedBy: this.props.dataLoginUser.username,
                tableClick: true,
            });
            this.props.dataNavbar({ dataNavbar: true})

        }

        else {
            const { cusId, cusName, cusPass, cusAddress, cusPhone, prinId, disId, cusOnOff, cusRegis, cusValid, cusupdatedAt, cusupdatedBy } = this.state
            let objCustomer = { cusId, cusName, cusPass, cusAddress, cusPhone, prinId, disId, cusOnOff, cusRegis, cusValid, cusupdatedAt, cusupdatedBy }
            if (cusId === "" || cusName === "" || cusPass === "" || cusAddress === "" ||
                cusPhone === "" || prinId === "" || cusRegis === "" || cusValid === "") {
                Swal.fire(
                    'Insert All Data!',
                    'You clicked the button!',
                    'error'
                )
            }
            else {
                Swal.fire({
                    title: 'Do you want to save the changes?',
                    showCancelButton: true,
                    confirmButtonText: `Update`,
                }).then((result) => {
                    if (result.isConfirmed) {
                        axios.put(this.state.apiCus + this.state.cusId, {
                            ...objCustomer
                        },
                        {
                            headers: {
                                'Authorization': "Bearer " +this.props.dataToken       
                          }})
                            .then((resp) => {
                                this.setState({
                                    butCondEdit: true,
                                    disableInput: true,
                                    butCondAdd: false,
                                    butCondDelete: true,
                                    disabledButDel: true,
                                    disabledButEdit: true,
                                    actEdit: 0,
                                    actDelete: 0,
                                    tableClick: false,
                                });
                                this.props.dataNavbar({ dataNavbar: false})
                                this.getPaging(this.state.pageNow, this.state.limit);
                                Swal.fire('Update!', '', 'success')
                            })
                            .catch((resp) => {
                                    if(resp.response.status === 403 ){
                                      Swal.fire({
                                        icon: 'error',
                                        title: 'Oops...',
                                        text: ' Session expired, please login again'
                                      })
                                      this.props.logout()
                                  }
                                  else{
                                    Swal.fire({
                                        icon: 'error',
                                        title: 'Oops...',
                                        text: resp.response.data.errorMessage || resp.response.data
                                    })
                                }    
                            })
                        
                    }
                })
            }
        }
    }

    buttonCancel = () => {
        //---------------------------------------------Untuk Cancel-----------------------------------
        if (this.state.actDelete === 1) {
            this.setState({
                butCondi: true,
                disableButEdit: false,
                disableInput: true,
                butCondDelete: true,
                butCondAdd: false,
                butCondEdit: true,
                disabledButDel: true,
                disabledButEdit: true,
                cuscreatedAt: "",
                cuscreatedBy: "",
                cusupdatedAt: "",
                cusupdatedBy: "",
                act: 0,
                actEdit: 0,
                actDelete: 0,
                tableClick: false,
                cusRegis:"",
                
            })
            this.resetState()
            this.props.dataNavbar({ dataNavbar: false})
        }
        //------------------------------------------------Untuk Delete----------------------------------
        else {
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    axios.delete(this.state.apiCus + this.state.cusId,
                    {
                        headers: {
                            'Authorization': "Bearer " +this.props.dataToken       
                      }})
                        .then(resp => {
                            this.setState({
                                disabledButDel: true,
                                disabledButEdit: true,
                                discreatedAt: "",
                                discreatedBy: "",
                                tableClick: false,
                                page:1
                            })
                            this.getPaging(this.state.pageNow, this.state.limit)
                            Swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            )
                        })
                        .catch((resp) => {
                            if(resp.response.status === 403 ){
                              Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'Session expired, please login again'
                              })
                              this.props.logout()
                          }
                            else {
                            Swal.fire({
                              icon: 'error',
                              title: 'Oops...',
                              text: resp.response.data.errorMessage || resp.response.data
                            })
                          }
                          })
                }
            })
        }
    }

    //---------------------------------------------------Button TampilForm---------------------------------
    HandleTable = (cusId) => {
        axios.get(this.state.apiCus+ cusId,
        {
            headers: {
                'Authorization': "Bearer " +this.props.dataToken       
          }})
            .then(resp => {
                this.setState({
                    objCus: resp.data,
                    disabledButEdit: false,
                    disabledButDel: false,
                    cusId: resp.data.cusId,
                    cusName: resp.data.cusName,
                    cusPass: resp.data.cusPass,
                    cusAddress: resp.data.cusAddress,
                    cusPhone: resp.data.cusPhone,
                    prinId: resp.data.prinId,
                    prinName: resp.data.prinName,
                    disId: resp.data.disId === null ? "" : resp.data.disId,
                    disName: resp.data.disName,
                    cusOnOff: resp.data.cusOnOff === "true" ? true : false,
                    cusRegis: resp.data.cusRegis,
                    cusValid: resp.data.cusValid,
                    cuscreatedAt: resp.data.cuscreatedAt,
                    cuscreatedBy: resp.data.cuscreatedBy,
                    cusupdatedAt: resp.data.cusupdatedAt,
                    cusupdatedBy: resp.data.cusupdatedBy
                })
            })
            .catch((resp) => {
                if(resp.response.status === 403 ){
                  Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Session expired, please login again'
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
    //-------------------------------------------------------Reset RESET -------------------------------------------------------

    resetState = () => {
        this.setState({
            cusId: "",
            cusName: "",
            cusPass: "",
            cusAddress: "",
            cusPhone: "",
            prinId: "",
            disId: "",
            cusOnOff: true,
            cusValid: "",
        })
    }
    setValueChecked = (el) => {
        this.setState({
            [el.target.name]: el.target.checked
        })
    }

    render() {
        const { page, limit, cusId, cusName, cusPass, cusAddress, cusPhone, prinId, disId, cusOnOff, cusRegis, cusValid, cuscreatedAt, cuscreatedBy, cusupdatedAt, cusupdatedBy } = this.state
        return (
            <>
                <Kotak className="prinAtas">
                <Kotak className="prinAtasKiri">
                    <InputPrin className="SeacrhPrin" style={{ marginRight: "1%" }} name="searchCus"  value={this.state.searchCus} onChange={this.setValue} placeholder="Search Name Customer..."></InputPrin>
                    <Button startIcon={<SearchIcon/>} variant="contained" size="small" color="primary"   style={{ marginRight: "1%"}} onClick={this.buttonSearch} >SEARCH</Button>
                    <Ikon className="far fa-window-close" style={{  cursor: "pointer", color: "red" }} disabled={this.state.tableClick}  onClick={() => this.searchName()}></Ikon>
                   </Kotak>
                   <Kotak className="prinAtasKanan">
                    <Button startIcon={<SaveIcon />} style={{marginRight:"8px"}} variant="contained" size="small" color="primary"   onClick={this.buttonAdd} disabled={this.state.butCondAdd}>{this.state.butCondi ? "ADD" : "SAVE"}</Button>
                    <UpdateButton startIcon={<UpdateIcon />}  style={{marginRight:"8px" }} variant="contained" size="small" color="primary" onClick={this.buttonEdit} disabled={this.state.disabledButEdit}>{this.state.butCondEdit ? "EDIT" : "UPDATE"}</UpdateButton>
                    <DeleteButton startIcon={<DeleteIcon />} variant="contained" size="small" color="secondary"  onClick={this.buttonCancel} disabled={this.state.disabledButDel}>{this.state.butCondDelete ? "DELETE" : "CANCEL"}</DeleteButton>
               </Kotak>
                </Kotak>
                <Kotak className="bodyPrin">
                    <Kotak className="prinKiri">
                        <Kotak className={( this.state.customers.length<6)  ? "prinKiriTabel":"prinKiriTabelScroll"}>
                            {/* ini nanti di for */}
                            {
                                this.state.customers.map((cus, idx) => {
                                    return (
                                        <Kotak key={idx}>
                                            <Kotak className="cusisiTable" style={{ cursor: "pointer" }} disabled={this.state.tableClick} onClick={() => this.HandleTable(cus.cusId)}>
                                                <Kotak className="prinTable">
                                                    <Ikon className="fas fa-id-badge" style={{ color: "white", display: 'inline-block', width: "30px", fontSize: "350%", marginTop: "20%" }}></Ikon>
                                                </Kotak>
                                                <Kotak className="CustomerTabel">
                                                    <Kotak className="CustomerTabelkiri" style={{ fontSize: "80%", marginLeft: "10%" }}>
                                                        <LabelPrin className="prinlabelName">{cus.cusName.substring(25,0)}</LabelPrin>
                                                        <PrintLn />
                                                        <LabelPrin className="prinLabelid">{cus.cusId.substring(25,0)}</LabelPrin>
                                                        <PrintLn />
                                                        <LabelPrin className="prinLabelDis" >{cus.prinName.substring(25,0)}</LabelPrin>
                                                    </Kotak>
                                                    <Kotak className="CustomerTabelKanan">
                                                        <LabelPrin className="prinIndex">{((page * limit) - limit)+ idx + 1}</LabelPrin>
                                                        <PrintLn />
                                                        <LabelPrin className="prinTgl" style={{ color: "#4CC417", fontSize: "small" }}>2020-03-11</LabelPrin>
                                                        <PrintLn />
                                                        <LabelPrin className="prinPremium">Premium</LabelPrin>
                                                        <PrintLn />
                                                    </Kotak>
                                                </Kotak>
                                            </Kotak>
                                        </Kotak>

                                    )
                                })
                            }
                                {
                (this.state.customers.length > 0) ?
                  ""
                  :
                  <>
                    <img src={DataNotFound} alt="dataNotFound"  style={{width:"90%"}} />
                  </>
              }

                        </Kotak>

                        <Kotak className="prinKiriPagin">
                            <Kotak className="prinLimit" style={{ width: "23%", marginRight: "5%", textAlign: "center" }}>
                                <Pilih className="prinForm" name="limit" style={{ fontWeight: "bold", height: "5vh", width: "100%", marginLeft: "5%" }} onChange={this.setLimit}>
                                    <Pilihan value={parseInt(5)}>LIMIT : 5</Pilihan>
                                    <Pilihan value={parseInt(10)}>LIMIT : 10</Pilihan>
                                    <Pilihan value={parseInt(15)}>LIMIT : 15</Pilihan>
                                </Pilih>
                            </Kotak>
                            <Kotak className="prinPage" style={{ width: "72%" }}>
                                <Pagination color="primary" style={{ background: 'white', width: "100%" }} page={this.state.page} onChange={this.handleChange} count={this.state.count} />
                            </Kotak>
                        </Kotak>

                    </Kotak>
                    <Kotak className="prinKanan">
                        <Kotak className="prinKiriLabel">

                            <LabelPrin className="labelprin">User ID</LabelPrin>

                            <LabelPrin className="labelprin">User Name</LabelPrin>

                            <LabelPrin className="labelprin">Password</LabelPrin>

                            <LabelPrin className="labelprin">Address</LabelPrin>

                            <LabelPrin className="labelprin">----</LabelPrin>

                            <LabelPrin className="labelprin">Phone</LabelPrin>

                            <Garis style={{ backgroundColor: "blue", height: "1px" }} />


                            <LabelPrin className="labelprin">Principal</LabelPrin>

                            <LabelPrin className="labelprin">Distributor</LabelPrin>

                            <Garis style={{ backgroundColor: "blue", height: "1px" }} />

                            <LabelPrin className="labelprin">Disable Login</LabelPrin>
                            <LabelPrin className="labelprin">Registrasion Date</LabelPrin>
                            <LabelPrin className="labelprin">Product Valid Thru</LabelPrin>

                            <Garis style={{ backgroundColor: "blue", height: "1px" }} />

                            <LabelPrin className="labelprin">Created At</LabelPrin>

                            <LabelPrin className="labelprin">Created By</LabelPrin>

                            <LabelPrin className="labelprin">Updated At</LabelPrin>

                            <LabelPrin className="labelprin">Updated By</LabelPrin>

                        </Kotak>
                        <Kotak className="prinKananInput">
                            <Kotak>
                                <InputPrin type="text" disabled={true} value={cusId} className="prinForm" name="cusId" onChange={this.setValue} placeholder="Customer ID" ></InputPrin>
                            </Kotak>
                            <Kotak>
                                <InputPrin type="text" disabled={this.state.disableInput} value={cusName} className="prinForm" name="cusName" onChange={this.setValueName} placeholder="Customer UserName" ></InputPrin>
                            </Kotak>
                            <Kotak>
                                <InputPrin type="text" disabled={this.state.disableInput} value={cusPass} className="prinForm" name="cusPass" onChange={this.setValue} placeholder="Customer Password" ></InputPrin>
                            </Kotak>
                            <Kotak>
                                <InputArea className="prinAlamat" disabled={this.state.disableInput} value={cusAddress} name="cusAddress" rows="4" cols="54" placeholder="Alamat" onChange={this.setValue}></InputArea>
                            </Kotak>
                            <Kotak>
                                <InputPrin type="text" disabled={this.state.disableInput} className="prinForm" value={cusPhone} name="cusPhone" onChange={this.setValue} placeholder="Customer Phone" ></InputPrin>
                            </Kotak>
                            <Garis style={{ backgroundColor: "blue", width: "99%", height: "1px", marginBottom: "0" }} />
                            <Kotak>
                                {/* -------------------------------------- nanti di for ini---------------------------------- */}
                                <Pilih className="prinForm" disabled={this.state.disableInput} value={prinId} name="prinId" style={{ height: "33px" }} onChange={this.setValueName}>
                                    <Pilihan value="">Principal name</Pilihan>
                                    {
                                        this.props.dataPrincipal.map((prin, idx) => {
                                            return (
                                                <Pilihan key={idx} value={prin.prinId}>{prin.prinId + " || " + prin.prinName}</Pilihan>
                                            )
                                        })
                                    }
                                </Pilih>
                            </Kotak>
                            <Kotak>
                                {/* -------------------------------------- nanti di for ini---------------------------------- */}
                                <Pilih className="prinForm" disabled={this.state.disableInput} value={disId} name="disId" style={{ height: "33px" }} onChange={this.setValueCus}>
                                    <Pilihan value="">Distributor name</Pilihan>
                                    {
                                        this.props.dataDistributor.map((dis, idx) => {
                                            return (
                                                <Pilihan key={idx} value={dis.disId}>{dis.disId + " || " + dis.disName}</Pilihan>

                                            )
                                        })
                                    }
                                </Pilih>
                            </Kotak>
                            <Garis style={{ backgroundColor: "blue", width: "99%", height: "1px", marginBottom: "0" }} />
                            <Kotak className="toggleOnOff">
                                <FormGroup>
                                    <Typography component="div">
                                        <Grid component="label" container alignItems="center" spacing={1}>
                                            <Grid item>Off</Grid>
                                            <Grid item>
                                                <AntSwitch disabled={this.state.disableInput} checked={cusOnOff} onChange={this.setValueChecked} name="cusOnOff" />
                                                {/* <InputText clasName="hobby" type="checkbox" checked={hobby.findIndex(e => e === "RENANG") > -1 ?"checked":""} name="hobby" id="hobby" value="RENANG"  onChange={this.setValueHobby} />Renang  */}
                                            </Grid>
                                            <Grid item>On</Grid>
                                        </Grid>
                                    </Typography>
                                </FormGroup>
                            </Kotak>
                            <Kotak>
                                <InputPrin type="date" style={{ width: "20%" }}  disabled={true} className="prinForm" value={cusRegis} name="cusRegis" onChange={this.setValue} placeholder="Customer Regis Date" ></InputPrin>
                            </Kotak>
                            <Kotak>
                                <InputPrin type="date" style={{ width: "20%" }} disabled={this.state.disableInput} className="prinForm" name="cusValid" onChange={this.setValue} value={cusValid} placeholder="Customer Product Thru" ></InputPrin>
                            </Kotak>
                            <Garis style={{ backgroundColor: "blue", width: "99%", height: "1px", marginBottom: "1%" }} />
                            <Kotak>
                                <InputPrin type="text" disabled={true} value={cuscreatedAt} className="prinForm" name="cuscreatedAt" onChange={this.setValue} placeholder="Customer Created At" ></InputPrin>
                            </Kotak>
                            <Kotak>
                                <InputPrin type="text" disabled={true} value={cuscreatedBy} className="prinForm" name="cuscreatedby" onChange={this.setValue} placeholder="Customer Created By" ></InputPrin>
                            </Kotak>
                            <Kotak>
                                <InputPrin type="text" disabled={true} value={cusupdatedAt} className="prinForm" name="cusupdatedAt" onChange={this.setValue} placeholder="Customer Updated At" ></InputPrin>
                            </Kotak>
                            <Kotak>
                                <InputPrin type="text" disabled={true} value={cusupdatedBy} className="prinForm" name="cusupdatedBy" onChange={this.setValue} placeholder="Customer Updated by" ></InputPrin>
                            </Kotak>

                        </Kotak>
                    </Kotak>
                </Kotak>
            </>
        );
    }
}

const mapStateToProps = state => ({
    dataLoginUser: state.authReducer.userLogin,
    dataPrincipal: state.prinReducer.reducPrincipal,
    dataDistributor: state.disReducer.reducDistributor,
    dataToken : state.authReducer.token
})
const mapDispatchToProps = dispatch => { // NGIRIM DATA
    return {
        dataNavbar: (data) => dispatch({ type: "NAVBAR", payload: data }),
        logout: () => dispatch({ type: "LOGOUT" })
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Customer);