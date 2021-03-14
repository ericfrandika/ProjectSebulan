import React, { Component } from 'react';
import './style.css'
import InputPrin from '../../components/comp_principal/inputPrin'
import LabelPrin from '../../components/comp_principal/labelPrin'
import axios from 'axios'
import { connect } from 'react-redux';
import Pagination from '@material-ui/lab/Pagination';
import Swal from 'sweetalert2'

class Principal extends Component {
    constructor(props) {
        super(props);
        this.state = { 
         //-------------------------------Find ALL with Pagination-----------------------------------------
            page:1,
            count:0,
            limit:5,
            pageNow:1,

    //----------------------------------------------------DIDMOUNT---------------------------------------------
            principals:[],
            principalsRedux:[],
            prinId:"",
            prinName:"",
            prinAddress:"", 
            prinCity:"",
            prinPhone:"",
            prinFax:"",
            prinCountry:"",
            prinConPhone:"",
            prinLicensed:"",
            princreatedAt:"",
            princreatedBy:"",
            prinupdatedAt:"",
            prinupdatedBy:"",
            objPrin:{},
            searchPrin:"",
            actSearch:0,
            
    //--------------------------------------------ini Seluruh State Condisii button------------------------------
            disableInputId:true,
            butCondi: true,
            butCondEdit:true,
            butCondAdd:false,
            butCondDelete:true,
            disableBut :false,
            disableInput :true,
            disableButEdit : true,
            disableButDel : true,
            act : 0,
            actEdit:0,
            actDelete:0,
            tableClick:false
    //----------------------------------------------------------------------------------------------------------
         }
    }
    componentDidMount(){  
                this.getApiALLPrincipal();  
                this.getAPICount();
                this.getPaging(this.state.page ,this.state.limit);
              }
   
