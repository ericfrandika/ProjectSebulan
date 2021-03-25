import React, { Component } from 'react';
import './style.css'
import InputPrin from '../../components/comp_principal/inputPrin'
import LabelPrin from '../../components/comp_principal/labelPrin'
import axios from 'axios'
import { connect } from 'react-redux';
import Pagination from '@material-ui/lab/Pagination';
import Kotak from '../../components/compDiv/div'
import Swal from 'sweetalert2'
import Tombol from '../../components/compButton/button';
import InputArea from '../../components/comp_principal/textArea';
import Ikon from '../../components/compIcon/FontIcon';
import Pilih from '../../components/compSelect/select'
import Pilihan from '../../components/compSelect/value'
import Garis from '../../components/compGaris/garis';
import PrintLn from '../../components/compGaris/Println';
class Principal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //-------------------------------Find ALL with Pagination-----------------------------------------
      page: 1,
      count: 0,
      limit: 5,
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
      tableClick: false
      //----------------------------------------------------------------------------------------------------------
    }
  }
  componentDidMount() {
    this.getApiALLPrincipal();
    this.getAPICount();
    this.getPaging(this.state.page, this.state.limit);
  }

  setValue = el => {
    this.setState({
      [el.target.name]: el.target.value
    })
  }
  setLimit = el => {
    this.setState({
      limit: el.target.value,
      page: 1
    })
    if (this.state.searchPrin == "") {
      this.getAPICount();
      this.getPaging(this.state.pageNow, el.target.value);
    }
    else {
      this.getApiCountName();
      this.getApiName(this.state.pageNow, el.target.value);
    }
  }
  //---------------------------------------------------FUNCTION GET API--------------------------------------
  getApiALLPrincipal = () => {
    axios.get("http://localhost:8080/admin/nexchief/principal/")
      .then(resp => {
        this.props.dataPrincipal({ dataPrincipal: resp.data })
      })
      .catch(() => {
        alert("Failed fetching")
      })
  }
  getAPICount = () => {
    axios.get("http://localhost:8080/admin/nexchief/principal/count/")
      .then(resp => {
        let limitPage = resp.data / this.state.limit
        this.setState({
          count: Math.ceil(limitPage)
        })
      })
      .catch(() => {
        alert("Failed fetching")
      })
  }
  //--------------------------------------------------------ONCHANGE PAGINATION------------------------------------------
  handleChange = (el, value) => {
    this.setState({
      page: value,
    });
    if (this.state.searchPrin === "") {
      this.getAPICount();
      this.getPaging(value, this.state.limit);
    }
    else {
      this.getApiCountName();
      this.getApiName(value, this.state.limit)
    }

  };
  getPaging = (value, limit) => {
    axios.get("http://localhost:8080/admin/nexchief/principal/paging/?page=" + value + "&limit=" + limit)
      .then((resp) => {
        this.setState({
          principals: resp.data,
        });
      });
  }

  //--------------------------------------------------GET PAGING NAME---------------------------------------------
  getApiName = (value, limit) => {
    axios.get("http://localhost:8080/admin/nexchief/principal/name/" + this.state.searchPrin + "?page=" + value + "&limit=" + limit)
      .then(resp => {
        this.setState({ principals: resp.data })
        console.log(resp.data)
      })
      .catch(() => {

      })

  }
  //---------------------------------------------------button Add--------------------------------------
  buttonAdd = () => {
    this.props.dataNavbar({ dataNavbar: this.state.tableClick })
    if (this.state.act === 0) {
      if (this.state.prinName !== "") {
        this.resetState();
      }
      let createNow = new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString()
      console.log(createNow);
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
      console.log("ini Admin ", this.state.princreatedBy)

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
      else {
        Swal.fire({
          title: 'Do you want to save the changes?',
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: `Save`,
          denyButtonText: `Don't save`,
        }).then((result) => {
          if (result.isConfirmed) {
            axios.post("http://localhost:8080/admin/nexchief/principal/", {
              ...objprincipal
            })
              .then((resp) => {
                console.log(resp);
                this.getApiALLPrincipal();
                this.getAPICount();
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
                this.resetState();
              })
              .catch((resp) => {
                console.log("ini Consolog Eror : ", resp.response)
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: resp.response.data.errorMessage || resp.response.data
                })
              })
            Swal.fire('Saved!', '', 'success')

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
      console.log(createNow);
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

    }
    else {
      const { prinId, prinName, prinAddress, prinCity, prinPhone, prinFax, prinCountry, prinConPhone, prinLicensed, princreatedAt, princreatedBy, prinupdatedAt, prinupdatedBy } = this.state
      let objprincipal = { prinId, prinName, prinAddress, prinCity, prinPhone, prinFax, prinCountry, prinConPhone, prinLicensed, princreatedAt, princreatedBy, prinupdatedAt, prinupdatedBy }
      console.log("ini object Principal : ", objprincipal)
      if (prinName === "" || prinAddress === "" || prinCity === "" || prinPhone === "" || prinFax === "" || prinCountry === "" || prinConPhone === "" || prinLicensed === "") {
        Swal.fire(
          'Insert All Data!',
          'You clicked the button!',
          'error'
        )
      }
      else {
        Swal.fire({
          title: 'Do you want to Update the changes?',
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: `Update`,
          denyButtonText: `Don't Update`,
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            axios.put("http://localhost:8080/admin/nexchief/principal/" + this.state.prinId, {
              ...objprincipal
            })
              .then((resp) => {
                console.log(resp);
                this.getApiALLPrincipal();
                this.getAPICount();
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
                this.resetState()
              })
              .catch((resp) => {
                console.log(resp.response)
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: resp.response.data.errorMessage || resp.response.data
                })
              })
            Swal.fire('Update!', '', 'success')
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
          axios.delete("http://localhost:8080/admin/nexchief/principal/" + this.state.prinId)
            .then(resp => {
              this.setState({
                disableButDel: true,
                disableButEdit: true,
              })
              this.getApiALLPrincipal();
              this.getAPICount();
              this.getPaging(this.state.page, this.state.limit);
            })
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
      })
    }
  }
  //---------------------------------------------------Button TampilForm---------------------------------
  HandleTable = (prinId) => {
    axios.get("http://localhost:8080/admin/nexchief/principal/" + prinId)
      .then(resp => {
        this.setState({
          objPrin: resp.data,
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
  //-------------------------------------------------------RESET OBJEK--------------------------------------------------
  resetPrin = () => {
    this.setState({
      objPrin: {}
    })
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
    this.getAPICount();
    this.getPaging(this.state.pageNow, this.state.limit);
    this.setState({
      searchPrin: ""
    })
  }


  //--------------------------------------------------SearchName--------------------------------------------------------
  buttonSearch = () => {
    if (this.state.searchPrin === "") {
      this.getAPICount();
      this.getPaging(this.state.pageNow, this.state.limit);
      this.setState({
        searchPrin: "",
        page: 1
      })

    }
    else {
      this.getApiCountName();
      this.getApiName(this.state.pageNow, this.state.limit)
      this.setState({
        actSearch: 1,
        page: 1
      })

    }
  }
  //--------------------------------------------------------------------------------------------------------------------
  getApiCountName = () => {
    axios.get("http://localhost:8080/admin/nexchief/principal/countName/" + this.state.searchPrin)
      .then(resp => {
        let limitPage = resp.data / this.state.limit
        this.setState({
          count: Math.ceil(limitPage)
        })
      })
      .catch(() => {

      })
  }

  render() {
    this.props.dataNavbar({ dataNavbar: this.state.tableClick })
    if ("prinName" in this.state.objPrin) {
      this.setState({
        prinId: this.state.objPrin.prinId,
        prinName: this.state.objPrin.prinName,
        prinAddress: this.state.objPrin.prinAddress,
        prinCity: this.state.objPrin.prinCity,
        prinPhone: this.state.objPrin.prinPhone,
        prinFax: this.state.objPrin.prinFax,
        prinCountry: this.state.objPrin.prinCountry,
        prinConPhone: this.state.objPrin.prinConPhone,
        prinLicensed: this.state.objPrin.prinLicensed,
        princreatedAt: this.state.objPrin.princreatedAt,
        princreatedBy: this.state.objPrin.princreatedBy,
        prinupdatedAt: this.state.objPrin.prinupdatedAt,
        prinupdatedBy: this.state.objPrin.prinupdatedBy,
      })
      this.resetPrin();
    }
    const { prinId, prinName, prinAddress, prinCity, prinPhone, prinFax, prinCountry, prinConPhone, prinLicensed, princreatedAt, princreatedBy, prinupdatedAt, prinupdatedBy } = this.state
    return (
      <>
        <Kotak className="prinAtas">
          <InputPrin value={this.state.searchPrin} disabled={this.state.tableClick} className="SeacrhPrin" style={{ marginRight: "1%" }} name="searchPrin" onChange={this.setValue} placeholder="Search Name Principal"></InputPrin>
          <Tombol className="crudPrin" disabled={this.state.tableClick} style={{ marginRight: "1%", width: "5%" }} onClick={this.buttonSearch} >SEARCH</Tombol>
          <Ikon className="far fa-window-close" style={{ marginRight: "40%", cursor: "pointer", color: "red" }} onClick={() => this.searchName()} disabled={this.state.tableClick}></Ikon>
          <Tombol className="crudPrin" onClick={this.buttonAdd} disabled={this.state.butCondAdd}>{this.state.butCondi ? "ADD" : "SAVE"}</Tombol>
          <Tombol className="crudPrin" onClick={this.buttonEdit} disabled={this.state.disableButEdit} >{this.state.butCondEdit ? "EDIT" : "UPDATE"}</Tombol>
          <Tombol className="crudPrin" onClick={this.buttonCancel} disabled={this.state.disableButDel}>{this.state.butCondDelete ? "DELETE" : "CANCEL"}</Tombol>
        </Kotak>
        <Kotak className="bodyPrin">
          <Kotak className="prinKiri">
            <Kotak className="prinKiriTabel">
              {/* ini nanti di for */}
              {
                this.state.principals.map((prin, idx) => {
                  return (
                    <Kotak key={idx}>
                      <Kotak className="prinisiTable" style={{ cursor: "pointer" }} disabled={this.state.tableClick} onClick={() => { this.HandleTable(prin.prinId) }}>
                        <Kotak className="prinTable">
                          <Ikon className="fas fa-tags" style={{ color: "white", display: 'inline-block', width: "70px", fontSize: "65px" }}></Ikon>
                        </Kotak>
                        <Kotak className="prinlabelTabel">
                          <LabelPrin className="prinlabelName">{prin.prinName}</LabelPrin>
                          <PrintLn />
                          <LabelPrin className="prinLabelid">{prin.prinId}</LabelPrin>
                        </Kotak>
                      </Kotak>
                    </Kotak>
                  )
                })
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
                <Pagination style={{ background: 'white', width: "100%" }} page={this.state.page} onChange={this.handleChange} count={this.state.count} />
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
              <Kotak>
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
                <InputPrin type="date" value={prinLicensed} disabled={this.state.disableInput} className="prinForm" name="prinLicensed" onChange={this.setValue} placeholder="Principal Licensed Expired" ></InputPrin>
              </Kotak>
              <Garis style={{ backgroundColor: "blue", width: "99%", height: "1px" }} />
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
  dataLoginUser: state.authReducer.userLogin
})
const mapDispatchToProps = dispatch => { // NGIRIM DATA
  return {
    dataPrincipal: (data) => dispatch({ type: "PRINCIPAL", payload: data }),
    dataNavbar: (data) => dispatch({ type: "NAVBAR", payload: data })

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Principal);