import React, { Component } from 'react';
import InputPrin from '../../components/comp_principal/inputPrin'
import LabelPrin from '../../components/comp_principal/labelPrin'
import './style.css'
class Customer extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (  
            <>
              <div className="bodyPrin">
                <div className="prinAtas">
                <InputPrin className="SeacrhPrin" name="searchPrin" onChange={this.setValue} placeholder="Search"></InputPrin>
                <LabelPrin className="crudPrin">ADD</LabelPrin>
                <LabelPrin className="crudPrin">EDIT</LabelPrin>
                <LabelPrin className="crudPrin">DELETE</LabelPrin>
                </div>
                
                <div className="prinKiri">
                    {/* ini nanti di for */}
                    <div className="prinisiTable">
                    <div className ="prinTable">
                    <i class="fas fa-band-aid" style={{color:"white",display:'inline-block', width:"70px" ,fontSize:"65px"}}></i>
                    </div>
                    <div className="CustomerTabel">
                        <div className="CustomerTabelkiri">
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

                    <LabelPrin className="labelprin">Created At</LabelPrin>
               
                    <LabelPrin className="labelprin">Created By</LabelPrin>
                  
                    <LabelPrin className="labelprin">Updated At</LabelPrin>
                    
                    <LabelPrin className="labelprin">Updated By</LabelPrin>
                   
                </div>
                <div className="prinKananInput">
                    <div>
                    <InputPrin type="text" className="prinForm" name="cusId" onChange={this.setValue} placeholder="Customer ID" ></InputPrin>
                    </div>
                    <div>
                    <InputPrin  type="text" className="prinForm" name="cusName" onChange={this.setValue} placeholder="Customer Name" ></InputPrin>
                    </div> 
                    <div>
                    <InputPrin  type="text" className="prinForm" name="cusPass" onChange={this.setValue} placeholder="Customer Password" ></InputPrin>
                    </div> 
                    <div>
                    <textarea className="prinAlamat" name="cusAlamat" rows="4" cols="54" placeholder="Alamat" onChange={this.setValue}></textarea>
                    </div> 
                    <div>
                    <InputPrin  type="text" className="prinForm" name="cusPhone" onChange={this.setValue} placeholder="Customer Phone" ></InputPrin>
                    </div> 
                    <hr style={{backgroundColor:"blue" ,width:"99%" ,height:"1px"}}/>
                    <div>
                    {/* -------------------------------------- nanti di for ini---------------------------------- */}
                    <select className="prinForm" id="StudentGender" name="prinName" style={{height:"33px"}} onChange={this.setValue}>
                        <option>Principal name</option> 
                    </select>
                    </div>
                    <div>
                    {/* -------------------------------------- nanti di for ini---------------------------------- */}
                    <select className="prinForm" id="StudentGender" name="disName" style={{height:"33px"}} onChange={this.setValue}>
                        <option>Distributor name</option> 
                    </select>
                    </div>
                    <hr style={{backgroundColor:"blue" ,width:"99%" ,height:"1px"}}/>
                    <div>
                    <InputPrin  type="text" className="prinForm" name="cuscreatedAt" onChange={this.setValue} placeholder="Customer Created At" ></InputPrin>
                    </div> 
                    <div>
                    <InputPrin  type="text" className="prinForm" name="cuscreatedby" onChange={this.setValue} placeholder="Customer Created By" ></InputPrin>
                    </div>
                    <div>
                    <InputPrin  type="text" className="prinForm" name="cusupdatedAt" onChange={this.setValue} placeholder="Customer Updated At" ></InputPrin>
                    </div>
                    <div>
                    <InputPrin  type="text" className="prinForm" name="cusupdatedBy" onChange={this.setValue} placeholder="Customer Updated by" ></InputPrin>
                    </div>

                </div>
                </div>
            </div>
            </>
        );
    }
}
 
export default Customer;