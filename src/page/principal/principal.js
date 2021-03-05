import React, { Component } from 'react';
import './style.css'
import InputPrin from '../../components/comp_principal/inputPrin'
import LabelPrin from '../../components/comp_principal/labelPrin'
import axios from 'axios'
import { Redirect } from 'react-router-dom';
class Principal extends Component {
    constructor(props) {
        super(props);
        this.state = { 

    //----------------------------------------------------DIDMOUNT---------------------------------------------
            principals:[],
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
            
    //--------------------------------------------ini Seluruh State Condisii button------------------------------
            butCondi: true,
            butCondEdit:true,
            butCondAdd:false,
            butCondDelete:true,
            disableBut :false,
            disableInput :true,
            disableButEdit : true,
            act : 0,
            actEdit:0,
            actDelete:0,
            tableClick:false
    //----------------------------------------------------------------------------------------------------------
         }
    }
    componentDidMount(){
        this.getApiALLPrincipal();
    }
   
    setValue = el => {
        this.setState({
            [el.target.name]: el.target.value
            
        })
    
    }
    //---------------------------------------------------FUNCTION GET API--------------------------------------
    getApiALLPrincipal =()=>{
        axios.get("http://localhost:8080/admin/nexchief/principal/")
        .then(resp =>{
          this.setState({principals:resp.data})
        })
        .catch(() =>{
          alert("Failed fetching")
        })
    }
    

