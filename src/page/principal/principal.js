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
                <InputPrin className="SeacrhPrin" name="search" onChange={this.setValue} placeholder="Search"></InputPrin>
                <LabelPrin className="crudPrin">ADD</LabelPrin>
                <LabelPrin className="crudPrin">EDIT</LabelPrin>
                <LabelPrin className="crudPrin">DELETE</LabelPrin>
                </div>
                <div className="prinKiri">
                </div>
                <div className="prinKanan">
                <div className="prinKiriLabel">
                    <LabelPrin className="labelprin">Principal ID</LabelPrin>
                    <hr/>
                    <LabelPrin className="labelprin">Principal Name</LabelPrin>
                    <hr/>
                    <LabelPrin className="labelprin">Address</LabelPrin>
                    <hr/>
                    <LabelPrin className="labelprin">----</LabelPrin>
                    <hr/>
                    <LabelPrin className="labelprin">City</LabelPrin>
                    <hr/>
                    <LabelPrin className="labelprin">Phone</LabelPrin>
                    <hr/>
                    <LabelPrin className="labelprin">Fax</LabelPrin>
                    <hr/>
                    <LabelPrin className="labelprin">Country</LabelPrin>
                    <hr/>
                    <LabelPrin className="labelprin">Contact Phone</LabelPrin>
                    <hr/>
                    <LabelPrin className="labelprin">Licensed Expired</LabelPrin>
                    <hr/>
                    <hr style={{backgroundColor:"blue" , height:"1px"}}/>
                    <LabelPrin className="labelprin">Created At</LabelPrin>
                    <hr/>
                    <LabelPrin className="labelprin">Created By</LabelPrin>
                    <hr/>
                    <LabelPrin className="labelprin">Updated By</LabelPrin>
                    <hr/>
                    <LabelPrin className="labelprin">Updated At</LabelPrin>
                    <hr/>
                </div>
                <div className="prinKananInput">
                    <div>
                    <InputPrin type="text" className="prinForm" name="prinId" onChange={this.setValue}  ></InputPrin>
                    </div>
                    <div>
                    <InputPrin type="text" className="prinForm" name="prinName" onChange={this.setValue} ></InputPrin>
                    </div>
     

                </div>
                </div>
                

            </div>
            </>
         );
    }
}
 
export default Principal;