import React, { Component } from 'react';

class Kotak  extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (
       
         <div  className={this.props.className} style={this.props.style} disabled={this.props.disabled} onClick={this.props.onClick}>{this.props.children}</div>
        
         );
    }
}
 
export default Kotak ;