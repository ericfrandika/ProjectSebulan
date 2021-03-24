import React, { Component } from 'react';
class Ikon extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (
            <i className={this.props.className} style={this.props.style} onClick={this.props.onClick}></i>
          );
    }
}
 
export default Ikon;