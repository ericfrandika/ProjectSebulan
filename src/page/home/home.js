import React, { Component } from 'react';
import { connect } from 'react-redux';  
import {Carousel} from 'react-bootstrap'

import { Link, Redirect } from 'react-router-dom';
import './style.css'
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
            if (this.props.checkLogin === false) {
                <Redirect to="/"/>
            }
        
        return ( 
            <>
                <div className="bodyHome">
                <div className="thisHeader">
                <div className="bungkusWelcome">
                <div>
                <label className="welcome"><b>WELCOME</b></label>
                </div>
                <div>
                <label className="admin"><b>{this.props.dataLoginUser.username}</b></label>
                </div>
                </div>
                <div className="thisLogout">
                <div>
                <i className="fas fa-sign-out-alt" onClick={()=>{this.props.logout()}} style={{color:"#cd0000",display:'inline-block', width:"70px" ,marginLeft:"15px",fontSize:"30px" ,cursor:"pointer"}}></i>
                </div>
                <div>
                    <label style={{color:"white"}}><b>LOGOUT</b></label>
                </div>
                </div>
            </div>
            <div className="welcomeNexchief">
                <h1 className="labelWeclome" >WELCOME TO FORM NEXCHIEF ADMIN</h1>
            </div>
                
            </div> 
            </>
                 );
    }
}
 
const mapStateToProps = state => ({
    checkLogin: state.authReducer.isLogin,
    dataLoginUser : state.authReducer.userLogin

})

const mapDispatchToProps = dispatch => {
    return {
        submitLogin: (data) => dispatch({ type: "LOGIN", payload: data }),
        logout: ()=>dispatch({type:"LOGOUT"})
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (Home);