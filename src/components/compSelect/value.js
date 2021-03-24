import React, { Component } from 'react';
class Pilihan extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <option value={this.props.value}>{this.props.children}</option>
         );
    }
}
 
export default Pilihan;