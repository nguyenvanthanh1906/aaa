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
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      
      var raw = JSON.stringify({
        "username": this.state.username,
        "password": this.state.password
      });

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      fetch("https://8676cf173aad.ngrok.io/api/v1/auth/sign-in", requestOptions)
        .then(response => {
          console.log(response)
          if (response.ok) {
            return response.json()
          }
          throw Error(response.status)
        })
        .then(result => {
          var str = result.expires_in
          var time = ''
          var time_type = ''
          for (var i = 0; i < str.length; i++) {
           
            
            if (str.charAt(i) >= '0' && str.charAt(i) <= '9') {
              time += str.charAt(i);
          } else {
            time_type += str.charAt(i);
          }

          }
          document.cookie = ("access_token = " +result.access_token+"; expires = "+new Date(Date.now()+moment.duration(time, time_type))+"; path=/");
          const history = createHashHistory();

          history.go("/home");
        
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
              <h5 className="card-title text-center">Sign In</h5>
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
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
        );
    }
}

