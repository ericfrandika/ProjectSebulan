import React, { Component } from 'react';
import './style.css'
class BackUpData extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (  
            <>
            <div className="bodyDatabase">
                <div className="ContinerData">
                <div className="atasData">
                <i className="fas fa-download" style={{color:"white",display:'inline-block', width:"70px" ,fontSize:"65px"}}></i>
                </div>
                <div className="bawahData">
                <label className="principal" style={{color:"white",display:'inline-block', width:"250px" ,fontSize:"20px"}} ><b>DOWNLOAD</b></label>

                </div>
                </div>
            </div>
            </>
        );
    }
}
 
export default BackUpData;