    setValue = el => {
        this.setState({
            [el.target.name]: el.target.value
            
        })  
    }
    setLimit = el =>{
      this.setState({
          limit : el.target.value,
      })
      if(this.state.searchPrin ==""){
      this.getAPICount();
      this.getPaging(this.state.pageNow, el.target.value);
      }
      else{
      this.getApiCountName();
      this.getApiName(this.state.pageNow, el.target.value);
      }
  }
    //---------------------------------------------------FUNCTION GET API--------------------------------------
    getApiALLPrincipal =()=>{
        axios.get("http://localhost:8080/admin/nexchief/principal/")
        .then(resp =>{
            this.props.dataPrincipal({dataPrincipal : resp.data})
        })
        .catch(() =>{
          alert("Failed fetching")
        })
    }
    getAPICount=()=>{
        axios.get("http://localhost:8080/admin/nexchief/principal/count/")
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
     //--------------------------------------------------------ONCHANGE PAGINATION------------------------------------------
 handleChange = (el,value) => {
  this.setState({
    page:value,
  });
  if(this.state.searchPrin ===""){
    this.getAPICount();
    this.getPaging(value ,this.state.limit);
  }
  else{
    this.getApiCountName();
    this.getApiName(value, this.state.limit)
  }
  
};
getPaging = (value, limit) => {
axios.get("http://localhost:8080/admin/nexchief/principal/paging/?page="+value+"&limit="+limit)
.then((resp) => {
  this.setState({
    principals: resp.data,
  });
});
}

//--------------------------------------------------GET PAGING NAME---------------------------------------------
getApiName=(value ,limit)=>{
  axios.get("http://localhost:8080/admin/nexchief/principal/name/"+this.state.searchPrin+"?page="+value+"&limit="+limit)
  .then(resp =>{
this.setState({principals:resp.data})
console.log(resp.data)
})
.catch(() =>{

})

}
    //---------------------------------------------------button Add--------------------------------------
  buttonAdd = () => {
    
      if(this.state.act === 0){
        if (this.state.prinName !=="") {
            this.resetState();
        }
        let createNow =  new Date().toLocaleDateString() +" "+ new Date().toLocaleTimeString()
        console.log(createNow);
        this.setState ({
            disableInputId:false,
            butCondi: false,
            disableButEdit : true,
            butCondDelete :false,
            disableInput :false,
            act:1,
            actDelete:1,
            tableClick:true, 
            princreatedAt : createNow,
            princreatedBy :this.props.dataLoginUser.username,
            prinupdatedAt : createNow,
            prinupdatedBy: this.props.dataLoginUser.username,
            disableButDel : false,

        });
            console.log("ini Admin " , this.state.princreatedBy)
    
}
    else{  
    const {prinId,prinName,prinAddress, prinCity, prinPhone, prinFax, prinCountry, prinConPhone, prinLicensed, princreatedAt,  princreatedBy, prinupdatedAt,prinupdatedBy} =this.state
    let objprincipal = {prinId,prinName,prinAddress, prinCity, prinPhone, prinFax, prinCountry, prinConPhone, prinLicensed, princreatedAt,  princreatedBy, prinupdatedAt,prinupdatedBy} 
    if ( prinName ==="" || prinAddress ==="" || prinCity ==="" ||  prinPhone ==="" ||  prinFax ==="" || prinCountry ==="" ||  prinConPhone ==="" ||  prinLicensed ===""){
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
    axios.post("http://localhost:8080/admin/nexchief/principal/",{
        ...objprincipal
     })
       .then((resp) => {
           console.log(resp);
           this.getApiALLPrincipal();
           this.getAPICount();
           this.getPaging(this.state.page ,this.state.limit);
           this.setState({
            butCondi: true,
            disableButEdit : true ,
            disableInput :true,
            butCondDelete: true,
            act:0,
            actDelete:0,
            tableClick:false,
            disableButDel : true,
            disableInputId:true,

          })
          this.resetState();
       })
       .catch((resp)=>{
           console.log("ini Consolog Eror : ",resp.response)
           Swal.fire({
             icon: 'error',
             title: 'Oops...',
             text: resp.response.data.errorMessage || resp.response.data
           })
       })
    Swal.fire('Saved!','', 'success')
      
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
        console.log(createNow);
        this.setState ({
           disableInputId:true,
            butCondEdit: false,
            disableInput :false,
            butCondAdd:true,
            butCondDelete:false,
            actEdit:1,
            actDelete: 1,
            tableClick:true,
            prinupdatedAt : createNow,
            prinupdatedBy :this.props.dataLoginUser.username
        });
    
}
    else{
        
        const {prinId,prinName,prinAddress, prinCity, prinPhone, prinFax, prinCountry, prinConPhone, prinLicensed, princreatedAt,  princreatedBy, prinupdatedAt,prinupdatedBy} =this.state
        let objprincipal = {prinId,prinName,prinAddress, prinCity, prinPhone, prinFax, prinCountry, prinConPhone, prinLicensed, princreatedAt,  princreatedBy, prinupdatedAt,prinupdatedBy} 
        console.log("ini object Principal : ", objprincipal)
        if (prinName ==="" || prinAddress ==="" || prinCity ==="" ||  prinPhone ==="" ||  prinFax ==="" || prinCountry ==="" ||  prinConPhone ==="" ||  prinLicensed ===""){
          Swal.fire(
            'Insert All Data!',
            'You clicked the button!',
            'error'
          )
      }
      else{ 
         Swal.fire({
          title: 'Do you want to Update the changes?',
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: `Update`,
          denyButtonText: `Don't Update`,
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            axios.put("http://localhost:8080/admin/nexchief/principal/"+this.state.prinId,{
           ...objprincipal
        })
          .then((resp) => {
              console.log(resp);
              this.getApiALLPrincipal();
              this.getAPICount();
              this.getPaging(this.state.page ,this.state.limit);
              this.setState ({
                butCondEdit: true,
                disableInput :true,
                butCondAdd:false,
                butCondDelete: true,
                disableButDel : true,
                actEdit:0,
                actDelete: 0,
                tableClick:false,
                disableButEdit : true,
                disableInputId:true
            });
            this.resetState()
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
        disableButEdit : true ,
        disableInput :true,
        butCondDelete: true,
        butCondAdd:false,
        butCondEdit:true,
        disableButDel : true,
        act:0,
        actEdit:0,
        actDelete:0,
        tableClick:false,
        princreatedAt:"",
        princreatedBy:"",
        prinupdatedAt:"",
        prinupdatedBy:"",
        disableInputId:true,
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
                axios.delete("http://localhost:8080/admin/nexchief/principal/"+this.state.prinId)
                 .then(resp =>{
          this.setState({
            disableButDel : true,
            disableButEdit : true ,
          })
          this.getApiALLPrincipal();
          this.getAPICount();
          this.getPaging(this.state.page ,this.state.limit);
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
  HandleTable = (prinId) =>{
    axios.get("http://localhost:8080/admin/nexchief/principal/"+prinId)
    .then(resp =>{
      this.setState({
        objPrin:resp.data,
        })
    })
    .catch(() =>{
      alert("Failed fetching")
    })
    this.setState(({
        disableButEdit : false,
        disableButDel : false,  
    }))
}
//-------------------------------------------------------RESET OBJEK--------------------------------------------------
 resetPrin =()=>{
     this.setState({
        objPrin:{}
     })
 }
 //-----------------------------------------------------RESET STATE---------------------------------------------------
 resetState =()=>{
     this.setState({
        prinId:"",
        prinName:"",
        prinAddress:"",
        prinCity:"",
        prinPhone:"",
        prinFax:"",
        prinCountry:"",
        prinConPhone:"",
        prinLicensed:"",
        prinupdatedAt:"",
        prinupdatedBy:"",
     })
 }

 //--------------------------------------------------------ONCCLICK SEARCH NAMA-----------------------------------------

 searchName =()=>{
  if(this.state.searchPrin==="" && this.state.actSearch === 0 ){
    Swal.fire(
      'Insert Your Principal Name Before Click Search',
      'You clicked the button!',
      'error'
    )
  }
else{
  if(this.state.actSearch === 0){
    this.getApiCountName();
    this.getApiName(this.state.pageNow , this.state.limit)
      this.setState({
          actSearch:1
      })
  }
  else{
      this.getAPICount();
      this.getPaging(this.state.pageNow, this.state.limit);
      this.setState({
          actSearch:0,
          searchPrin:""
      })
  }
}

}
 getApiCountName =()=>{
  axios.get("http://localhost:8080/admin/nexchief/principal/countName/"+this.state.searchPrin)
  .then(resp =>{
      let limitPage = resp.data/this.state.limit
    this.setState({
       count :Math.ceil(limitPage)
      })
  })
  .catch(() =>{
   
  })
 }

    render() { 
      console.log("Panjang Lenght : " , this.state.principals.length);
        console.log("ini adalah ARRAY REDUX : ",this.state.principalsRedux)
        if ("prinName" in this.state.objPrin) {
            this.setState({
                prinId:this.state.objPrin.prinId,
                prinName:this.state.objPrin.prinName,
                prinAddress:this.state.objPrin.prinAddress,
                prinCity:this.state.objPrin.prinCity,
                prinPhone:this.state.objPrin.prinPhone,
                prinFax:this.state.objPrin.prinFax,
                prinCountry:this.state.objPrin.prinCountry,
                prinConPhone:this.state.objPrin.prinConPhone,
                prinLicensed:this.state.objPrin.prinLicensed,
                princreatedAt:this.state.objPrin.princreatedAt,
                princreatedBy:this.state.objPrin.princreatedBy,
                prinupdatedAt:this.state.objPrin.prinupdatedAt,
                prinupdatedBy:this.state.objPrin.prinupdatedBy,
            })
            this.resetPrin();
        }
        const {prinId,prinName,prinAddress, prinCity, prinPhone, prinFax, prinCountry, prinConPhone, prinLicensed, princreatedAt,  princreatedBy, prinupdatedAt,prinupdatedBy} =this.state
        return (  
            <>
             <div className="prinAtas">
                <InputPrin value={this.state.searchPrin} className="SeacrhPrin" style={{marginRight:"1%"}} name="searchPrin" onChange={this.setValue} placeholder="Search name Principal"></InputPrin>
                <i className={this.state.actSearch === 0 ?'fas fa-search':'far fa-window-close'} style={{marginRight:"40%",cursor:"pointer"}} onClick={()=> this.searchName()}></i>
                <button className="crudPrin" onClick={this.buttonAdd} disabled={this.state.butCondAdd}>{this.state.butCondi? "ADD" : "SAVE"}</button>
                <button className="crudPrin" onClick={this.buttonEdit} disabled={this.state.disableButEdit} >{this.state.butCondEdit? "EDIT" : "UPDATE"}</button>
                <button className="crudPrin" onClick={this.buttonCancel} disabled={this.state.disableButDel}>{this.state.butCondDelete? "DELETE" : "CANCEL"}</button>
                </div>
            <div className="bodyPrin">
                
                <div className="prinKiri">
                    <div className="prinKiriTabel">
                    {/* ini nanti di for */}
                    {
                        this.state.principals.map((prin,idx)=>{
                            return(
                                <div className="prinisiTable" disabled={this.state.tableClick} onClick={()=>this.HandleTable(prin.prinId)}>
                                <div className ="prinTable">
                                <i className="fas fa-band-aid" style={{color:"white",display:'inline-block', width:"70px" ,fontSize:"65px"}}></i>
                                </div>
                                <div className="prinlabelTabel">
                                <LabelPrin className="prinlabelName">{prin.prinName}</LabelPrin>
                                <br/>
                                <LabelPrin className="prinLabelid">{prin.prinId}</LabelPrin>
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
                  
                    <hr style={{backgroundColor:"blue" , height:"1px"}}/>
                    <LabelPrin className="labelprin">Created At</LabelPrin>
               
                    <LabelPrin className="labelprin">Created By</LabelPrin>
                  
                    <LabelPrin className="labelprin">Updated At</LabelPrin>
                    
                    <LabelPrin className="labelprin">Updated By</LabelPrin>
                   
                </div>
                <div className="prinKananInput">
                    <div>
                    <InputPrin type="text" value={prinId} disabled={this.state.disableInputId} className="prinForm" name="prinId"  onChange={this.setValue} placeholder="Principal ID" ></InputPrin>
                    </div>
                    <div>
                    <InputPrin  type="text" value={prinName} disabled={this.state.disableInput} className="prinForm" name="prinName" onChange={this.setValue} placeholder="Principal Name" ></InputPrin>
                    </div> 
                    <div>
                    <textarea className="prinAlamat" value={prinAddress} disabled={this.state.disableInput} name="prinAddress" rows="4" cols="69" placeholder="Principal Address" onChange={this.setValue}></textarea>
                    </div> 
                    <div>
                    <InputPrin  type="text" value={prinCity} disabled={this.state.disableInput} className="prinForm" name="prinCity" onChange={this.setValue} placeholder="Principal City" ></InputPrin>
                    </div> 
                    <div>
                    <InputPrin  type="text"  value={prinPhone} disabled={this.state.disableInput} className="prinForm" name="prinPhone" onChange={this.setValue} placeholder="Principal Phone" ></InputPrin>
                    </div> 
                    <div>
                    <InputPrin  type="text" value={prinFax} disabled={this.state.disableInput} className="prinForm" name="prinFax" onChange={this.setValue} placeholder="Principal Fax" ></InputPrin>
                    </div> 
                    <div>
                    <InputPrin  type="text"  value={prinCountry} disabled={this.state.disableInput} className="prinForm" name="prinCountry" onChange={this.setValue} placeholder="Principal Country" ></InputPrin>
                    </div> 
                    <div>
                    <InputPrin  type="text" value={prinConPhone} disabled={this.state.disableInput} className="prinForm" name="prinConPhone" onChange={this.setValue} placeholder="Principal Contact Phone" ></InputPrin>
                    </div> 
                    <div>
                    <InputPrin  type="date" value={prinLicensed} disabled={this.state.disableInput} className="prinForm" name="prinLicensed" onChange={this.setValue} placeholder="Principal Licensed Expired" ></InputPrin>
                    </div> 
                    <hr style={{backgroundColor:"blue" ,width:"99%" ,height:"1px"}}/>
                    <div>
                    <InputPrin  type="text" value={princreatedAt} disabled={true} className="prinForm" name="princreatedAt" onChange={this.setValue} placeholder="Principal Created At" ></InputPrin>
                    </div> 
                    <div>
                    <InputPrin  type="text" value={princreatedBy} disabled={true} className="prinForm" name= "princreatedBy" onChange={this.setValue} placeholder="Principal Created By" ></InputPrin>
                    </div>
                    <div>
                    <InputPrin  type="text" value={prinupdatedAt} disabled={true} className="prinForm" name="prinupdatedAt" onChange={this.setValue} placeholder="Principal Updated At" ></InputPrin>
                    </div>
                    <div>
                    <InputPrin  type="text" value={prinupdatedBy} disabled={true} className="prinForm" name="prinupdatedBy" onChange={this.setValue} placeholder="Principal Updated by" ></InputPrin>
                    </div>
                </div>
                </div>
            </div>
            </>
         );
    }
    
}
 
const mapStateToProps = state => ({
    dataLoginUser : state.authReducer.userLogin
})
const mapDispatchToProps = dispatch => { // NGIRIM DATA
  return {
    dataPrincipal: (data) => dispatch({ type: "PRINCIPAL", payload: data }),
  }
}

export default connect(mapStateToProps,mapDispatchToProps) (Principal);