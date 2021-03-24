import React, { Component } from 'react';
class Garis extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <>
            <hr style={this.props.style} className={this.props.className}/>
            </>
         );
    }
}
 
export default Garis;