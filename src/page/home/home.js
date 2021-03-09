import React, { Component } from 'react';
import { connect } from 'react-redux';

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
                    <label><b>LOGOUT</b></label>
                </div>
                </div>
            </div>
                <div className="containerHome">
                    <div className="atas">
                        <div>
                    <Link to ="/principal">        
                    <i className="fas fa-tags " style={{color:"white",display:'inline-block', width:"250px" ,marginLeft:"15px",fontSize:"100px"}}></i>
                    </Link>
                    <Link to ="/distributor">
                    <i className="fas fa-truck" style={{color:"white",display:'inline-block', width:"250px" ,marginLeft:"15px",fontSize:"100px"}}></i>
                    </Link>
                        </div>
                        <div>
                            <label className="principal" style={{color:"white",display:'inline-block', width:"250px" ,marginLeft:"15px",fontSize:"20px"}} >PRINCIPAL</label>
                            <label className="distrubutor"style={{color:"white",display:'inline-block', width:"250px" ,marginLeft:"15px",fontSize:"20px"}}>DISTRIBUTOR</label>
                        </div>
                    </div>
                    <div className="bawah" >
                        <div>
                            <Link to ="/customer">
                    <i className="fas fa-users"style={{color:"white",display:'inline-block', width:"250px" ,marginLeft:"15px",fontSize:"100px"}}></i>
                    </Link>
                    <Link to="/backdata" >
                    <i class="fas fa-database"style={{color:"white",display:'inline-block', width:"250px" ,marginLeft:"15px",fontSize:"100px"}}></i>
                    </Link>
                       </div>
                       <div>
                            <label className="principal" style={{color:"white",display:'inline-block', width:"250px" ,marginLeft:"15px",fontSize:"20px"}} >CUSTOMER</label>
                            <label className="distrubutor"style={{color:"white",display:'inline-block', width:"250px" ,marginLeft:"15px",fontSize:"20px"}}>DATABASE</label>
                       </div>
                    </div>

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