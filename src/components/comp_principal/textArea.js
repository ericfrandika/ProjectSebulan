import React, { Component } from 'react';
class InputArea extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (
        <>
     <textarea style={this.props.style} className={this.props.className} value={this.props.value} disabled={this.props.disabled} name={this.props.name} rows={this.props.rows} cols={this.props.cols} placeholder={this.props.placeholder} onChange={this.props.onChange}></textarea>

        </> );
    }
}
 
export default InputArea;