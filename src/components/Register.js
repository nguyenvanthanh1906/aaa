import React, { Component } from 'react';
import axios from 'axios';
import { createHashHistory, createBrowserHistory } from "history";
import instance from './instance';

export default class Register extends Component {
    constructor(props)
    {
        super(props)
        this.state = {
           "username" : "",
           "password" : "",
           "confirm" : ""
        }
    }
    setParams = (event) => {
        this.setState({[event.target.name] : event.target.value})
    }
    buttonRegister = () => {
        if(this.state.username != "" && this.state.password != "" && this.state.password == this.state.confirm) {
        return (
            <div>
              <button className="btn btn-lg btn-primary btn-block text-uppercase"    type="button" onClick={this.register}>Register</button>
            </div>
        );
        } else {
            return (
                <div>
                  <button className="btn btn-lg btn-primary btn-block text-uppercase"  style={{ pointerEvents: 'none', cursor:'default', backgroundColor:'#57bba7'}}  type="button" onClick={this.register}>Register</button>
                </div>
            );
        }
    }
    register = () => {
        instance.post("api/v1/auth/sign-up", {"username": this.state.username,"password": this.state.password})
          .then(res => { 
            if (res.status == 200) {
            
              const history = createBrowserHistory();
    
              history.replace("/login");
              history.go()
              
            } else {
                console.log(res.data.message)
                throw res
            }
          })
         
          .catch(error => {
            console.log(error.response.data.message[0])
            
          });
      }
    render() {
        return (
            <div className="container">
            <div className="row">
              <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                <div className="card card-signin my-5">
                  <div className="card-body">
                    <h5 className="card-title text-center">Register</h5>
                    <form className="form-signin">
                      <div className="form-label-group">
                        <input type="text" id="inputUser" className="form-control" name="username" placeholder="username" required autofocus onChange={this.setParams}/>
                        <label htmlFor="inputUser">User name</label>
                      </div>
                      <div className="form-label-group">
                        <input type="password" id="inputPassword" className="form-control" name="password" placeholder="password" required onChange={this.setParams}/>
                        <label htmlFor="inputPassword">Password</label>
                      </div>
                      <div className="form-label-group">
                        <input type="password" id="inputConfirm" className="form-control" name="confirm" placeholder="confirm" required onChange={this.setParams}/>
                        <label htmlFor="inputConfirm">Confirm</label>
                      </div>
                    <this.buttonRegister></this.buttonRegister>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
    }
}

