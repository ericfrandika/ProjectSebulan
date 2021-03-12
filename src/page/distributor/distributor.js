import React, { Component } from 'react';
import InputPrin from '../../components/comp_principal/inputPrin'
import LabelPrin from '../../components/comp_principal/labelPrin'
import Swal from 'sweetalert2'
import { connect } from 'react-redux';
import Pagination from '@material-ui/lab/Pagination';
import axios from 'axios'

class Distributor extends Component {
        constructor(props) {
            super(props);
            this.state = {  
                //---------------------------UNTUK PAGE----------------------------------
                page:1,
                count:0,
                limit:5,
                pageNow:1,

                //-----------------------------------STATE INPUT-----------------------------------------
                prinId:"",
                prinName:"",
                disId:"",
                disName:"",
                disAddress:"",
                disCity:"",
                disOwner:"",
                disEmail:"",
                disPhone:"",
                discreatedAt:"",
                discreatedBy:"",
                disupdatedAt:"",
                disupdatedBy:"",
                distributors:[],
                objDis:{},
                searchDis:"",
                tableClick:false,
                
    //-----------------------------------ini Seluruh State Condisii button--------------------

                butCondi: true,
                butCondEdit:true,
                butCondAdd:false,
                butCondDelete:true,
                disableBut :false,
                disableInput :true,
                disabledButEdit:true,
                disabledButDel:true,
                act : 0,
                actEdit:0,
                actDelete:0,
                actSearch:0,
                inputId:true
    //------------------------------------------------------------------------------------------------
    }
    }
    //------------------------------------------------COMPONENTDIDMOUNT-------------------------------------
    componentDidMount(){    
         this.getAPICount();
         this.getPaging(this.state.page, this.state.limit);
}
    //------------------------------------------SET VALUE---------------------------------------------
    setValue = el => {
        this.setState({
            [el.target.name]: el.target.value  
        })
    }
    setLimit = el =>{
        this.setState({
            limit : el.target.value
        })
    
        this.getAPICount();
        this.getPaging(this.state.pageNow, el.target.value);
    }
    //----------------------------------------------GET API COUNT----------------------------------
    getAPICount=()=>{
        axios.get("http://localhost:8080/admin/nexchief/distributor/count/")
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
    //--------------------------------------------handlePage---------------------------------------
    handleChange = (event, value) => {
        this.setState({
            page: value
        }) 
        this.getAPICount();
        this.getPaging(value ,this.state.limit);
    }
    //---------------------GET PAGINATION--------------------------
    getPaging = (value, limit) => {
    axios.get("http://localhost:8080/admin/nexchief/distributor/paging/?page="+value+"&limit="+limit)
    .then((resp) => {
      this.setState({
        distributors: resp.data,
      });
    });
    }
    //---------------------------------------------------Button TampilForm---------------------------------
  HandleTable = (disId) =>{
    axios.get("http://localhost:8080/admin/nexchief/distributor/"+disId)
    .then(resp =>{
      this.setState({
        objDis:resp.data,
        disabledButEdit : false,
        disabledButDel : false,
        })
    })
    .catch(() =>{
      alert('fetching Failed')
      
    })
   

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
        act:1,
        actDelete:1,
        disabledButEdit:true,
        discreatedAt : createNow,   
        discreatedBy :this.props.dataLoginUser.username,
        inputId:false,
        tableClick:true
    });
    this.resetDis()
    }
    else{
        const{prinId, disId,disName,disAddress, disCity,disOwner, disEmail, disPhone,  discreatedAt,discreatedBy, disupdatedAt, disupdatedBy} = this.state
        let objDistributor={prinId,disName, disId,disAddress, disCity,disOwner, disEmail, disPhone, discreatedAt,discreatedBy, disupdatedAt, disupdatedBy}
       
        if(prinId ==="" || disId ==="" ||disName ==="" ||
         disAddress ==="" || disCity ==="" || disOwner ==="" || 
         disEmail ==="" ||   disPhone ===""){
            Swal.fire(
                'Insert All Data!',
                'You clicked the button!',
                'error'
              )
        }
        else{
            Swal.fire({
                title: 'Do you want to save the changes?',
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: `Save`,
                denyButtonText: `Don't save`,
            }).then((result) => {
           if (result.isConfirmed) {
        axios.post("http://localhost:8080/admin/nexchief/distributor/",{
           ...objDistributor
          })
       .then((resp) => {
           console.log(resp);
        this.getAPICount();
        this.getPaging(this.state.page, this.state.limit);
        this.setState({
            butCondi: true,
            disableButEdit : false ,
            disableInput :true,
            butCondDelete: true,
            disabledButDel:true,
            act:0,
            inputId:true,
            actDelete:0,
            discreatedAt:"",
            discreatedBy:"",
            tableClick:false
    })
    this.resetDis();
})
    .catch((resp)=>{
        console.log(resp.response)
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: resp.response.data.errorMessage || resp.response.data
        })
    })
    Swal.fire('Saved!','', 'success')
    }else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
            })
        }     
}
}
//-------------------------------------------------------RESET OBJEK--------------------------------------------------
resetDisObj =()=>{
    this.setState({
       objDis:{}
    })
}