    //---------------------------------------------------button Add--------------------------------------
  buttonAdd = () => {
      if(this.state.act === 0){
        this.resetState()
        this.resetPrin()
        let createNow =  new Date().toLocaleDateString() +" "+ new Date().toLocaleTimeString()
        console.log(createNow);
        this.setState ({
            butCondi: false,
            disableButEdit : true,
            butCondDelete :false,
            disableInput :false,
            act:1,
            actDelete:1,
            tableClick:true,      
        });
        this.setState({
                   princreatedAt : createNow
            })
    }
    else{
    // let createNow =  new Date().toLocaleDateString() +" "+ new Date().toLocaleTimeString()
    // console.log(createNow);
    //     this.setState({
    //         princreatedAt : createNow,
    //         prinupdatedAt : createNow
    //      })
         
    const {prinId,prinName,prinAddress, prinCity, prinPhone, prinFax, prinCountry, prinConPhone, prinLicensed, princreatedAt,  princreatedBy, prinupdatedAt,prinupdatedBy} =this.state
    let objprincipal = {prinId,prinName,prinAddress, prinCity, prinPhone, prinFax, prinCountry, prinConPhone, prinLicensed, princreatedAt,  princreatedBy, prinupdatedAt,prinupdatedBy} 
    let newPrincipals = this.state.principals
    console.log("ini object Principal : ", objprincipal)
    axios.post("http://localhost:8080/admin/nexchief/principal/",{
       ...objprincipal
    })
      .then((resp) => {
          console.log(resp);
          this.getApiALLPrincipal();
      })
        this.setState({
            butCondi: true,
            disableButEdit : false ,
            disableInput :true,
            butCondDelete: true,
            act:0,
            actDelete:1,
            tableClick:false
          })
    }
    this.resetState()
}

//// ------------------------------------------------------Button edit--------------------------------------
buttonEdit = () =>{
    if(this.state.actEdit === 0){
        let createNow =  new Date().toLocaleDateString() +" "+ new Date().toLocaleTimeString()
        console.log(createNow);
        this.setState ({
            butCondEdit: false,
            disableInput :false,
            butCondAdd:true,
            butCondDelete:false,
            actEdit:1,
            actDelete: 1,
            tableClick:true,
            princreatedAt:"",
            prinupdatedAt : createNow,

        });
        console.log("ini consologe  ID :",this.state.prinId)
    }

    else{
        
        const {prinId,prinName,prinAddress, prinCity, prinPhone, prinFax, prinCountry, prinConPhone, prinLicensed, princreatedAt,  princreatedBy, prinupdatedAt,prinupdatedBy} =this.state
        let objprincipal = {prinId,prinName,prinAddress, prinCity, prinPhone, prinFax, prinCountry, prinConPhone, prinLicensed, princreatedAt,  princreatedBy, prinupdatedAt,prinupdatedBy} 
        console.log("ini object Principal : ", objprincipal)
        axios.put("http://localhost:8080/admin/nexchief/principal/"+this.state.prinId,{
           ...objprincipal
        })
          .then((resp) => {
              console.log(resp);
              this.getApiALLPrincipal();

          })
        this.setState ({
            butCondEdit: true,
            disableInput :true,
            butCondAdd:false,
            butCondDelete: true,
            actEdit:0,
            actDelete: 0,
            tableClick:false
        });
        this.resetPrin()
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
        act:0,
        actEdit:0,
        actDelete:0,
        tableClick:false,
        princreatedAt:"",
        princreatedBy:"",
        prinupdatedAt:"",
        prinupdatedBy:"",
      })
      this.resetState()
    }
    //------------------------------------------------Untuk Delete----------------------------------
    else{
        axios.delete("http://localhost:8080/admin/nexchief/principal/"+this.state.prinId)
        .then(resp =>{
          console.log(resp)
          this.getApiALLPrincipal();
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
        // princreatedAt:"",
        princreatedBy:"",
        prinupdatedAt:"",
        prinupdatedBy:"",
     })
 }
 //--------------------------------------------------------ONCHANGE SEARCH NAMA-----------------------------------------
 setValueSearch =(el)=>{
     const search = el.target.value;
     if(search === ""){
        this.getApiALLPrincipal();
     }
     else{
        axios.get("http://localhost:8080/admin/nexchief/principal/name/"+search)
        .then(resp =>{
          this.setState({principals:resp.data})
          console.log(resp.data)
        })
        .catch(() =>{
         
        })
     }
 }

    render() { 
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
                <InputPrin className="SeacrhPrin" name="searchPrin" onChange={this.setValueSearch} placeholder="Search"></InputPrin>
                <button className="crudPrin" onClick={this.buttonAdd} disabled={this.state.butCondAdd}>{this.state.butCondi? "ADD" : "SAVE"}</button>
                <button className="crudPrin" onClick={this.buttonEdit} disabled={this.state.disableButEdit} >{this.state.butCondEdit? "EDIT" : "UPDATE"}</button>
                <button className="crudPrin" onClick={this.buttonCancel} >{this.state.butCondDelete? "DELETE" : "CANCEL"}</button>
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
                                <i class="fas fa-band-aid" style={{color:"white",display:'inline-block', width:"70px" ,fontSize:"65px"}}></i>
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
                    <InputPrin type="text" value={prinId} disabled={this.state.disableInput} className="prinForm" name="prinId"  onChange={this.setValue} placeholder="Principal ID" ></InputPrin>
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
                    <InputPrin  type="text" value={prinLicensed} disabled={this.state.disableInput} className="prinForm" name="prinLicensed" onChange={this.setValue} placeholder="Principal Licensed Expired" ></InputPrin>
                    </div> 
                    <hr style={{backgroundColor:"blue" ,width:"99%" ,height:"1px"}}/>
                    <div>
                    <InputPrin  type="text" value={princreatedAt} disabled={true} className="prinForm" name="princreatedAt" onChange={this.setValue} placeholder="Principal Created At" ></InputPrin>
                    </div> 
                    <div>
                    <InputPrin  type="text" value={princreatedBy} disabled={this.state.disableInput} className="prinForm" name= "princreatedBy" onChange={this.setValue} placeholder="Principal Created By" ></InputPrin>
                    </div>
                    <div>
                    <InputPrin  type="text" value={prinupdatedAt} disabled={true} className="prinForm" name="prinupdatedAt" onChange={this.setValue} placeholder="Principal Updated At" ></InputPrin>
                    </div>
                    <div>
                    <InputPrin  type="text" value={prinupdatedBy} disabled={this.state.disableInput} className="prinForm" name="prinupdatedBy" onChange={this.setValue} placeholder="Principal Updated by" ></InputPrin>
                    </div>
                </div>
                </div>
            </div>
            </>
         );
    }
}
 
export default Principal;