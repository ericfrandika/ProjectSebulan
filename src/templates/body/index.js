import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

import Navbar from '../sidebar/Navbar';
class Body extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        if(this.props.checkLogin === false  || this.props.dataLoginUser.username ==="" || this.props.dataToken ===""){
            return(
                <Redirect to ="/"></Redirect>
            )
        }
        return ( 
        <>
            <Navbar {...this.props}/>
            {this.props.comp}
        </> );
    }
}
const mapStateToProps = state => ({ // NGAMBIL DATA
    checkLogin: state.authReducer.isLogin,
    dataToken : state.authReducer.token,
    dataLoginUser: state.authReducer.userLogin,

})
export default connect(mapStateToProps) (Body);