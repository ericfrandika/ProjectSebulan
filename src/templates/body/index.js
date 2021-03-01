import React, { Component } from 'react';
import { Switch, Route } from "react-router-dom";
import Distributor from '../../page/distributor/distributor'
import Home from '../../page/home/home'
import Principal from '../../page/principal/principal'
import Customer from '../../page/customer/customer'
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



        </Switch>
        
        </> );
    }
}
 
export default Body;