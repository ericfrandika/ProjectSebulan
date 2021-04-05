import Body from './templates/body/index'
import LoginR from './page/loginR/loginR'
import { BrowserRouter as Router, Switch,Route } from "react-router-dom"
import BackUpData from './page/database/backupData'
import Navbar from './templates/sidebar/Navbar'
import Home from './page/home/home'
import Principal from './page/principal/principal'
import Distributor from './page/distributor/distributor'
import Customer from './page/customer/customer'
import React, { Component } from 'react';
import { connect } from 'react-redux';
import ContohBudi from './page/contohbudi/contoh'
import FileNotFound from './page/notfound/notfound'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { statusLogin:true  }
  }

  tampilPage = () => {

  }

  render() { 
  console.log("ini react : ",this.props.dataLoginUser.username)
    if (this.props.checkLogin === false){
      return(
      <Router>
         <Switch>  
        <Route path="/" exact component={LoginR}/>
        <LoginR></LoginR>
        </Switch>
        </Router>)
    }
    else{
      return(<div> 
              <Router>
                <Switch>  
                    <Route path="/" exact component={(props) => <Body {...props} comp={<Home/>} />}/>
                    <Route path="/principal" exact component={(props) => <Body {...props} comp={<Principal/>} />}/>
                    <Route path="/distributor" component={(props) => <Body {...props} comp={<Distributor/>} />}/>
                    <Route path="/customer" component={(props) => <Body {...props} comp={<Customer/>} />}/>
                    <Route path="/backdata" component={(props) => <Body {...props} comp={<BackUpData/>} />}/>
                    <Route component={(props) => <FileNotFound {...props} />}/>
                </Switch> 
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