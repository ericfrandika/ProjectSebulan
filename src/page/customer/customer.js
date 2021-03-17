import React, { Component } from 'react';
import InputPrin from '../../components/comp_principal/inputPrin'
import LabelPrin from '../../components/comp_principal/labelPrin'
import { connect } from 'react-redux';
import axios from 'axios'
import Pagination from '@material-ui/lab/Pagination';
import Swal from 'sweetalert2'
import './style.css'
import { withStyles } from '@material-ui/core/styles';
import { purple } from '@material-ui/core/colors';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import AntSwitch from './CustomizedSwitches'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
class Customer extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            //------------------------------------------Page----------------------------------------
            page:1,
            count:0,
            limit:5,
            pageNow:1,
            //-----------------------------------------State Form-------------------------------------------------------
            cusId:"",
            cusName:"",
            cusPass:"",
            cusAddress:"",
            cusPhone:"",
            prinId:"",
            disId:null,
            cusOnOff:true,
            cusRegis:"",
            cusValid:"",
            cuscreatedAt:"",
            cuscreatedBy:"",
            cusupdatedAt:"",
            cusupdatedBy:"",
            customers:[],
            searchCus:"",
            objCus:{},
             //-----------------------------------ini Seluruh State Condisii button--------------------
             butCondi: true,
             butCondEdit:true,
             butCondAdd:false,
             butCondDelete:true,
             disableBut :false,
             disableInput :true,
             disabledButDel:true,
             disabledButEdit:true,
             tableClick:false,
             act : 0,
             actEdit:0,
             actDelete:0,
             actSearch:0
             //------------------------------------------------------------------------------------------
 }
 }
 //------------------------------------------------SET VALUE--------------------------------------------------
 setValue = el => {
    this.setState({
        [el.target.name]: el.target.value
    })  
}

setValueName  =el =>{
    if(this.state.actEdit === 1){
        this.setState({
            [el.target.name]: el.target.value,
        })
    }
    else{
    if(el.target.name == "prinId"){
        this.setState({
            [el.target.name]: el.target.value,
            cusId:  this.state.cusName+"." +el.target.value
        })
    }
    else{
        this.setState({
            [el.target.name]: el.target.value,
            cusId:  el.target.value +"."+this.state.prinId
        })
    }
}   

}


//-----------------------------------------------------Component Did Mount-------------------------------------------------------------------------
componentDidMount(){
    this.getAPICount();
    this.getPaging(this.state.pageNow, this.state.limit);
}
//----------------------------------------------GET API COUNT----------------------------------
 getAPICount=()=>{
    axios.get("http://localhost:8080/admin/nexchief/customer/count/")
    .then(resp =>{
        let limitPage = resp.data/this.state.limit
      this.setState({
         count :Math.ceil(limitPage)
        })
    })
    .catch(() =>{
      alert("Failed fetching")
    })
}
//--------------------------------------GetCountAndApiName-------------------------------
getApiName = (value, limit) => {
    axios.get("http://localhost:8080/admin/nexchief/customer/name/"+this.state.searchCus+"?page="+value+"&limit="+limit)
    .then(resp =>{
 this.setState({customers:resp.data})
 console.log(resp.data)
})
.catch(() =>{
})
   this.setState({
       actSearch:1,
   })
}
searchName =()=>{
    this.getAPICount();
    this.getPaging(this.state.page, this.state.limit);
    this.setState({
        actSearch:0,
        searchCus:""
    })

}

//---------------------------------------SEarchName--------------------------------------------

getApiCountName =()=>{
    axios.get("http://localhost:8080/admin/nexchief/customer/countName/"+this.state.searchCus)
    .then(resp =>{
        let limitPage = resp.data/this.state.limit
      this.setState({
         count :Math.ceil(limitPage)
        })
    })
    .catch(() =>{
     
    })
   }
   //-------------------------------------------Search Name Distributor------------------------------------------------------------
