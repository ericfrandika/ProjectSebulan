import Header from './templates/header/header'
import Body from './templates/body/index'
import LoginR from './page/loginR/loginR'
import { BrowserRouter as Router, Switch,Route } from "react-router-dom"
import BackUpData from './page/database/backupData'
import Navbar from './templates/sidebar/Navbar'
import React, { Component } from 'react';
import { connect } from 'react-redux';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = { statusLogin:true  }
  }
  render() { 
  console.log("ini react : ",this.props.dataLoginUser.username)
    if (this.props.checkLogin === false){
      return(<LoginR></LoginR>)
    }
    else{
      return(<div> 
              <Router> 
                    <Navbar/>
                     <Body/>
              </Router>
              </div>)
    }
  }
}
const mapStateToProps = state => ({
  checkLogin: state.authReducer.isLogin,
  dataLoginUser : state.authReducer.userLogin
})
export default connect(mapStateToProps)(App);