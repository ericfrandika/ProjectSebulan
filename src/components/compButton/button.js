import React, { Component } from 'react';
class Tombol extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (
        <>
        <button className={this.props.className} onClick={this.props.onClick} style={this.props.style} disabled={this.props.disabled} >{this.props.children}</button>
        </>  );
    }
}
 
export default Tombol;