//-------------------------------------------------------Button edit--------------------------------------------------
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
        disupdatedAt : createNow,   
        disupdatedBy :this.props.dataLoginUser.username,
        disabledButDel:false,
        inputId:true,
        tableClick:true,
    });
    console.log("inibutton Add : " ,this.state.disId )
    }

    else{
        const{prinId, disId,disName,disAddress, disCity,disOwner, disEmail, disPhone,  discreatedAt,discreatedBy, disupdatedAt, disupdatedBy} = this.state
        let objDistributor={prinId,disName, disId,disAddress, disCity,disOwner, disEmail, disPhone, discreatedAt,discreatedBy, disupdatedAt, disupdatedBy}
       
        if(prinId ==="" || disId ==="" ||disName ==="" ||
        disAddress ==="" || disCity ==="" || disOwner ==="" || 
        disEmail ==="" ||   disPhone ===""){
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
        axios.put("http://localhost:8080/admin/nexchief/distributor/"+this.state.disId,{
           ...objDistributor
          })
       .then((resp) => {
           console.log(resp);
        this.getAPICount();
        this.getPaging(this.state.page, this.state.limit);
        this.setState ({
            butCondEdit: true,
            disableInput :true,
            butCondAdd:false,
            butCondDelete: true,
            actEdit:0,
            actDelete: 0,
            disabledButDel:true,
            disabledButEdit:true,
            tableClick:false,
            discreatedAt:"",
            discreatedBy:"",
    });
    this.resetDis();
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
    act:0,
    actEdit:0,
    actDelete:0,
    disabledButDel: true,
    disabledButEdit:true,
    tableClick:false,
    discreatedAt:"",
    discreatedBy:"",
    inputId:true
    })
    this.resetDis()
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
                axios.delete("http://localhost:8080/admin/nexchief/distributor/"+this.state.disId)
                 .then(resp =>{
          this.setState({
            disabledButDel : true,
            disabledButEdit : true ,
            discreatedAt:"",
            discreatedBy:"",
            tableClick:false
          })
          this.getAPICount();
          this.getPaging(this.state.page ,this.state.limit);
          this.resetDis();
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
    

    //--------------------------------------------------RESET INPUT------------------------------------
    resetDis = () =>{
        this.setState({
            prinId:"",
            prinName:"",
            disId:"",
            disName:"",
            disAddress:"",
            disCity:"",
            disOwner:"",
            disEmail:"",
            disPhone:"",
            disupdatedAt:"",
            disupdatedBy:"",
        })
    }
    //-----------------------------------------------------SEARCH NAME-----------------------------------
    searchName =()=>{
        if(this.state.searchDis ===""){
            Swal.fire(
              'Insert Distributor Name Before Search!',
              'You clicked the button!',
              'error'
            )
          }
          else{
        if(this.state.actSearch === 0){
            axios.get("http://localhost:8080/admin/nexchief/distributor/name/"+this.state.searchDis)
             .then(resp =>{
          this.setState({distributors:resp.data})
          console.log(resp.data)
        })
        .catch(() =>{
        })
            this.setState({
                actSearch:1,
            })
        }
        else{
            this.getAPICount();
            this.getPaging(this.state.page, this.state.limit);
            this.setState({
                actSearch:0,
                searchDis:""
            })
        }
    }
    }

    render() { 
        console.log("ini adalah obj Dist :",this.state.objDis)
        console.log("INI DATA PRIN NAME : ", this.state.prinId );
        if ("disName" in this.state.objDis) {
            this.setState({
                prinId:this.state.objDis.prinId,
                prinName:this.state.objDis.prinName,
                disId:this.state.objDis.disId,
                disName:this.state.objDis.disName,
                disAddress:this.state.objDis.disAddress,
                disCity:this.state.objDis.disCity,
                disOwner:this.state.objDis.disOwner,
                disEmail:this.state.objDis.disEmail,
                disPhone:this.state.objDis.disPhone,
                discreatedAt:this.state.objDis.discreatedAt,
                discreatedBy:this.state.objDis.discreatedBy,
                disupdatedAt:this.state.objDis.disupdatedAt,
                disupdatedBy:this.state.objDis.disupdatedBy,
            })
            this.resetDisObj();
        }
        console.log("OBJECT DISTRIBUTOR : ",this.state.objDis);
        const{prinId , prinName,disId,disName,disAddress, disCity,disOwner, disEmail, disPhone,  discreatedAt,discreatedBy, disupdatedAt, disupdatedBy} = this.state
        return (
        <>
          <div className="prinAtas">
                <InputPrin className="SeacrhPrin" style={{marginRight:"1%"}} name="searchDis" onChange={this.setValue} placeholder="Search Distributor Name" value={this.state.searchDis}></InputPrin>
                <i className={this.state.actSearch === 0 ?'fas fa-search':'far fa-window-close'} style={{marginRight:"40%",cursor:"pointer"}} onClick={()=> this.searchName()}></i>
                           <button className="crudPrin" onClick={this.buttonAdd} disabled={this.state.butCondAdd}>{this.state.butCondi? "ADD" : "SAVE"}</button>
                            <button className="crudPrin" onClick={this.buttonEdit} disabled={this.state.disabledButEdit} >{this.state.butCondEdit? "EDIT" : "SAVE"}</button>
                            <button className="crudPrin" onClick={this.buttonCancel} disabled={this.state.disabledButDel} >{this.state.butCondDelete? "DELETE" : "CANCEL"}</button>
                </div>
         <div className="bodyPrin">
               
                <div className="prinKiri">
                <div className="prinKiriTabel" >
                    {/* ini nanti di for */}
                    {
                        this.state.distributors.map((dis,idx)=>{
                            return(
                                <div className="prinisiTable" disabled={this.state.tableClick} onClick={()=>this.HandleTable(dis.disId)}>
                                <div className ="prinTable">
                                <i className="fas fa-band-aid" style={{color:"white",display:'inline-block', width:"70px" ,fontSize:"65px"}}></i>
                                </div>
                                <div className="prinlabelTabel" style={{marginTop:"0px"}}>
                                <LabelPrin className="prinlabelName">{dis.disName}</LabelPrin>
                                <br/>
                                <LabelPrin className="prinLabelalamat">{dis.disCity}</LabelPrin>
                                <br/>
                                <LabelPrin className="prinLabelid">{dis.disId}</LabelPrin>
                                </div>
                                </div>
                            )
                        })  
                  }
                   
            </div>
                <div className="prinKiriPagin">
                    <div>
                    <select  className="prinForm"  name="limit" style={{height:"5vh",width:"20%", marginTop:"3%"}} onChange={this.setLimit}>
                    <option value={parseInt(5)}>5</option>
                    <option value={parseInt(10)}>10</option> 
                    <option value={parseInt(15)}>15</option>
                    </select>
                    </div>
                <div>
                    <Pagination style={{background:'white',marginTop:'3%'}} page={this.state.page} onChange={this.handleChange}  count={this.state.count} />
                </div>
                </div>
                </div>
                <div className="prinKanan">
                <div className="prinKiriLabel">
                    <LabelPrin className="labelprin">Principal Name</LabelPrin>
                   
                    <LabelPrin className="labelprin">Distributor ID</LabelPrin>

                    <LabelPrin className="labelprin">Distributor Name</LabelPrin>
                   
                    <LabelPrin className="labelprin">Address</LabelPrin>
                 
                    <LabelPrin className="labelprin">----</LabelPrin>
                  
                    <LabelPrin className="labelprin">City</LabelPrin>
                   
                    <LabelPrin className="labelprin">Owner</LabelPrin>
                  
                    <LabelPrin className="labelprin">Email</LabelPrin>
                
                    <LabelPrin className="labelprin">Phone</LabelPrin>
                  
                    <hr style={{backgroundColor:"blue" , height:"1px"}}/>
                    <LabelPrin className="labelprin">Created At</LabelPrin>
               
                    <LabelPrin className="labelprin">Created By</LabelPrin>
                  
                    <LabelPrin className="labelprin">Updated At</LabelPrin>
                    
                    <LabelPrin className="labelprin">Updated By</LabelPrin>
                   
                </div>
                <div className="prinKananInput">
                    <div>
                    {/* -------------------------------------- nanti di for ini---------------------------------- */}
                    <select disabled={this.state.disableInput}  value={prinId} className="prinForm"  name="prinId" style={{height:"33px"}} onChange={this.setValue}>
                    <option value="">Principal Name</option>
                    {
                        this.props.dataPrincipal.map((dis,idx)=>{
                            return(
                                <option value={dis.prinId}>{dis.prinName}</option> 
                            )
                        })  
                  }
                    </select>
                    </div>
                    <div>
                    <InputPrin value={disId} disabled={this.state.inputId} type="text" className="prinForm" name="disId" onChange={this.setValue} placeholder="Distributor ID" ></InputPrin>
                    </div>
                    <div>
                    <InputPrin value={disName} disabled={this.state.disableInput} type="text" className="prinForm" name="disName" onChange={this.setValue} placeholder="Distributor Name" ></InputPrin>
                    </div> 
                    <div>
                    <textarea value={disAddress} disabled={this.state.disableInput} className="prinAlamat" name="disAddress" rows="4" cols="54" placeholder="alamat" onChange={this.setValue}></textarea>
                    </div> 
                    <div>
                    <InputPrin value={disCity} disabled={this.state.disableInput} type="text" className="prinForm" name="disCity" onChange={this.setValue} placeholder="Distributor City" ></InputPrin>
                    </div> 
                    <div>
                    <InputPrin value={disOwner} disabled={this.state.disableInput} type="text" className="prinForm" name="disOwner" onChange={this.setValue} placeholder="Distributor Owner" ></InputPrin>
                    </div> 
                    <div>
                    <InputPrin value={disEmail} disabled={this.state.disableInput} type="text" className="prinForm" name="disEmail" onChange={this.setValue} placeholder="Distributor Email" ></InputPrin>
                    </div> 
                    <div>
                    <InputPrin value={disPhone} disabled={this.state.disableInput} type="text" className="prinForm" name="disPhone" onChange={this.setValue} placeholder="Distributor Phone" ></InputPrin>
                    </div> 
                    <hr style={{backgroundColor:"blue" ,width:"99%" ,height:"1px"}}/>
                    <div>
                    <InputPrin value={discreatedAt} disabled={true} type="text" className="prinForm" name="discreatedAt" onChange={this.setValue} placeholder="Distributor Created At" ></InputPrin>
                    </div> 
                    <div>
                    <InputPrin value={discreatedBy} disabled={true} type="text" className="prinForm" name="discreatedBy" onChange={this.setValue} placeholder="Distributor Created By" ></InputPrin>
                    </div>
                    <div>
                    <InputPrin value={disupdatedAt} disabled={true} type="text" className="prinForm" name="disupdatedAt" onChange={this.setValue} placeholder="Distributor Updated At" ></InputPrin>
                    </div>
                    <div>
                    <InputPrin  disabled={true} type="text" value={disupdatedBy} className="prinForm" name="disupdatedBy" onChange={this.setValue} placeholder="Distributor Updated by" ></InputPrin>
                    </div>
                </div>
                </div>
                

            </div>
        </>  );
    }
}
 
const mapStateToProps = state => ({
    dataLoginUser : state.authReducer.userLogin,
    dataPrincipal : state.prinReducer.reducPrincipal
})



export default connect(mapStateToProps) (Distributor);