import React, { Component } from 'react';
class LabelPrin extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <>
            <label value={this.props.value} 
            onChange={this.props.onChange} 
            style={this.props.style}
             className={this.props.className}>{this.props.children} </label>
            </>
         );
    }
}
 
export default LabelPrin;