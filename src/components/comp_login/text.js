import React, { Component } from 'react';
class TextLog extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <>
            <input className={this.props.className} 
            value={this.props.value} 
            type={this.props.type}
            placeholder={this.props.placeholder}
            name={this.props.name}
            onChange={this.props.onChange}
             />
            </>
         );
    }
}
 
export default TextLog;