import React, { Component } from 'react';

import './style.css'
import InputPrin from '../../components/comp_principal/inputPrin'
import LabelPrin from '../../components/comp_principal/labelPrin'
import axios from 'axios'
import { connect } from 'react-redux';
import Pagination from '@material-ui/lab/Pagination';
import Kotak from '../../components/compDiv/div'
import Swal from 'sweetalert2'
import InputArea from '../../components/comp_principal/textArea';
import Ikon from '../../components/compIcon/FontIcon';
import Pilih from '../../components/compSelect/select'
import Pilihan from '../../components/compSelect/value'
import Garis from '../../components/compGaris/garis';
import PrintLn from '../../components/compGaris/Println';
import { Button } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import UpdateIcon from '@material-ui/icons/Update';
import DeleteIcon from '@material-ui/icons/Delete';
import DataNotFound from '../../components/compNotfound/Notfound.gif'
import SearchIcon from '@material-ui/icons/Search';
import UpdateButton from '../../components/compButton/updateButton';
import DeleteButton from '../../components/compButton/deleteButton';

class Principal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //-------------------------------Find ALL with Pagination-----------------------------------------
      page: 1,
      count: 0,
      limit: "5",
      pageNow: 1,

      //----------------------------------------------------DIDMOUNT---------------------------------------------
      principals: [],
      principalsRedux: [],
      prinId: "",
      prinName: "",
      prinAddress: "",
      prinCity: "",
      prinPhone: "",
      prinFax: "",
      prinCountry: "",
      prinConPhone: "",
      prinLicensed: "",
      princreatedAt: "",
      princreatedBy: "",
      prinupdatedAt: "",
      prinupdatedBy: "",
      objPrin: {},
      searchPrin: "",
      actSearch: 0,

      //--------------------------------------------ini Seluruh State Condisii button------------------------------
      disableInputId: true,
      butCondi: true,
      butCondEdit: true,
      butCondAdd: false,
      butCondDelete: true,
      disableBut: false,
      disableInput: true,
      disableButEdit: true,
      disableButDel: true,
      act: 0,
      actEdit: 0,
      actDelete: 0,
      tableClick: false,
      min: "",
      apiall:"http://localhost:8080/admin/nexchief/principal/",
      forbidden:false
      //----------------------------------------------------------------------------------------------------------
    }
  }
  componentDidMount() {
    if (this.state.forbidden === false){
    this.getApiALLPrincipal();
      if (this.state.forbidden === false){
        this.getPaging(this.state.page, this.state.limit);
      }
    }
  }

  setValue = el => {
    if (el.target.name === "searchPrin" && el.target.value === "") {
      this.getPaging(this.state.pageNow, this.state.limit);
      this.setState({
        page:1
    })
    }
    this.setState({
      [el.target.name]: el.target.value
    })

  }
  setLimit = el => {
    this.setState({
      limit: el.target.value,
      page: 1
    })
    if (this.state.searchPrin === "") {
      this.getPaging(this.state.pageNow, el.target.value);
    }
    else {
      this.getApiName(this.state.pageNow, el.target.value);
    }
  }
  //---------------------------------------------------FUNCTION GET API--------------------------------------
  getApiALLPrincipal = () => {
    axios.get(this.state.apiall, {
      headers: {
        'Authorization': "Bearer " + this.props.dataToken
      }
    })
      .then(resp => {
        this.props.dataPrincipal({ dataPrincipal: resp.data })
      })
      .catch((resp) => {
        if(resp.response.status === 403){
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: ' Session expired, please login again'
          })
          this.setState({
            forbidden:true
          })
          this.props.logout()             
      }
      else{
        alert("Failed fetching")
      }
      })
  }
  //--------------------------------------------------------ONCHANGE PAGINATION------------------------------------------
  handleChange = (el, value) => {
    this.setState({
      page: value,
    });
    if (this.state.searchPrin === "") {
      this.getPaging(value, this.state.limit);
    }
    else {
      this.getApiName(value, this.state.limit)
    }

  };
  getPaging = (value, limit) => {
    axios.get(this.state.apiall+"paging/?page=" + value + "&limit=" + limit, {
      headers: {
        'Authorization': "Bearer " + this.props.dataToken
      }
    })
      .then((resp) => {
       let limitPage = resp.data.count / this.state.limit
        this.setState({
          principals: resp.data.principal,
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
          this.setState({
            forbidden:true
          })
          this.props.logout()             
      }
      else{
        alert("Failed fetching")
      }
      }) ;
  }
  //--------------------------------------------------GET PAGING NAME---------------------------------------------
  getApiName = (value, limit) => {
    axios.get(this.state.apiall+"name/" + this.state.searchPrin + "?page=" + value + "&limit=" + limit, {
      headers: {
        'Authorization': "Bearer " + this.props.dataToken
      }
    })
      .then(resp => {
         let limitPage = resp.data.count / this.state.limit
        this.setState({ 
          principals: resp.data.principal ,
              count: Math.ceil(limitPage)
        })
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
      })
  }
  //---------------------------------------------------Button Add--------------------------------------
  buttonAdd = () => {
    if (this.state.act === 0) {
      let createNow = new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString()
      this.setState({
        disableInputId: false,
        butCondi: false,
        disableButEdit: true,
        butCondDelete: false,
        disableInput: false,
        act: 1,
        actDelete: 1,
        tableClick: true,
        princreatedAt: createNow,
        princreatedBy: this.props.dataLoginUser.username,
        prinupdatedAt: createNow,
        prinupdatedBy: this.props.dataLoginUser.username,
        disableButDel: false,
      });
      this.props.dataNavbar({ dataNavbar: true})
      this.resetState();
    }
    else {
      const { prinId, prinName, prinAddress, prinCity, prinPhone, prinFax, prinCountry, prinConPhone, prinLicensed, princreatedAt, princreatedBy, prinupdatedAt, prinupdatedBy } = this.state
      let objprincipal = { prinId, prinName, prinAddress, prinCity, prinPhone, prinFax, prinCountry, prinConPhone, prinLicensed, princreatedAt, princreatedBy, prinupdatedAt, prinupdatedBy }
      if (prinName === "" || prinAddress === "" || prinCity === "" || prinPhone === "" || prinFax === "" || prinCountry === "" || prinConPhone === "" || prinLicensed === "") {
        Swal.fire(
          'Insert All Data!',
          'You clicked the button!',
          'error'
        )
      }
      else if (prinId.length > 50) {
        Swal.fire(
          'Your Character Id to Long ',
          'You clicked the button!',
          'error'
        )
      }
      else if (prinName.length > 50) {
        Swal.fire(
          'Your Character Name to Long ',
          'You clicked the button!',
          'error'
        )
      }
      else {
        Swal.fire({
          title: 'Do you want to save the changes?',
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: `Save`,
          denyButtonText: `Don't save`,
        }).then((result) => {
          if (result.isConfirmed) {
            axios.post(this.state.apiall, {
              headers: {
                'Authorization': "Bearer " + this.props.dataToken
              }
            }, {
              ...objprincipal
            })
              .then((resp) => {
                this.getApiALLPrincipal();
                this.getPaging(this.state.page, this.state.limit);
                this.setState({
                  butCondi: true,
                  disableButEdit: true,
                  disableInput: true,
                  butCondDelete: true,
                  act: 0,
                  actDelete: 0,
                  tableClick: false,
                  disableButDel: true,
                  disableInputId: true,

                })
                this.props.dataNavbar({ dataNavbar: false})
                Swal.fire('Saved!', '', 'success')
              })
              .catch((resp) => {
                if(resp.response.status === 403){
                  Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: ' Session expired, please login again'
                  })
                  this.setState({
                    tableClick: false,
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
          } else if (result.isDenied) {
            Swal.fire('Changes are not saved', '', 'info')
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
        disableInputId: true,
        butCondEdit: false,
        disableInput: false,
        butCondAdd: true,
        butCondDelete: false,
        actEdit: 1,
        actDelete: 1,
        tableClick: true,
        prinupdatedAt: createNow,
        prinupdatedBy: this.props.dataLoginUser.username
      });
      this.props.dataNavbar({ dataNavbar: true})

    }
    else {
      const { prinId, prinName, prinAddress, prinCity, prinPhone, prinFax, prinCountry, prinConPhone, prinLicensed, princreatedAt, princreatedBy, prinupdatedAt, prinupdatedBy } = this.state
      let objprincipal = { prinId, prinName, prinAddress, prinCity, prinPhone, prinFax, prinCountry, prinConPhone, prinLicensed, princreatedAt, princreatedBy, prinupdatedAt, prinupdatedBy }
      if (prinName === "" || prinAddress === "" || prinCity === "" || prinPhone === "" || prinFax === "" || prinCountry === "" || prinConPhone === "" || prinLicensed === "") {
        Swal.fire(
          'Insert All Data!',
          'You clicked the button!',
          'error'
        )
      }
      else if (prinId.length > 50) {
        Swal.fire(
          'Your Character Id to Long ',
          '',
          'error'
        )
      }
      else if (prinName.length > 50) {
        Swal.fire(
          'Your Character Name to Long ',
          '',
          'error'
        )
      }
      else {
        Swal.fire({
          title: 'Do you want to Update the changes?',
          showDenyButton: false,
          showCancelButton: true,
          confirmButtonText: `Update`,
          denyButtonText: `Don't Update`,
        }).then((result) => {
          if (result.isConfirmed) {
            axios.put(this.state.apiall + this.state.prinId, {
              ...objprincipal
            },
              {
                headers: {
                  'Authorization': "Bearer " + this.props.dataToken
                }
              })
              .then((resp) => {
                this.getApiALLPrincipal();
                this.getPaging(this.state.page, this.state.limit);
                this.setState({
                  butCondEdit: true,
                  disableInput: true,
                  butCondAdd: false,
                  butCondDelete: true,
                  disableButDel: true,
                  actEdit: 0,
                  actDelete: 0,
                  tableClick: false,
                  disableButEdit: true,
                  disableInputId: true
                });
                Swal.fire('Update!', '', 'success')
                this.props.dataNavbar({ dataNavbar: false})
              }) 
              .catch((resp) => {
                if(resp.response.status === 403){
                  Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: ' Session expired, please login again'
                  })
                  this.setState({
                    tableClick: false,
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
            
          } else if (result.isDenied) {
            Swal.fire('Changes are not Update', '', 'info')
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
        disableButEdit: true,
        disableInput: true,
        butCondDelete: true,
        butCondAdd: false,
        butCondEdit: true,
        disableButDel: true,
        act: 0,
        actEdit: 0,
        actDelete: 0,
        tableClick: false,
        princreatedAt: "",
        princreatedBy: "",
        prinupdatedAt: "",
        prinupdatedBy: "",
        disableInputId: true,
      })
      this.props.dataNavbar({ dataNavbar: false})
      this.resetState()
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
          axios.delete(this.state.apiall + this.state.prinId, {
            headers: {
              'Authorization': "Bearer " + this.props.dataToken
            }
          })
            .then(resp => {
              this.setState({
                disableButDel: true,
                disableButEdit: true,
                page:1
              })
              this.getApiALLPrincipal();
              this.getPaging(this.state.page, this.state.limit);
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
            })
            .catch(resp => {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: resp.response.data.errorMessage || resp.response.data
              })
            })
        }
      })
    }
  }
  //---------------------------------------------------Button TampilForm---------------------------------
  HandleTable = (prinId) => {
    axios.get(this.state.apiall + prinId, {
      headers: {
        'Authorization': "Bearer " + this.props.dataToken
      }
    })
      .then(resp => {
        this.setState({
          prinId: resp.data.prinId,
          prinName: resp.data.prinName,
          prinAddress: resp.data.prinAddress,
          prinCity: resp.data.prinCity,
          prinPhone: resp.data.prinPhone,
          prinFax: resp.data.prinFax,
          prinCountry: resp.data.prinCountry,
          prinConPhone: resp.data.prinConPhone,
          prinLicensed: resp.data.prinLicensed,
          princreatedAt: resp.data.princreatedAt,
          princreatedBy: resp.data.princreatedBy,
          prinupdatedAt: resp.data.prinupdatedAt,
          prinupdatedBy: resp.data.prinupdatedBy,
        })
      })
      .catch(() => {
        alert("Failed fetching")
      })
    this.setState(({
      disableButEdit: false,
      disableButDel: false,
    }))
  }
  //-----------------------------------------------------RESET STATE---------------------------------------------------
  resetState = () => {
    this.setState({
      prinId: "",
      prinName: "",
      prinAddress: "",
      prinCity: "",
      prinPhone: "",
      prinFax: "",
      prinCountry: "",
      prinConPhone: "",
      prinLicensed: "",
      prinupdatedAt: "",
      prinupdatedBy: "",
    })
  }
  //--------------------------------------------------------ONCCLICK SEARCH NAMA-----------------------------------------

  searchName = () => {
    this.getPaging(this.state.pageNow, this.state.limit);
    this.setState({
      searchPrin: "",
      page:1
    })
  }


  //--------------------------------------------------SearchName--------------------------------------------------------
  buttonSearch = () => {
    if (this.state.searchPrin === "") {
      this.getPaging(this.state.pageNow, this.state.limit);
      this.setState({
        searchPrin: "",
        page: 1
      })
    }
    else {
      this.getApiName(this.state.pageNow, this.state.limit)
      this.setState({
        actSearch: 1,
        page: 1
      })

    }
  }

  //--------------------------------------------------------------------------NEW DATE--------------------------------

  NewDate = () => {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    if (dd < 10) {
      dd = '0' + dd
    }
    if (mm < 10) {
      mm = '0' + mm
    }
    today = yyyy + '-' + mm + '-' + dd;
    return today;

  }

  NewDate2 = () => {
    return (
      <>
      <div>
        <label>GILA</label>
      </div>
      </>
    )

  }

  render() {
    const { prinId, prinName, prinAddress, prinCity, prinPhone, prinFax, prinCountry, prinConPhone, prinLicensed, princreatedAt, princreatedBy, prinupdatedAt, prinupdatedBy } = this.state
    return (
      <>
        <Kotak className="prinAtas">
          <Kotak className="prinAtasKiri">
          <InputPrin value={this.state.searchPrin} className="SeacrhPrin" style={{ marginRight: "1%" }} name="searchPrin" onChange={this.setValue} placeholder="Search Name Principal..."></InputPrin>
          <Button startIcon={<SearchIcon />} variant="contained" size="small" color="primary" style={{ marginRight: "1%" }} onClick={this.buttonSearch} >SEARCH</Button>
          <Ikon className="far fa-window-close" style={{ cursor: "pointer", color: "red" }} onClick={() => this.searchName()} disabled={this.state.tableClick}></Ikon>
          </Kotak>
          <Kotak className="prinAtasKanan">
            <Button startIcon={<SaveIcon />} style={{ marginRight: "8px" }} variant="contained" size="small" color="primary" onClick={() => { this.buttonAdd() }} disabled={this.state.butCondAdd}>{this.state.butCondi ? "ADD" : "SAVE"}</Button>
            <UpdateButton startIcon={<UpdateIcon />} style={{ marginRight: "8px" }} variant="contained" size="small" color="primary" onClick={() => { this.buttonEdit() }} disabled={this.state.disableButEdit} >{this.state.butCondEdit ? "EDIT" : "UPDATE"}</UpdateButton>
            <DeleteButton startIcon={<DeleteIcon />} variant="contained" size="small" color="secondary" onClick={() => { this.buttonCancel() }} disabled={this.state.disableButDel}>{this.state.butCondDelete ? "DELETE" : "CANCEL"}</DeleteButton>
          </Kotak>
        </Kotak>
        <Kotak className="bodyPrin">
          <Kotak className="prinKiri">
            <Kotak className={(this.state.principals.length < 6) ? "prinKiriTabel" : "prinKiriTabelScroll"}>
              {
                this.state.principals.map((prin, idx) => {
                  return (
                    <Kotak key={idx}>
                      <Kotak className="prinisiTable" style={{ cursor: "pointer" }} disabled={this.state.tableClick} onClick={() => { this.HandleTable(prin.prinId) }}>
                        <Kotak className="prinTable">
                          <Ikon className="fas fa-tags" style={{ color: "white", display: 'inline-block', width: "70px", fontSize: "65px" }}></Ikon>
                        </Kotak>
                        <Kotak className="prinlabelTabel">
                          <LabelPrin className="prinlabelName" style={{ fontSize: "100%" }}>{prin.prinName.substring(20, 0)}</LabelPrin>
                          <PrintLn />
                          <LabelPrin className="prinLabelid">{prin.prinId.substring(20, 0)}</LabelPrin>
                        </Kotak>
                      </Kotak>
                    </Kotak>
                  )
                })
              }
              {
                (this.state.principals.length > 0) ?
                  ""
                  :
                  <img src={DataNotFound} alt="dataNotFound" style={{ width: "90%" }} />

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
                <Pagination color="primary" style={{ borderRadius: "10px", background: 'white', width: "100%" }} page={this.state.page} onChange={this.handleChange} count={this.state.count} />
              </Kotak>
            </Kotak>
          </Kotak>
          <Kotak className="prinKanan">
            <Kotak className="prinKiriLabel">
              <LabelPrin className="labelprin">Principal ID</LabelPrin>

              <LabelPrin className="labelprin">Principal Name</LabelPrin>

              <LabelPrin className="labelprin">Address</LabelPrin>

              <LabelPrin className="labelprin">----</LabelPrin>

              <LabelPrin className="labelprin">City</LabelPrin>

              <LabelPrin className="labelprin">Phone</LabelPrin>

              <LabelPrin className="labelprin">Fax</LabelPrin>

              <LabelPrin className="labelprin">Country</LabelPrin>

              <LabelPrin className="labelprin">Contact Phone</LabelPrin>

              <LabelPrin className="labelprin">Licensed Expired</LabelPrin>

              <Garis style={{ backgroundColor: "blue", height: "1px" }} />
              <LabelPrin className="labelprin">Created At</LabelPrin>

              <LabelPrin className="labelprin">Created By</LabelPrin>

              <LabelPrin className="labelprin">Updated At</LabelPrin>

              <LabelPrin className="labelprin">Updated By</LabelPrin>

            </Kotak>
            <Kotak className="prinKananInput">
              <Kotak>
                <InputPrin type="text" value={prinId} disabled={this.state.disableInputId} className="prinForm" name="prinId" onChange={this.setValue} placeholder="Principal ID" ></InputPrin>
              </Kotak>
              <Kotak>
                <InputPrin type="text" value={prinName} disabled={this.state.disableInput} className="prinForm" name="prinName" onChange={this.setValue} placeholder="Principal Name" ></InputPrin>
              </Kotak>
              <Kotak className="divAlamat">
                <InputArea className="prinAlamat" value={prinAddress} disabled={this.state.disableInput} name="prinAddress" rows="4" cols="69" placeholder="Principal Address" onChange={this.setValue}></InputArea>
              </Kotak>
              <Kotak>
                <InputPrin type="text" value={prinCity} disabled={this.state.disableInput} className="prinForm" name="prinCity" onChange={this.setValue} placeholder="Principal City" ></InputPrin>
              </Kotak>
              <Kotak>
                <InputPrin type="text" value={prinPhone} disabled={this.state.disableInput} className="prinForm" name="prinPhone" onChange={this.setValue} placeholder="Principal Phone" ></InputPrin>
              </Kotak>
              <Kotak>
                <InputPrin type="text" value={prinFax} disabled={this.state.disableInput} className="prinForm" name="prinFax" onChange={this.setValue} placeholder="Principal Fax" ></InputPrin>
              </Kotak>
              <Kotak>
                <InputPrin type="text" value={prinCountry} disabled={this.state.disableInput} className="prinForm" name="prinCountry" onChange={this.setValue} placeholder="Principal Country" ></InputPrin>
              </Kotak>
              <Kotak>
                <InputPrin type="text" value={prinConPhone} disabled={this.state.disableInput} className="prinForm" name="prinConPhone" onChange={this.setValue} placeholder="Principal Contact Phone" ></InputPrin>
              </Kotak>
              <Kotak>
                <InputPrin type="date" min={this.NewDate()} value={prinLicensed} disabled={this.state.disableInput} className="prinForm" name="prinLicensed" onChange={this.setValue} placeholder="Principal Licensed Expired" ></InputPrin>
              </Kotak>
              <Garis style={{ backgroundColor: "blue", width: "99%", height: "1px", marginBottom: "0.5%" }} />
              <Kotak>
                <InputPrin type="text" value={princreatedAt} disabled={true} className="prinForm" name="princreatedAt" onChange={this.setValue} placeholder="Principal Created At" ></InputPrin>
              </Kotak>
              <Kotak>
                <InputPrin type="text" value={princreatedBy} disabled={true} className="prinForm" name="princreatedBy" onChange={this.setValue} placeholder="Principal Created By" ></InputPrin>
              </Kotak>
              <Kotak>
                <InputPrin type="text" value={prinupdatedAt} disabled={true} className="prinForm" name="prinupdatedAt" onChange={this.setValue} placeholder="Principal Updated At" ></InputPrin>
              </Kotak>
              <Kotak>
                <InputPrin type="text" value={prinupdatedBy} disabled={true} className="prinForm" name="prinupdatedBy" onChange={this.setValue} placeholder="Principal Updated by" ></InputPrin>
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
  dataToken: state.authReducer.token,
  
})
const mapDispatchToProps = dispatch => { // NGIRIM DATA
  return {
    dataPrincipal: (data) => dispatch({ type: "PRINCIPAL", payload: data }),
    dataNavbar: (data) => dispatch({ type: "NAVBAR", payload: data }),
    logout: () => dispatch({ type: "LOGOUT" })

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Principal);