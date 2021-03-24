import React, { Component } from 'react';
class Pilih extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <select disabled={this.props.disabled} className={this.props.className} value={this.props.value} name={this.props.name} style={this.props.style}  onChange={this.props.onChange}>{this.props.children}</select>
         );
    }
}
 
export default Pilih;