buttonSearch =()=>{
    if(this.state.searchCus === ""){
        this.getAPICount();
        this.getPaging(this.state.pageNow, this.state.limit);
        this.setState({
            searchCus:""
        })
    }
    else{
        this.getApiCountName();
        this.getApiName(this.state.pageNow , this.state.limit)
            this.setState({
                actSearch : 1
            })
}
}
//--------------------------------------------handlePage---------------------------------------
handleChange = (event, value) => {
    this.setState({
        page: value
    }) 
    if(this.state.searchCus ===""){
        this.getAPICount();
        this.getPaging(value ,this.state.limit);
    }
    else{
        this.getApiCountName();
        this.getApiName(value, this.state.limit)
    }
}
getPaging = (value, limit) => {
    axios.get("http://localhost:8080/admin/nexchief/customer/paging/?page="+value+"&limit="+limit)
    .then((resp) => {
      this.setState({
        customers: resp.data,
      });
    });
    }
    setLimit = el =>{
        this.setState({
            limit : el.target.value
        })
        if(this.state.searchCus ===""){
            this.getAPICount();
            this.getPaging(this.state.pageNow, el.target.value);
            }
            else{
            this.getApiCountName();
            this.getApiName(this.state.pageNow, el.target.value);
            }
    }

 //---------------------------------------------------button Add--------------------------------------
 buttonAdd = () => {
 if(this.state.act === 0){
    let createNow =  new Date().toLocaleDateString() +" "+ new Date().toLocaleTimeString()

 this.setState ({
     butCondi: false,
     disableButEdit : true,
     butCondDelete :false,
     disableInput :false,
     disabledButDel:false,
     disabledButEdit:true,
     cuscreatedAt : createNow,   
     cuscreatedBy :this.props.dataLoginUser.username,
     act:1,
     actDelete:1,
     tableClick:true
 });
 this.resetState()
 }
 else{
    const{cusId,cusName,cusPass,cusAddress,cusPhone,prinId,disId,cusOnOff,cusRegis,cusValid,cuscreatedAt,cuscreatedBy,cusupdatedAt,cusupdatedBy} = this.state
    let objCustomer = {cusId,cusName,cusPass,cusAddress,cusPhone,prinId,disId,cusOnOff,cusRegis,cusValid,cuscreatedAt,cuscreatedBy,cusupdatedAt,cusupdatedBy}
    if(cusId ==="" || cusName ==="" ||  cusPass ==="" || cusAddress ==="" ||
     cusPhone ==="" || prinId ==="" || cusRegis ==="" ||cusValid ===""){
        Swal.fire(
            'Insert All Data!',
            'You clicked the button!',
            'error'
          )
     }
   else{ Swal.fire({
        title: 'Do you want to save the changes?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: `Save`,
        denyButtonText: `Don't save`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            axios.post("http://localhost:8080/admin/nexchief/customer/",{
                ...objCustomer
             })
               .then((resp) => {
                this.setState({
                    butCondi: true,
                    disableButEdit : false ,
                    disableInput :true,
                    butCondDelete: true,
                    disabledButDel:true,
                    act:0,
                    actDelete:1
                    
                })
                this.getAPICount();
                this.getPaging(this.state.pageNow, this.state.limit);
               })
               .catch((resp)=>{
                console.log(resp.response)
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
 buttonEdit = () =>{
 if(this.state.actEdit === 0){
let createNow =  new Date().toLocaleDateString() +" "+ new Date().toLocaleTimeString()

 this.setState ({
     butCondEdit: false,
     disableInput :false,
     butCondAdd:true,
     butCondDelete:false,
     actEdit:1,
     actDelete: 1,
     cusupdatedAt : createNow,   
     cusupdatedBy :this.props.dataLoginUser.username,
     tableClick:true,

 });
 }

 else{
     
    const{cusId,cusName,cusPass,cusAddress,cusPhone,prinId,disId,cusOnOff,cusRegis,cusValid,cusupdatedAt,cusupdatedBy} = this.state
    let objCustomer = {cusId,cusName,cusPass,cusAddress,cusPhone,prinId,disId,cusOnOff,cusRegis,cusValid,cusupdatedAt,cusupdatedBy}
    if(cusId ==="" || cusName ==="" ||  cusPass ==="" || cusAddress ==="" ||
     cusPhone ==="" || prinId ==="" || cusRegis ==="" ||cusValid ===""){
        Swal.fire(
            'Insert All Data!',
            'You clicked the button!',
            'error'
          )
     }
   else{ Swal.fire({
        title: 'Do you want to save the changes?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: `Update`,
        denyButtonText: `Don't Update`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            axios.put("http://localhost:8080/admin/nexchief/customer/"+this.state.cusId,{
                ...objCustomer
             })
               .then((resp) => {
                    this.setState ({
                        butCondEdit: true,
                        disableInput :true,
                        butCondAdd:false,
                        butCondDelete: true,
                        disabledButDel:true,
                        disabledButEdit:true,
                        actEdit:0,
                        actDelete: 0,
                        tableClick:false,

                    });
                this.getAPICount();
                this.getPaging(this.state.pageNow, this.state.limit);
               })
               .catch((resp)=>{
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

 buttonCancel =() => {
 //---------------------------------------------Untuk Cancel-----------------------------------
 if(this.state.actDelete === 1){
 this.setState({
 butCondi: true,
 disableButEdit : false ,
 disableInput :true,
 butCondDelete: true,
 butCondAdd:false,
 butCondEdit:true,
 disabledButDel: true,
disabledButEdit:true,
    cuscreatedAt:"",
    cuscreatedBy:"",
    cusupdatedAt:"",
    cusupdatedBy:"",
 act:0,
 actEdit:0,
 actDelete:0,
 tableClick:false,
 })
 this.resetState()
 }
 //------------------------------------------------Untuk Delete----------------------------------
 else{
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
            axios.delete("http://localhost:8080/admin/nexchief/customer/"+this.state.cusId)
            .then(resp =>{
        this.setState({
            disabledButDel : true,
            disabledButEdit : true ,
            discreatedAt:"",
            discreatedBy:"",
            tableClick:false
          })
          this.getAPICount();
          this.getPaging(this.state.pageNow , this.state.limit)
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
 HandleTable = (cusId) =>{
    axios.get("http://localhost:8080/admin/nexchief/customer/"+cusId)
    .then(resp =>{
        console.log(resp.data);
      this.setState({
        objCus:resp.data,
        disabledButEdit : false,
        disabledButDel : false,
        cusId:resp.data.cusId,
        cusName:resp.data.cusName,
        cusPass:resp.data.cusPass,
        cusAddress:resp.data.cusAddress,
        cusPhone:resp.data.cusPhone,
        prinId:resp.data.prinId,
        prinName:resp.data.prinName,
        disId:resp.data.disId,
        disName:resp.data.disName,
        cusOnOff:resp.data.cusOnOff === "true" ? true : false,
        cusRegis:resp.data.cusRegis,
        cusValid: resp.data.cusValid,
        cuscreatedAt:resp.data.cuscreatedAt,
        cuscreatedBy:resp.data.cuscreatedBy,
        cusupdatedAt:resp.data.cusupdatedAt,
        cusupdatedBy:resp.data.cusupdatedBy
        })
    })
    .catch(() =>{
      alert('fetching Failed') 
    })   
}
//-------------------------------------------------------Reset RESET -------------------------------------------------------
resetCusObj=()=>{
    this.setState({
        objCus:{}
    })
}

resetState =() =>{
    this.setState({
        cusId:"",
        cusName:"",
        cusPass:"",
        cusAddress:"",
        cusPhone:"",
        prinId:"",
        disId:null,
        cusOnOff:true,
        cusRegis:"",
        cusValid:"",
    })
}
setValueChecked =(el)=>{
    this.setState({
        [el.target.name]: el.target.checked 
    })
}

    render() { 
        this.props.dataNavbar({dataNavbar : this.state.tableClick})
    console.log("SearchName" , this.state.searchCus);
      
        const{page,limit,cusId,cusName,cusPass,cusAddress,cusPhone,prinId,disId,cusOnOff,cusRegis,cusValid,cuscreatedAt,cuscreatedBy,cusupdatedAt,cusupdatedBy} = this.state
        console.log("TOGGLE : ", this.state.cusOnOff);
        return (  
            <>
              <div className="prinAtas">
                <InputPrin className="SeacrhPrin" style={{marginRight:"1%"}} name="searchCus" value={this.state.searchCus} onChange={this.setValue} placeholder="Search"></InputPrin>
                <button className="crudPrin"  style={{marginRight:"1%",width:"5%"}} onClick={this.buttonSearch} disabled={this.state.butCondAdd}>SEARCH</button>
                <i className="far fa-window-close" style={{marginRight:"40%",cursor:"pointer" ,color:"red"}} onClick={()=> this.searchName()}></i>
                <button className="crudPrin" onClick={this.buttonAdd} disabled={this.state.butCondAdd}>{this.state.butCondi? "ADD" : "SAVE"}</button>
                <button className="crudPrin" onClick={this.buttonEdit} disabled={this.state.disabledButEdit}>{this.state.butCondEdit? "EDIT" : "UPDATE"}</button>
                <button className="crudPrin" onClick={this.buttonCancel} disabled={this.state.disabledButDel}>{this.state.butCondDelete? "DELETE" : "CANCEL"}</button>
                </div>
              <div className="bodyPrin">
                <div className="prinKiri">
                <div className="prinKiriTabel">
                    {/* ini nanti di for */}
                    {
                        this.state.customers.map((cus,idx)=>{
                            return(
                                <div key={idx}>
                                <div className="cusisiTable" disabled={this.state.tableClick} onClick={()=>this.HandleTable(cus.cusId)}>
                                <div className ="prinTable">
                                <i className="fas fa-id-badge" style={{color:"white",display:'inline-block', width:"30px" ,fontSize:"50px",marginTop:"20%"}}></i>
                                </div>
                                <div className="CustomerTabel">
                                    <div className="CustomerTabelkiri" style={{fontSize:"small",marginLeft:"10%"}}>
                                        <LabelPrin className="prinlabelName">{cus.cusName}</LabelPrin>
                                        <br/>
                                        <LabelPrin className="prinLabelid">{cus.cusId}</LabelPrin>
                                        {/* <LabelPrin className="prinLabelid" style={{color:"blue" , fontWeight:"upperCase"}}>{"."+cus.prinId}</LabelPrin> */}
                                        <br/>
                                        <LabelPrin className="prinLabelDis" style={{fontSize:"small"}}>{cus.prinName}</LabelPrin>
                                    </div>
                                <div className="CustomerTabelKanan">
                                    <LabelPrin className="prinIndex">{((page*limit)-limit)+idx+1}</LabelPrin>
                                    <br/>  
                                    <LabelPrin className="prinTgl" style={{color:"#4CC417",fontSize:"small"}}>2020-03-11</LabelPrin>
                                    <br/>
                                    <LabelPrin className="prinPremium">Premium</LabelPrin>
                                    <br/>
                                </div>
                                </div>
                                </div>
                                </div>
                           
                            )
                        })  
                  }

                </div>

                <div className="prinKiriPagin">
                    <div className="prinLimit" style={{width:"20%",marginRight:"5%" ,textAlign:"center"}}> 
                        <select  className="prinForm"  name="limit" style={{fontWeight:"bold", height:"5vh",width:"100%", marginLeft:"5%"}} onChange={this.setLimit}>      
                            <option value={parseInt(5)}>5</option>
                            <option value={parseInt(10)}>10</option> 
                            <option value={parseInt(15)}>15</option>
                        </select>
                    </div>
                    <div className="prinPage" style={{width:"75%"}}>
                        <Pagination style={{background:'white' ,width:"100%"}} page={this.state.page} onChange={this.handleChange}  count={this.state.count} />
                    </div>
                </div>

                </div>
                <div className="prinKanan">
                <div className="prinKiriLabel">

                    <LabelPrin className="labelprin">User ID</LabelPrin>
                   
                    <LabelPrin className="labelprin">User Name</LabelPrin>

                    <LabelPrin className="labelprin">Password</LabelPrin>
                   
                    <LabelPrin className="labelprin">Address</LabelPrin>
                 
                    <LabelPrin className="labelprin">----</LabelPrin>
                   
                    <LabelPrin className="labelprin">Phone</LabelPrin>

                    <hr style={{backgroundColor:"blue" , height:"1px"}}/>

                  
                    <LabelPrin className="labelprin">Principal</LabelPrin>
                
                    <LabelPrin className="labelprin">Distributor</LabelPrin>
                  
                    <hr style={{backgroundColor:"blue" , height:"1px"}}/>

                    <LabelPrin className="labelprin">Disable Login</LabelPrin>
                    <LabelPrin className="labelprin">Registrasion Date</LabelPrin>
                    <LabelPrin className="labelprin">Product Valid Thru</LabelPrin>

                    <hr style={{backgroundColor:"blue" , height:"1px"}}/>

                    <LabelPrin className="labelprin">Created At</LabelPrin>
               
                    <LabelPrin className="labelprin">Created By</LabelPrin>
                  
                    <LabelPrin className="labelprin">Updated At</LabelPrin>
                    
                    <LabelPrin className="labelprin">Updated By</LabelPrin>
                   
                </div>
                <div className="prinKananInput">
                    <div>
                    <InputPrin type="text" disabled={true} value={cusId} className="prinForm" name="cusId" onChange={this.setValue} placeholder="Customer ID" ></InputPrin>
                    </div>
                    <div>
                    <InputPrin  type="text" disabled={this.state.disableInput} value={cusName} className="prinForm" name="cusName" onChange={this.setValueName} placeholder="Customer UserName" ></InputPrin>
                    </div> 
                    <div>
                    <InputPrin  type="text" disabled={this.state.disableInput} value={cusPass} className="prinForm" name="cusPass" onChange={this.setValue} placeholder="Customer Password" ></InputPrin>
                    </div> 
                    <div>
                    <textarea className="prinAlamat" disabled={this.state.disableInput} value={cusAddress} name="cusAddress" rows="4" cols="54" placeholder="Alamat"  onChange={this.setValue}></textarea>
                    </div> 
                    <div>
                    <InputPrin  type="text" disabled={this.state.disableInput} className="prinForm" value={cusPhone} name="cusPhone" onChange={this.setValue} placeholder="Customer Phone" ></InputPrin>
                    </div> 
                    <hr style={{backgroundColor:"blue" ,width:"99%" ,height:"1px" ,marginBottom:"0"}}/>
                    <div>
                    {/* -------------------------------------- nanti di for ini---------------------------------- */}
                    <select className="prinForm" disabled={this.state.disableInput} value={prinId}  name="prinId" style={{height:"33px"}} onChange={this.setValueName}>
                    <option value="">Principal name</option> 
                        {
                        this.props.dataPrincipal.map((prin,idx)=>{
                            return(
                                <option key={idx} value={prin.prinId}>{prin.prinId +" || "+prin.prinName}</option> 
                            )
                        })  
                    }
                    </select>
                    </div>
                    <div>
                    {/* -------------------------------------- nanti di for ini---------------------------------- */}
                    <select className="prinForm" disabled={this.state.disableInput} value={disId} name="disId" style={{height:"33px"}} onChange={this.setValue}>
                        <option value={null}>Distributor name</option>
                        {
                        this.props.dataDistributor.map((dis,idx)=>{
                            return(
                                <option key={idx} value={dis.disId}>{dis.disId +" || "+ dis.disName}</option> 
                                
                            )
                        })  
                    } 
                    </select>
                    </div>
                    <hr style={{backgroundColor:"blue" ,width:"99%" ,height:"1px",marginBottom:"0"}}/>
                    <div className="toggleOnOff">
                    {/* -------------------------------------- nanti di for ini---------------------------------- */}
                    {/* <select className="prinForm" disabled={this.state.disableInput} value={cusOnOff} name="cusOnOff" style={{height:"33px" ,width:"100px"}} onChange={this.setValue}>
                        <option value="On">On</option>
                        <option value="Off">Off</option> 
                    </select> */}
                    <FormGroup>
                        <Typography component="div">
                            <Grid component="label" container alignItems="center" spacing={1}>
                            <Grid item>Off</Grid>
                            <Grid item>
                                <AntSwitch disabled={this.state.disableInput}  checked={cusOnOff} onChange={this.setValueChecked} name="cusOnOff" />
                                {/* <InputText clasName="hobby" type="checkbox" checked={hobby.findIndex(e => e === "RENANG") > -1 ?"checked":""} name="hobby" id="hobby" value="RENANG"  onChange={this.setValueHobby} />Renang  */}
                            </Grid>
                            <Grid item>On</Grid>
                            </Grid>
                        </Typography>
                     </FormGroup>
                    </div>
                    <div>
                    <InputPrin  type="date" style={{width:"20%"}} disabled={this.state.disableInput} disabled={this.state.disableInput} className="prinForm" value={cusRegis} name="cusRegis" onChange={this.setValue} placeholder="Customer Regis Date" ></InputPrin>
                    </div> 
                    <div>
                    <InputPrin  type="date" style={{width:"20%"}}  disabled={this.state.disableInput} className="prinForm" name="cusValid" onChange={this.setValue} value={cusValid} placeholder="Customer Product Thru" ></InputPrin>
                    </div> 
                    <hr style={{backgroundColor:"blue" ,width:"99%" ,height:"1px", marginBottom:"0"}}/>

                    <div>
                    <InputPrin  type="text" disabled={true} value={cuscreatedAt} className="prinForm" name="cuscreatedAt" onChange={this.setValue} placeholder="Customer Created At" ></InputPrin>
                    </div> 
                    <div>
                    <InputPrin  type="text" disabled={true} value={cuscreatedBy} className="prinForm" name="cuscreatedby" onChange={this.setValue} placeholder="Customer Created By" ></InputPrin>
                    </div>
                    <div>
                    <InputPrin  type="text" disabled={true} value={cusupdatedAt} className="prinForm" name="cusupdatedAt" onChange={this.setValue} placeholder="Customer Updated At" ></InputPrin>
                    </div>
                    <div>
                    <InputPrin  type="text" disabled={true} value={cusupdatedBy} className="prinForm" name="cusupdatedBy" onChange={this.setValue} placeholder="Customer Updated by" ></InputPrin>
                    </div>

                </div>
                </div>
            </div>
            </>
        );
    }
}

const mapStateToProps = state => ({
    dataLoginUser   : state.authReducer.userLogin,
    dataPrincipal   : state.prinReducer.reducPrincipal,
    dataDistributor : state.disReducer.reducDistributor
})
const mapDispatchToProps = dispatch => { // NGIRIM DATA
    return {
      dataNavbar: (data) => dispatch({ type: "NAVBAR", payload: data }),
    }
  }
export default connect(mapStateToProps, mapDispatchToProps) (Customer);