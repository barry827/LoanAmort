import React, { Component } from "react";
class ErrorPanel extends Component{
    
    render(){
        return (
                <div>{this.props.errorMessage}</div>
        );
    }
}

export default ErrorPanel;