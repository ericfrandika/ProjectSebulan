import React, { Component } from 'react';
import InputPrin from '../../components/comp_principal/inputPrin'
import LabelPrin from '../../components/comp_principal/labelPrin'
import Swal from 'sweetalert2'
import { connect } from 'react-redux';
import axios from 'axios'


class Distributor extends Component {
        constructor(props) {
            super(props);
            this.state = {  
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

                //-----------------------------------ini Seluruh State Condisii button--------------------
                butCondi: true,
                butCondEdit:true,
                butCondAdd:false,
                butCondDelete:true,
                disableBut :false,
                disableInput :true,
                act : 0,
                actEdit:0,
                actDelete:0
                //------------------------------------------------------------------------------------------
    }
    }
    //------------------------------------------SET VALUE---------------------------------------------
    setValue = el => {
        this.setState({
            [el.target.name]: el.target.value  
        })
    }
   
    //---------------------------------------------------button Add--------------------------------------
    buttonAdd = () => {
    if(this.state.act === 0){
    this.setState ({
        butCondi: false,
        disableButEdit : true,
        butCondDelete :false,
        disableInput :false,
        act:1,
        actDelete:1
    });
    }
    else{
        const{prinId, disId,disName,disAddress, disCity,disOwner, disEmail, disPhone,  discreatedAt,discreatedBy, disupdatedAt, disupdatedBy} = this.state
        let objDistributor={prinId,disName, disId,disAddress, disCity,disOwner, disEmail, disPhone, discreatedAt,discreatedBy, disupdatedAt, disupdatedBy}
        console.log("INI OBJE ADD : ", objDistributor)
        axios.post("http://localhost:8080/admin/nexchief/distributor/",{
           ...objDistributor
          })
       .then((resp) => {
           console.log(resp);
        Swal.fire(
            'Good job!',
            'You clicked the button!',
            'success'
          )
    this.setState({
        butCondi: true,
        disableButEdit : false ,
        disableInput :true,
        butCondDelete: true,
        act:0,
        actDelete:1
    })
})
    .catch((resp)=>{
        console.log(resp.response)
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: resp.response.data.errorMessage || resp.response.data
        })
    })
    }
}

    //// ------------------------------------------------------Button edit--------------------------------------
    buttonEdit = () =>{
    if(this.state.actEdit === 0){
    this.setState ({
        butCondEdit: false,
        disableInput :false,
        butCondAdd:true,
        butCondDelete:false,
        actEdit:1,
        actDelete: 1
    });
    }

    else{
    this.setState ({
        butCondEdit: true,
        disableInput :true,
        butCondAdd:false,
        butCondDelete: true,
        actEdit:0,
        actDelete: 0
    });
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
    actDelete:0
    })
    }
    //------------------------------------------------Untuk Delete----------------------------------
    else{
    }
    }
    render() { 
        console.log("PRINCIPAL ID PRIN : ",this.state.prinId);
        return (
        <>
          <div className="prinAtas">
                <InputPrin className="SeacrhPrin" name="searchDis" onChange={this.setValue} placeholder="Search"></InputPrin>
                           <button className="crudPrin" onClick={this.buttonAdd} disabled={this.state.butCondAdd}>{this.state.butCondi? "ADD" : "SAVE"}</button>
                            <button className="crudPrin" onClick={this.buttonEdit} disabled={this.state.disableButEdit} >{this.state.butCondEdit? "EDIT" : "SAVE"}</button>
                            <button className="crudPrin" onClick={this.buttonCancel} >{this.state.butCondDelete? "DELETE" : "CANCEL"}</button>
                </div>
         <div className="bodyPrin">
               
                <div className="prinKiri">
                    {/* ini nanti di for */}
                    <div className="prinisiTable">
                    <div className ="prinTable">
                    <i className="fas fa-band-aid" style={{color:"white",display:'inline-block', width:"70px" ,fontSize:"65px"}}></i>
                    </div>
                    <div className="prinlabelTabel" style={{marginTop:"0px"}}>
                    <LabelPrin className="prinlabelName">PT.Jne</LabelPrin>
                    <br/>
                    <LabelPrin className="prinLabelalamat">000100302020</LabelPrin>
                    <br/>
                    <LabelPrin className="prinLabelid">Kong ID</LabelPrin>
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
                    <select disabled={this.state.disableInput}  className="prinForm" id="StudentGender" name="prinId" style={{height:"33px"}} onChange={this.setValue}>
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
                    <InputPrin disabled={this.state.disableInput} type="text" className="prinForm" name="disId" onChange={this.setValue} placeholder="Distributor ID" ></InputPrin>
                    </div>
                    <div>
                    <InputPrin disabled={this.state.disableInput} type="text" className="prinForm" name="disName" onChange={this.setValue} placeholder="Distributor Name" ></InputPrin>
                    </div> 
                    <div>
                    <textarea disabled={this.state.disableInput} className="prinAlamat" name="disAddress" rows="4" cols="54" placeholder="alamat" onChange={this.setValue}></textarea>
                    </div> 
                    <div>
                    <InputPrin disabled={this.state.disableInput} type="text" className="prinForm" name="disCity" onChange={this.setValue} placeholder="Distributor City" ></InputPrin>
                    </div> 
                    <div>
                    <InputPrin disabled={this.state.disableInput} type="text" className="prinForm" name="disOwner" onChange={this.setValue} placeholder="Distributor Owner" ></InputPrin>
                    </div> 
                    <div>
                    <InputPrin disabled={this.state.disableInput} type="text" className="prinForm" name="disEmail" onChange={this.setValue} placeholder="Distributor Email" ></InputPrin>
                    </div> 
                    <div>
                    <InputPrin disabled={this.state.disableInput} type="text" className="prinForm" name="disPhone" onChange={this.setValue} placeholder="Distributor Phone" ></InputPrin>
                    </div> 
                    <hr style={{backgroundColor:"blue" ,width:"99%" ,height:"1px"}}/>
                    <div>
                    <InputPrin disabled={this.state.disableInput} type="text" className="prinForm" name="discreatedAt" onChange={this.setValue} placeholder="Distributor Created At" ></InputPrin>
                    </div> 
                    <div>
                    <InputPrin disabled={true} type="text" value={this.props.dataLoginUser.username} className="prinForm" name="discreatedBy" onChange={this.setValue} placeholder="Distributor Created By" ></InputPrin>
                    </div>
                    <div>
                    <InputPrin disabled={this.state.disableInput} type="text" className="prinForm" name="disupdatedAt" onChange={this.setValue} placeholder="Distributor Updated At" ></InputPrin>
                    </div>
                    <div>
                    <InputPrin disabled={true} type="text" value={this.props.dataLoginUser.username} className="prinForm" name="disupdatedBy" onChange={this.setValue} placeholder="Distributor Updated by" ></InputPrin>
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