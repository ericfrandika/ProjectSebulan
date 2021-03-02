import React, { Component } from 'react';
import './style.css'
import InputPrin from '../../components/comp_principal/inputPrin'
import LabelPrin from '../../components/comp_principal/labelPrin'
class Principal extends Component {
    constructor(props) {
        super(props);
        this.state = { 
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
        this.setState({
            butCondi: true,
            disableButEdit : false ,
            disableInput :true,
            butCondDelete: true,
            act:0,
            actDelete:1
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
        return ( 
            <>
             <div className="prinAtas">
                <InputPrin className="SeacrhPrin" name="searchPrin" onChange={this.setValue} placeholder="Search"></InputPrin>
                <button className="crudPrin" onClick={this.buttonAdd} disabled={this.state.butCondAdd}>{this.state.butCondi? "ADD" : "SAVE"}</button>
                <button className="crudPrin" onClick={this.buttonEdit} disabled={this.state.disableButEdit} >{this.state.butCondEdit? "EDIT" : "UPDATE"}</button>
                <button className="crudPrin" onClick={this.buttonCancel} >{this.state.butCondDelete? "DELETE" : "CANCEL"}</button>
                </div>
            <div className="bodyPrin">
                
                <div className="prinKiri">
                    {/* ini nanti di for */}
                    <div className="prinisiTable">
                    <div className ="prinTable">
                    <i class="fas fa-band-aid" style={{color:"white",display:'inline-block', width:"70px" ,fontSize:"65px"}}></i>
                    </div>
                    <div className="prinlabelTabel">
                    <LabelPrin className="prinlabelName">Kong Guan</LabelPrin>
                    <br/>
                    <LabelPrin className="prinLabelid">Kong Id</LabelPrin>
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
                    <InputPrin type="text" disabled={this.state.disableInput} className="prinForm" name="prinId"  onChange={this.setValue} placeholder="Principal ID" ></InputPrin>
                    </div>
                    <div>
                    <InputPrin  type="text" disabled={this.state.disableInput} className="prinForm" name="prinName" onChange={this.setValue} placeholder="Principal Name" ></InputPrin>
                    </div> 
                    <div>
                    <textarea className="prinAlamat" disabled={this.state.disableInput} name="prinAddress" rows="4" cols="54" placeholder="alamat" onChange={this.setValue}></textarea>
                    </div> 
                    <div>
                    <InputPrin  type="text" disabled={this.state.disableInput} className="prinForm" name="prinCity" onChange={this.setValue} placeholder="Principal City" ></InputPrin>
                    </div> 
                    <div>
                    <InputPrin  type="text" disabled={this.state.disableInput} className="prinForm" name="prinPhone" onChange={this.setValue} placeholder="Principal Phone" ></InputPrin>
                    </div> 
                    <div>
                    <InputPrin  type="text" disabled={this.state.disableInput} className="prinForm" name="prinFax" onChange={this.setValue} placeholder="Principal Fax" ></InputPrin>
                    </div> 
                    <div>
                    <InputPrin  type="text" disabled={this.state.disableInput} className="prinForm" name="prinCountry" onChange={this.setValue} placeholder="Principal Country" ></InputPrin>
                    </div> 
                    <div>
                    <InputPrin  type="text" disabled={this.state.disableInput} className="prinForm" name="prinConPhone" onChange={this.setValue} placeholder="Principal Contact Phone" ></InputPrin>
                    </div> 
                    <div>
                    <InputPrin  type="text" disabled={this.state.disableInput} className="prinForm" name="prinLicensed" onChange={this.setValue} placeholder="Principal Licensed Expired" ></InputPrin>
                    </div> 
                    <hr style={{backgroundColor:"blue" ,width:"99%" ,height:"1px"}}/>
                    <div>
                    <InputPrin  type="text" disabled={true} className="prinForm" name="princreatedAt" onChange={this.setValue} placeholder="Principal Created At" ></InputPrin>
                    </div> 
                    <div>
                    <InputPrin  type="text" disabled={true} className="prinForm" name= "princreatedBy" onChange={this.setValue} placeholder="Principal Created By" ></InputPrin>
                    </div>
                    <div>
                    <InputPrin  type="text" disabled={true} className="prinForm" name="prinupdatedAt" onChange={this.setValue} placeholder="Principal Updated At" ></InputPrin>
                    </div>
                    <div>
                    <InputPrin  type="text" disabled={true} className="prinForm" name="prinupdatedBy" onChange={this.setValue} placeholder="Principal Updated by" ></InputPrin>
                    </div>

                </div>
                </div>
            </div>
            </>
         );
    }
}
 
export default Principal;