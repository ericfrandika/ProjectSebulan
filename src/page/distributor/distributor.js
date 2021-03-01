import React, { Component } from 'react';
import InputPrin from '../../components/comp_principal/inputPrin'
import LabelPrin from '../../components/comp_principal/labelPrin'
class Distributor extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (
        <>
         <div className="bodyPrin">
                <div className="prinAtas">
                <InputPrin className="SeacrhPrin" name="searchDis" onChange={this.setValue} placeholder="Search"></InputPrin>
                <button className="crudPrin">ADD</button>
                <button className="crudPrin">EDIT</button>
                <button className="crudPrin">DELETE</button>
                </div>
                
                <div className="prinKiri">
                    {/* ini nanti di for */}
                    <div className="prinisiTable">
                    <div className ="prinTable">
                    <i class="fas fa-band-aid" style={{color:"white",display:'inline-block', width:"70px" ,fontSize:"65px"}}></i>
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
                    <select className="prinForm" id="StudentGender" name="prinName" style={{height:"33px"}} onChange={this.setValue}>
                        <option>Principal name</option> 
                    </select>
                    </div>
                    <div>
                    <InputPrin type="text" className="prinForm" name="disId" onChange={this.setValue} placeholder="Distributor ID" ></InputPrin>
                    </div>
                    <div>
                    <InputPrin  type="text" className="prinForm" name="disName" onChange={this.setValue} placeholder="Distributor Name" ></InputPrin>
                    </div> 
                    <div>
                    <textarea className="prinAlamat" name="disAlamat" rows="4" cols="54" placeholder="alamat" onChange={this.setValue}></textarea>
                    </div> 
                    <div>
                    <InputPrin  type="text" className="prinForm" name="disCity" onChange={this.setValue} placeholder="Distributor City" ></InputPrin>
                    </div> 
                    <div>
                    <InputPrin  type="text" className="prinForm" name="disOwner" onChange={this.setValue} placeholder="Distributor Owner" ></InputPrin>
                    </div> 
                    <div>
                    <InputPrin  type="text" className="prinForm" name="disEmail" onChange={this.setValue} placeholder="Distributor Email" ></InputPrin>
                    </div> 
                    <div>
                    <InputPrin  type="text" className="prinForm" name="disPhone" onChange={this.setValue} placeholder="Distributor Phone" ></InputPrin>
                    </div> 
                    <hr style={{backgroundColor:"blue" ,width:"99%" ,height:"1px"}}/>
                    <div>
                    <InputPrin  type="text" className="prinForm" name="discreatedAt" onChange={this.setValue} placeholder="Distributor Created At" ></InputPrin>
                    </div> 
                    <div>
                    <InputPrin  type="text" className="prinForm" name="discreatedby" onChange={this.setValue} placeholder="Distributor Created By" ></InputPrin>
                    </div>
                    <div>
                    <InputPrin  type="text" className="prinForm" name="disupdatedAt" onChange={this.setValue} placeholder="Distributor Updated At" ></InputPrin>
                    </div>
                    <div>
                    <InputPrin  type="text" className="prinForm" name="disupdatedBy" onChange={this.setValue} placeholder="Distributor Updated by" ></InputPrin>
                    </div>
                </div>
                </div>
                

            </div>
        </>  );
    }
}
 
export default Distributor;