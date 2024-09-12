import React, { Component } from 'react';
import instance from './instance';
import { createHashHistory, createBrowserHistory } from "history";

class Activate extends Component {
    
    componentWillMount() {
        instance.post("api/v1/auth/activate", {
            "activation_token": this.props.activation_token
        })
            .then(res => { 
                const history = createBrowserHistory();
                history.replace("/RegisterSuccess");
                history.go()
            })
           
            .catch(error => {
              
            }); 
    }
    
    render() {
        return (
            <div>
                
            </div>
        );
    }
}

export default Activate;