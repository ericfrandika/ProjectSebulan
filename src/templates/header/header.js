import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style.css'
class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <>
            <div className ="header" style={{display:'flex' , flexDirection:'row'}}>
            <div className="backHome"style={{fontSize:"50px"}}>
            <Link to = "/home">
            <i className="fas fa-home"></i>
            </Link>
            </div>
            <div className="thisHeader">
                <div className="bungkusWelcome">
                <div>
                <label className="welcome"><b>WELCOME</b></label>
                </div>
                <div>
                <label className="admin">(Admin 1)</label>
                </div>
                </div>
                <div className="thisLogout">
                <div>
                <i className="fas fa-sign-out-alt" onClick={()=>{}} style={{color:"#cd0000",display:'inline-block', width:"70px" ,marginLeft:"15px",fontSize:"30px"}}></i>
                </div>
                <div>
                    <label><b>LOGOUT</b></label>
                </div>
                </div>
            </div>
            </div>
            </>
         );
    }
}
 
export default Header;