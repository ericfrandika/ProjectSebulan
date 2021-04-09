import Body from './templates/body/index'
import LoginR from './page/loginR/loginR'
import { BrowserRouter as Router, Switch,Route } from "react-router-dom"
import BackUpData from './page/database/backupData'
import Home from './page/home/home'
import Principal from './page/principal/principal'
import Distributor from './page/distributor/distributor'
import Customer from './page/customer/customer'
import React, { Component } from 'react';
import { connect } from 'react-redux';
import FileNotFound from './page/notfound/notfound'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { statusLogin:true  }
  }

  render() { 
      return(<div> 
              <Router>
                <Switch>  
                    <Route exact path="/" component={(props) => <LoginR {...props} />}/>
                    <Route  path="/login" component={(props) => <LoginR {...props} />}/>
                    <Route path="/home" exact component={(props) => <Body {...props} comp={<Home/>} />}/>
                    <Route path="/principal" exact component={(props) => <Body {...props} comp={<Principal/>} />}/>
                    <Route path="/distributor" exact component={(props) => <Body {...props} comp={<Distributor/>} />}/>
                    <Route path="/customer" exact component={(props) => <Body {...props} comp={<Customer/>} />}/>
                    <Route path="/backdata" exact component={(props) => <Body {...props} comp={<BackUpData/>} />}/>
                    <Route component={(props) => <FileNotFound {...props} />}/>
                </Switch> 
              </Router>
              </div>)
    }
  
}
const mapStateToProps = state => ({
  checkLogin: state.authReducer.isLogin,
  dataLoginUser : state.authReducer.userLogin
})
export default connect(mapStateToProps)(App);