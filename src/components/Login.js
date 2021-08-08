import React, { Component } from 'react';
import './styleLogin.css';
import moment from 'moment';
import timezone from 'moment-timezone'
import Cookies from 'universal-cookie';
import { useHistory } from 'react-router';
import { createBrowserHistory as createHistory } from "history"
import { createHashHistory } from "history";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import history from './history';
import axios from 'axios';
import instance from './instance';
import {createPusher, getPusher} from '../pusher';
import {
 
  Redirect
} from "react-router-dom";
export default class Login extends Component {
  constructor(props)
    {
        super(props)
        this.state = {
           "username" : "",
           "password" : ""
           
        }
    }

    setParams = (event) => {
      this.setState({[event.target.name] : event.target.value})
    }

    login = () => {
      instance.post("api/v1/auth/sign-in", {"username": this.state.username,"password": this.state.password})
        .then(res => { 
          if (res.status == 200) {
            var str = res.data.expires_in
            var time = ''
            var time_type = ''


            for (var i = 0; i < str.length; i++) {
              if (str.charAt(i) >= '0' && str.charAt(i) <= '9') {
                time += str.charAt(i);
            } else {
              time_type += str.charAt(i);
            }
  
            }
            localStorage.access_token = res.data.access_token;
            localStorage.user = this.state.username;
            localStorage.role = res.data.role;
            localStorage.expires_at = (Date.now() + moment.duration(time, time_type));
            localStorage.expires_type = time_type;

            instance.defaults.headers.common['Authorization'] = "Bearer " + res.data.access_token

            createPusher()

            console.log(getPusher());

            const history = createHashHistory();
            history.push("/");
          } else {
            throw Error(res.status)
          }
        })
       
        .catch(error => {
          console.log('error', error)
          alert("fail")
        });
    }
    render() {
        return (
            
      <div className="container">
      <div className="row">
        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div className="card card-signin my-5">
            <div className="card-body">
              <h5 className="card-title text-center">Login</h5>
              <form className="form-signin">
                <div className="form-label-group">
                  <input type="text" id="inputUser" className="form-control" name="username" placeholder="username" required autofocus onChange={this.setParams}/>
                  <label htmlFor="inputUser">User name</label>
                </div>
                <div className="form-label-group">
                  <input type="password" id="inputPassword" className="form-control" name="password" placeholder="password" required onChange={this.setParams}/>
                  <label htmlFor="inputPassword">Password</label>
                </div>
                <div className="custom-control custom-checkbox mb-3">
                  <input type="checkbox" className="custom-control-input" id="customCheck1" />
                  <label className="custom-control-label" htmlFor="customCheck1">Remember password</label>
                </div>
                <button className="btn btn-lg btn-primary btn-block text-uppercase" type="button" onClick={this.login}>Sign in</button>
                <Link to="/register" className="btn btn-lg btn-primary btn-block text-uppercase">Register</Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
        );
    }
}

