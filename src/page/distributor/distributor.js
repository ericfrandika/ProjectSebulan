import React, { Component } from 'react';
import InputPrin from '../../components/comp_principal/inputPrin'
import LabelPrin from '../../components/comp_principal/labelPrin'
import Swal from 'sweetalert2'
import { connect } from 'react-redux';
import Pagination from '@material-ui/lab/Pagination';
import axios from 'axios'
import Kotak from '../../components/compDiv/div';
import Ikon from '../../components/compIcon/FontIcon';
import Pilih from '../../components/compSelect/select';
import Pilihan from '../../components/compSelect/value';
import InputArea from '../../components/comp_principal/textArea';
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

class Distributor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //---------------------------UNTUK PAGE----------------------------------
      page: 1,
      count: 0,
      limit: 5,
      pageNow: 1,
      //-----------------------------------STATE INPUT-----------------------------------------
      prinId: "",
      prinName: "",
      disId: "",
      disName: "",
      disAddress: "",
      disCity: "",
      disOwner: "",
      disEmail: "",
      disPhone: "",
      discreatedAt: "",
      discreatedBy: "",
      disupdatedAt: "",
      disupdatedBy: "",
      distributors: [],
      objDis: {},
      searchDis: "",
      tableClick: false,

      //-----------------------------------ini Seluruh State Condisii button--------------------

      butCondi: true,
      butCondEdit: true,
      butCondAdd: false,
      butCondDelete: true,
      disableBut: false,
      disableInput: true,
      disabledButEdit: true,
      disabledButDel: true,
      act: 0,
      actEdit: 0,
      actDelete: 0,
      actSearch: 0,
      inputId: true,
      apiDis: "http://localhost:8080/admin/nexchief/distributor/",
      forbidden:false
      //------------------------------------------------------------------------------------------------
    }
  }
  //------------------------------------------------COMPONENTDIDMOUNT-------------------------------------
  componentDidMount() {
    if(this.state.forbidden === false){
      this.getPaging(1, this.state.limit);
        if(this.state.forbidden === false){
           this.getApiALLDistributor();
    }
    }
  }
  //------------------------------------------SET VALUE---------------------------------------------
  setValue = el => {
    if (el.target.name === "searchDis" && el.target.value === "") {
      this.getPaging(this.state.pageNow, this.state.limit);
      this.setState({
        page: 1
      })
    }
    this.setState({
      [el.target.name]: el.target.value
    })
  }
  setLimit = el => {
    this.setState({
      limit: el.target.value
    })
    if (this.state.searchDis === "") {
      this.getPaging(this.state.pageNow, el.target.value);
    }
    else {
      this.getApiName(this.state.pageNow, el.target.value);
    }
  }
  //--------------------------------------------handlePage---------------------------------------
  handleChange = (event, value) => {
    this.setState({
      page: value
    })
    if (this.state.searchDis === "") {
      this.getPaging(value, this.state.limit);
    }
    else {
      this.getApiName(value, this.state.limit)
    }
  }
  //---------------------GET PAGINATION--------------------------
  getPaging = (value, limit) => {
    axios.get(this.state.apiDis + "paging/?page=" + value + "&limit=" + limit,
      {
        headers: {
          'Authorization': "Bearer " + this.props.dataToken
        }
      })
      .then((resp) => {
        let limitPage = resp.data.count / this.state.limit
        this.setState({
          distributors: resp.data.distributor,
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
  
  //--------------------------------------GET API ALL---------------------------------------------
  getApiALLDistributor = () => {
    axios.get(this.state.apiDis,
      {
        headers: {
          'Authorization': "Bearer " + this.props.dataToken
        }
      })
      .then((resp) => {
        this.props.dataDistributor({ 
          dataDistributor: resp.data 
        })
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
  //---------------------------------------------------Button TampilForm---------------------------------
  HandleTable = (disId) => {
    axios.get(this.state.apiDis + disId,
      {
        headers: {
          'Authorization': "Bearer " + this.props.dataToken
        }
      })
      .then(resp => {
        this.setState({
          prinId: resp.data.prinId,
          prinName: resp.data.prinName,
          disId: resp.data.disId,
          disName: resp.data.disName,
          disAddress: resp.data.disAddress,
          disCity: resp.data.disCity,
          disOwner: resp.data.disOwner,
          disEmail: resp.data.disEmail,
          disPhone: resp.data.disPhone,
          discreatedAt: resp.data.discreatedAt,
          discreatedBy: resp.data.discreatedBy,
          disupdatedAt: resp.data.disupdatedAt,
          disupdatedBy: resp.data.disupdatedBy,
          disabledButEdit: false,
          disabledButDel: false,
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
      }) ;

  }

  //---------------------------------------------------button Add--------------------------------------
  buttonAdd = () => {
    if (this.state.act === 0) {
      let createNow = new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString()
      this.setState({
        butCondi: false,
        disableButEdit: true,
        butCondDelete: false,
        disableInput: false,
        disabledButDel: false,
        act: 1,
        actDelete: 1,
        disabledButEdit: true,
        discreatedAt: createNow,
        discreatedBy: this.props.dataLoginUser.username,
        inputId: false,
        tableClick: true
      });
      this.props.dataNavbar({ dataNavbar: true})

      this.resetDis()
    }
    else {
      const { prinId, disId, disName, disAddress, disCity, disOwner, disEmail, disPhone, discreatedAt, discreatedBy, disupdatedAt, disupdatedBy } = this.state
      let objDistributor = { prinId, disName, disId, disAddress, disCity, disOwner, disEmail, disPhone, discreatedAt, discreatedBy, disupdatedAt, disupdatedBy }
      if (prinId === "" || disName === "" ||
        disAddress === "" || disCity === "" || disOwner === "" ||
        disEmail === "" || disPhone === "") {
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
          confirmButtonText: `Save`,
        }).then((result) => {
          if (result.isConfirmed) {
            axios.post(this.state.apiDis, {
              ...objDistributor
            },
              {
                headers: {
                  'Authorization': "Bearer " + this.props.dataToken
                }
              })
              .then((resp) => {

                this.getPaging(this.state.page, this.state.limit);
                this.setState({
                  butCondi: true,
                  disableButEdit: false,
                  disableInput: true,
                  butCondDelete: true,
                  disabledButDel: true,
                  act: 0,
                  inputId: true,
                  actDelete: 0,
                  discreatedAt: "",
                  discreatedBy: "",
                  tableClick: false
                })
                this.props.dataNavbar({ dataNavbar: false})
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
               else{ Swal.fire({
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

  //-------------------------------------------------------Button edit--------------------------------------------------
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
        disupdatedAt: createNow,
        disupdatedBy: this.props.dataLoginUser.username,
        disabledButDel: false,
        inputId: true,
        tableClick: true,
      });
      this.props.dataNavbar({ dataNavbar: true})

    }

    else {
      const { prinId, disId, disName, disAddress, disCity, disOwner, disEmail, disPhone, discreatedAt, discreatedBy, disupdatedAt, disupdatedBy } = this.state
      let objDistributor = { prinId, disName, disId, disAddress, disCity, disOwner, disEmail, disPhone, discreatedAt, discreatedBy, disupdatedAt, disupdatedBy }

      if (prinId === "" || disName === "" ||
        disAddress === "" || disCity === "" || disOwner === "" ||
        disEmail === "" || disPhone === "") {
        Swal.fire(
          'Insert All Data!',
          'You clicked the button!',
          'error'
        )
      }
      else {
        Swal.fire({
          title: 'Do you want to Update the changes?',
          showCancelButton: true,
          confirmButtonText: `Update`,
        }).then((result) => {
          if (result.isConfirmed) {
            axios.put(this.state.apiDis + this.state.disId, {
              ...objDistributor
            },
              {
                headers: {
                  'Authorization': "Bearer " + this.props.dataToken
                }
              })
              .then((resp) => {
                this.getPaging(this.state.page, this.state.limit);
                this.setState({
                  butCondEdit: true,
                  disableInput: true,
                  butCondAdd: false,
                  butCondDelete: true,
                  actEdit: 0,
                  actDelete: 0,
                  disabledButDel: true,
                  disabledButEdit: true,
                  tableClick: false,
                  discreatedAt: "",
                  discreatedBy: "",
                });
                this.props.dataNavbar({ dataNavbar: false})

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
                });
              }
              }); 
          } 
        })
      }
    }
  }
      //---------------------------------------------Untuk Cancel-----------------------------------
  buttonCancel = () => {
    if (this.state.actDelete === 1) {
      this.setState({
        butCondi: true,
        disableButEdit: false,
        disableInput: true,
        butCondDelete: true,
        butCondAdd: false,
        butCondEdit: true,
        act: 0,
        actEdit: 0,
        actDelete: 0,
        disabledButDel: true,
        disabledButEdit: true,
        tableClick: false,
        discreatedAt: "",
        discreatedBy: "",
        disupdatedAt: "",
        disupdatedBy: "",
        inputId: true
      })
      this.resetDis()
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
          axios.delete(this.state.apiDis + this.state.disId,
            {
              headers: {
                'Authorization': "Bearer " + this.props.dataToken
              }
            })
            .then(resp => {
              this.setState({
                disabledButDel: true,
                disabledButEdit: true,
                discreatedAt: "",
                discreatedBy: "",
                tableClick: false,
                page:1

              })
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
              this.getPaging(this.state.pageNow, this.state.limit);
              this.resetDis();
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


  //--------------------------------------------------RESET INPUT------------------------------------
  resetDis = () => {
    this.setState({
      prinId: "",
      prinName: "",
      disId: "",
      disName: "",
      disAddress: "",
      disCity: "",
      disOwner: "",
      disEmail: "",
      disPhone: "",
      disupdatedAt: "",
      disupdatedBy: "",
    })
  }
  //-----------------------------------------------------SEARCH NAME-----------------------------------
  searchName = () => {
    this.getPaging(this.state.page, this.state.limit);
    this.setState({
      searchDis: ""
    })

  }

  //-------------------------------------------Search Name Distributor------------------------------------------------------------
  buttonSearch = () => {
    if (this.state.searchDis   === "") {
      this.getPaging(this.state.pageNow, this.state.limit);
      this.setState({
        searchDis: "",
        page: 1
      })
    }
      else{
      this.getApiName(this.state.pageNow, this.state.limit)
      this.setState({
          page: 1
      })
      }
  }
  //--------------------------------------GetCountAndApiName-------------------------------
  getApiName = (value, limit) => {
    axios.get(this.state.apiDis + "name/" + this.state.searchDis + "?page=" + value + "&limit=" + limit,
      {
        headers: {
          'Authorization': "Bearer " + this.props.dataToken
        }
      })
      .then(resp => {
        let limitPage = resp.data.count / this.state.limit
        this.setState({
          distributors: resp.data.distributor,
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
 

  render() {
  
    const { prinId, disId, disName, disAddress, disCity, disOwner, disEmail, disPhone, discreatedAt, discreatedBy, disupdatedAt, disupdatedBy } = this.state
  
      
    return (
      <>
        <Kotak className="prinAtas">
          <Kotak className="prinAtasKiri">
            <InputPrin className="SeacrhPrin" style={{ marginRight: "1%" }} name="searchDis" onChange={this.setValue} placeholder="Search Distributor..." value={this.state.searchDis}></InputPrin>
            <Button startIcon={<SearchIcon />} variant="contained" size="small" color="primary" style={{ marginRight: "1%" }} onClick={this.buttonSearch} disabled={this.state.butCondAdd}>SEARCH</Button>
            <Ikon className="far fa-window-close" style={{ cursor: "pointer", color: "red" }} onClick={() => this.searchName()}></Ikon>
          </Kotak>
          <Kotak className="prinAtasKanan">

            <Button startIcon={<SaveIcon />} style={{ marginRight: "8px" }} variant="contained" size="small" color="primary" onClick={() => this.buttonAdd()} disabled={this.state.butCondAdd}>{this.state.butCondi ? "ADD" : "SAVE"}</Button>
            <UpdateButton startIcon={<UpdateIcon />} style={{ marginRight: "8px" }} variant="contained" size="small" color="primary" onClick={this.buttonEdit} disabled={this.state.disabledButEdit} >{this.state.butCondEdit ? "EDIT" : "UPDATE"}</UpdateButton>
            <DeleteButton startIcon={<DeleteIcon />} variant="contained" size="small" color="secondary" onClick={this.buttonCancel} disabled={this.state.disabledButDel} >{this.state.butCondDelete ? "DELETE" : "CANCEL"}</DeleteButton>
          </Kotak>
        </Kotak>
        <Kotak className="bodyPrin">

          <Kotak className="prinKiri">
            <Kotak className={(this.state.distributors.length < 6) ? "prinKiriTabel" : "prinKiriTabelScroll"}>
              {/* ini nanti di for */}
              {
                this.state.distributors.map((dis, idx) => {
                  return (
                    <Kotak key={idx}>
                      <Kotak className="prinisiTable" disabled={this.state.tableClick} style={{ cursor: "pointer" }} onClick={() => { this.HandleTable(dis.disId) }}>
                        <Kotak className="prinTable">
                          <Ikon className="fas fa-hand-holding-usd" style={{ color: "white", display: 'inline-block', width: "70px", fontSize: "65px" }}></Ikon>
                        </Kotak>
                        <Kotak className="prinlabelTabel" style={{ marginTop: "0px" }}>
                          <LabelPrin className="prinlabelName">{dis.disName.substring(20, 0)}</LabelPrin>
                          <PrintLn />
                          <LabelPrin className="prinLabelalamat">{dis.disCity.substring(20, 0)}</LabelPrin>
                          <PrintLn />
                          <LabelPrin className="prinLabelid">{dis.disId.substring(20, 0)}</LabelPrin>
                        </Kotak>
                      </Kotak>
                    </Kotak>
                  )
                })
              }
              {
                (this.state.distributors.length > 0) ?
                  ""
                  :
                  <>
                    <img src={DataNotFound} alt="dataNotFound" style={{ width: "90%" }} />
                  </>
              }

            </Kotak>
            <Kotak className="prinKiriPagin">
              <Kotak className="prinLimit" style={{ width: "20%", marginRight: "5%", textAlign: "center" }}>
                <Pilih className="prinForm" name="limit" style={{ height: "5vh", width: "100%" }} onChange={this.setLimit}>
                  <Pilihan value={parseInt(5)}>Limit : 5</Pilihan>
                  <Pilihan value={parseInt(10)}>Limit : 10</Pilihan>
                  <Pilihan value={parseInt(15)}>Limit : 15</Pilihan>
                </Pilih>
              </Kotak>
              <Kotak className="prinPage" style={{ width: "75%" }}>
                <Pagination color="primary" style={{ background: 'white' }} page={this.state.page} onChange={this.handleChange} count={this.state.count} />
              </Kotak>
            </Kotak>
          </Kotak>
          <Kotak className="prinKanan">
            <Kotak className="prinKiriLabel">
              <LabelPrin className="labelprin">Principal Name</LabelPrin>

              <LabelPrin className="labelprin">Distributor ID</LabelPrin>

              <LabelPrin className="labelprin">Distributor Name</LabelPrin>

              <LabelPrin className="labelprin">Address</LabelPrin>

              <LabelPrin className="labelprin">----</LabelPrin>

              <LabelPrin className="labelprin">City</LabelPrin>

              <LabelPrin className="labelprin">Owner</LabelPrin>

              <LabelPrin className="labelprin">Email</LabelPrin>

              <LabelPrin className="labelprin">Phone</LabelPrin>

              <Garis style={{ backgroundColor: "blue", height: "1px" }} />
              <LabelPrin className="labelprin">Created At</LabelPrin>

              <LabelPrin className="labelprin">Created By</LabelPrin>

              <LabelPrin className="labelprin">Updated At</LabelPrin>

              <LabelPrin className="labelprin">Updated By</LabelPrin>

            </Kotak>
            <Kotak className="prinKananInput">
              <Kotak>
                {/* -------------------------------------- nanti di for ini---------------------------------- */}
                <Pilih disabled={this.state.disableInput} value={prinId} className="prinForm" name="prinId" style={{ height: "4.7vh" }} onChange={this.setValue}>
                  <Pilihan value="">Principal Name</Pilihan>
                  {
                    this.props.dataPrincipal.map((dis, idx) => {
                      return (
                        <Pilihan key={idx} value={dis.prinId}>{dis.prinName}</Pilihan>
                      )
                    })
                  }
                </Pilih>
              </Kotak>
              <Kotak>
                <InputPrin value={disId} disabled={this.state.inputId} type="text" className="prinForm" name="disId" onChange={this.setValue} placeholder="Distributor ID" ></InputPrin>
              </Kotak>
              <Kotak>
                <InputPrin value={disName} disabled={this.state.disableInput} type="text" className="prinForm" name="disName" onChange={this.setValue} placeholder="Distributor Name" ></InputPrin>
              </Kotak>
              <Kotak className="divAlamat">
                <InputArea value={disAddress} disabled={this.state.disableInput} className="prinAlamat" name="disAddress" rows="3" cols="69" placeholder="Distributor Address" onChange={this.setValue}></InputArea>
              </Kotak>
              <Kotak>
                <InputPrin value={disCity} disabled={this.state.disableInput} type="text" className="prinForm" name="disCity" onChange={this.setValue} placeholder="Distributor City" ></InputPrin>
              </Kotak>
              <Kotak>
                <InputPrin value={disOwner} disabled={this.state.disableInput} type="text" className="prinForm" name="disOwner" onChange={this.setValue} placeholder="Distributor Owner" ></InputPrin>
              </Kotak>
              <Kotak>
                <InputPrin value={disEmail} disabled={this.state.disableInput} type="text" className="prinForm" name="disEmail" onChange={this.setValue} placeholder="Distributor Email" ></InputPrin>
              </Kotak>
              <Kotak>
                <InputPrin value={disPhone} disabled={this.state.disableInput} type="text" className="prinForm" name="disPhone" onChange={this.setValue} placeholder="Distributor Phone" ></InputPrin>
              </Kotak>
              <Garis style={{ backgroundColor: "blue", width: "99%", height: "1px", marginBottom: "0.5%" }} />
              <Kotak>
                <InputPrin value={discreatedAt} disabled={true} type="text" className="prinForm" name="discreatedAt" onChange={this.setValue} placeholder="Distributor Created At" ></InputPrin>
              </Kotak>
              <Kotak>
                <InputPrin value={discreatedBy} disabled={true} type="text" className="prinForm" name="discreatedBy" onChange={this.setValue} placeholder="Distributor Created By" ></InputPrin>
              </Kotak>
              <Kotak>
                <InputPrin value={disupdatedAt} disabled={true} type="text" className="prinForm" name="disupdatedAt" onChange={this.setValue} placeholder="Distributor Updated At" ></InputPrin>
              </Kotak>
              <Kotak>
                <InputPrin disabled={true} type="text" value={disupdatedBy} className="prinForm" name="disupdatedBy" onChange={this.setValue} placeholder="Distributor Updated by" ></InputPrin>
              </Kotak>
            </Kotak>
          </Kotak>
        </Kotak>
      </>);
  }
}

const mapStateToProps = state => ({
  dataLoginUser: state.authReducer.userLogin,
  dataPrincipal: state.prinReducer.reducPrincipal,
  dataToken: state.authReducer.token
})
const mapDispatchToProps = dispatch => { // NGIRIM DATA
  return {
    dataDistributor: (data) => dispatch({ type: "DISTRIBUTOR", payload: data }),
    dataNavbar: (data) => dispatch({ type: "NAVBAR", payload: data }),
    logout: () => dispatch({ type: "LOGOUT" })

  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Distributor);