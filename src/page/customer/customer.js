import React, { Component } from 'react';
import InputPrin from '../../components/comp_principal/inputPrin'
import LabelPrin from '../../components/comp_principal/labelPrin'
import './style.css'
class Customer extends Component {
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
                    <div className="CustomerTabel">
                        <div className="CustomerTabelkiri" style={{marginLeft:"10%"}}>
                    <LabelPrin className="prinlabelName">Kong Guan</LabelPrin>
                    <br/>
                    <LabelPrin className="prinLabelid">Userid.</LabelPrin>
                    <LabelPrin className="prinLabelid">Principal</LabelPrin>
                    <br/>
                    <LabelPrin className="prinLabelDis">Principal</LabelPrin>
                    </div>
                    <div className="CustomerTabelKanan">
                        <LabelPrin className="prinIndex">1</LabelPrin>
                        <br/>  
                        <LabelPrin className="prinTgl" style={{color:"#4CC417"}}>2020-03-11</LabelPrin>
                        <br/>
                        <LabelPrin className="prinPremium">Premium</LabelPrin>
                        <br/>
                    </div>
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
                    <InputPrin type="text" disabled={this.state.disableInput} className="prinForm" name="cusId" onChange={this.setValue} placeholder="Customer ID" ></InputPrin>
                    </div>
                    <div>
                    <InputPrin  type="text" disabled={this.state.disableInput} className="prinForm" name="cusName" onChange={this.setValue} placeholder="Customer Name" ></InputPrin>
                    </div> 
                    <div>
                    <InputPrin  type="text" disabled={this.state.disableInput} className="prinForm" name="cusPass" onChange={this.setValue} placeholder="Customer Password" ></InputPrin>
                    </div> 
                    <div>
                    <textarea className="prinAlamat" disabled={this.state.disableInput} name="cusAlamat" rows="4" cols="54" placeholder="Alamat"  onChange={this.setValue}></textarea>
                    </div> 
                    <div>
                    <InputPrin  type="text" disabled={this.state.disableInput} className="prinForm" name="cusPhone" onChange={this.setValue} placeholder="Customer Phone" ></InputPrin>
                    </div> 
                    <hr style={{backgroundColor:"blue" ,width:"99%" ,height:"1px" ,marginBottom:"0"}}/>
                    <div>
                    {/* -------------------------------------- nanti di for ini---------------------------------- */}
                    <select className="prinForm" disabled={this.state.disableInput}  name="prinName" style={{height:"33px"}} onChange={this.setValue}>
                        <option>Principal name</option> 
                    </select>
                    </div>
                    <div>
                    {/* -------------------------------------- nanti di for ini---------------------------------- */}
                    <select className="prinForm" disabled={this.state.disableInput} name="disName" style={{height:"33px"}} onChange={this.setValue}>
                        <option>Distributor name</option> 
                    </select>
                    </div>
                    <hr style={{backgroundColor:"blue" ,width:"99%" ,height:"1px",marginBottom:"0"}}/>
                    <div>
                    {/* -------------------------------------- nanti di for ini---------------------------------- */}
                    <select className="prinForm" disabled={this.state.disableInput} name="cusOnOff" style={{height:"33px" ,width:"100px"}} onChange={this.setValue}>
                        <option>True</option>
                        <option>False</option> 
                    </select>
                    </div>
                    <div>
                    <InputPrin  type="text" disabled={this.state.disableInput} disabled={this.state.disableInput} className="prinForm" name="cusRegis" onChange={this.setValue} placeholder="Customer Regis Date" ></InputPrin>
                    </div> 
                    <div>
                    <InputPrin  type="text" disabled={this.state.disableInput} className="prinForm" name="cusValid" onChange={this.setValue} placeholder="Customer Product Thru" ></InputPrin>
                    </div> 
                    <hr style={{backgroundColor:"blue" ,width:"99%" ,height:"1px", marginBottom:"0"}}/>

                    <div>
                    <InputPrin  type="text" disabled={true} className="prinForm" name="cuscreatedAt" onChange={this.setValue} placeholder="Customer Created At" ></InputPrin>
                    </div> 
                    <div>
                    <InputPrin  type="text" disabled={true} className="prinForm" name="cuscreatedby" onChange={this.setValue} placeholder="Customer Created By" ></InputPrin>
                    </div>
                    <div>
                    <InputPrin  type="text" disabled={true} className="prinForm" name="cusupdatedAt" onChange={this.setValue} placeholder="Customer Updated At" ></InputPrin>
                    </div>
                    <div>
                    <InputPrin  type="text" disabled={true} className="prinForm" name="cusupdatedBy" onChange={this.setValue} placeholder="Customer Updated by" ></InputPrin>
                    </div>

                </div>
                </div>
            </div>
            </>
        );
    }
}
 
export default Customer;