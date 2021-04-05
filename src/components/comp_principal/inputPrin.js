import React, { Component } from 'react';
class InputPrin extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( <>
         <input className={this.props.className} 
            value={this.props.value} 
            type={this.props.type}
            placeholder={this.props.placeholder}
            name={this.props.name}
            onChange={this.props.onChange}
            style={this.props.style}
            disabled={this.props.disabled}
            min={this.props.min}
             />
             </>  );
    }
}
 
export default InputPrin;