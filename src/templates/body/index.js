import React, { Component } from 'react';
import { Switch, Route } from "react-router-dom";
import Distributor from '../../page/distributor/distributor'
import Home from '../../page/home/home'
import Principal from '../../page/principal/principal'
import Customer from '../../page/customer/customer'
import Login from '../../page/login/login'
import BackUpData from '../../page/database/backupData'
import Navbar from '../sidebar/Navbar';
import login from '../../page/login/login';
class Body extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
        <>
        <Switch>  
        <Route path="/" exact component={Home}/>
            <Route path="/principal" exact component={Principal}/>
            <Route path="/distributor" exact component={Distributor}/>
            <Route path="/customer" exact component={Customer}/>
            <Route path="/backdata" exact component={BackUpData}/>
          
        </Switch>
        
        </> );
    }
}
 
export default Body;