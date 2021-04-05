import React, { Component } from 'react';

import Navbar from '../sidebar/Navbar';
class Body extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        console.log("ini props aneh : " , this.props);
        return ( 
        <>
            <Navbar {...this.props}/>
            {this.props.comp}
        </> );
    }
}
 
export default Body;