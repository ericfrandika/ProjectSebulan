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