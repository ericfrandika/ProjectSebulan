import React, { Component } from 'react';
import './style.css'
import InputPrin from '../../components/comp_principal/inputPrin'
import LabelPrin from '../../components/comp_principal/labelPrin'
class Principal extends Component {
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
                    <InputPrin type="text" className="prinForm" name="prinId" onChange={this.setValue} placeholder="Principal ID" ></InputPrin>
                    </div>
                    <div>
                    <InputPrin  type="text" className="prinForm" name="prinName" onChange={this.setValue} placeholder="Principal Name" ></InputPrin>
                    </div> 
                    <div>
                    <textarea className="prinAlamat" name="prinAlamat" rows="4" cols="54" placeholder="alamat" onChange={this.setValue}></textarea>
                    </div> 
                    <div>
                    <InputPrin  type="text" className="prinForm" name="prinCity" onChange={this.setValue} placeholder="Principal City" ></InputPrin>
                    </div> 
                    <div>
                    <InputPrin  type="text" className="prinForm" name="prinPhone" onChange={this.setValue} placeholder="Principal Phone" ></InputPrin>
                    </div> 
                    <div>
                    <InputPrin  type="text" className="prinForm" name="prinFax" onChange={this.setValue} placeholder="Principal Fax" ></InputPrin>
                    </div> 
                    <div>
                    <InputPrin  type="text" className="prinForm" name="prinCountry" onChange={this.setValue} placeholder="Principal Country" ></InputPrin>
                    </div> 
                    <div>
                    <InputPrin  type="text" className="prinForm" name="prinConPhone" onChange={this.setValue} placeholder="Principal Contact Phone" ></InputPrin>
                    </div> 
                    <div>
                    <InputPrin  type="text" className="prinForm" name="prinLicensed" onChange={this.setValue} placeholder="Principal Licensed Expired" ></InputPrin>
                    </div> 
                    <hr style={{backgroundColor:"blue" ,width:"99%" ,height:"1px"}}/>
                    <div>
                    <InputPrin  type="text" className="prinForm" name="princreatedAt" onChange={this.setValue} placeholder="Principal Created At" ></InputPrin>
                    </div> 
                    <div>
                    <InputPrin  type="text" className="prinForm" name="princreatedBy" onChange={this.setValue} placeholder="Principal Created By" ></InputPrin>
                    </div>
                    <div>
                    <InputPrin  type="text" className="prinForm" name="prinupdatedAt" onChange={this.setValue} placeholder="Principal Updated At" ></InputPrin>
                    </div>
                    <div>
                    <InputPrin  type="text" className="prinForm" name="prinupdatedBy" onChange={this.setValue} placeholder="Principal Updated by" ></InputPrin>
                    </div>

                </div>
                </div>
            </div>
            </>
         );
    }
}
 
export default Principal;