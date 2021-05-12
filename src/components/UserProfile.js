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
import {
 
  Redirect
} from "react-router-dom";

export default class UserProfile extends Component {
    constructor(props)
    {
        super(props)
        this.state = {
           "full_name" : "",
           "phone" : "",
           "address" : "",
           "email" : "",
           "new_full_name" : "",
           "new_phone" : "",
           "new_address" : "",
           "new_email" : "",
           "old_password" : "",
           "new_password" : "",
           "confirmed_password" : "",
           "changePassword" : false,
           "changeProfile" : false
           
        }
    }
    componentDidMount() {    
    axios.get("http://d8842e38a456.ngrok.io/api/v1/customers/" + localStorage.user, {
      headers: {
        Authorization: "Bearer " + localStorage.access_token 
      }
    })
        .then(res => { 
         
           this.setState({
               full_name : res.data.full_name,
               phone : res.data.phone,
               email : res.data.email,
               address : res.data.address,
               new_full_name : res.data.full_name,
               new_phone : res.data.phone,
               new_email : res.data.email,
               new_address : res.data.address
           })
        
        })
       
        .catch(error => {
          console.log('error', error.res)
          alert("fail")
        }); 
    }
    
    changePassword = () => {
    
    axios.post("http://d8842e38a456.ngrok.io/api/v1/users/change-password",{"old_password": this.state.old_password,"new_password": this.state.new_password,"confirmed_new_password": this.state.confirmed_password}, {
      headers: {
        Authorization: "Bearer " + localStorage.access_token 
      }
    })
        .then(res => { 
         
        })
       
        .catch(error => {
          console.log('error', error)
          alert("fail")
        }); 
    }

    changeProfile = () => {
    
      axios.patch("http://d8842e38a456.ngrok.io/api/v1/customers/" + localStorage.user, {"full_name" : this.state.new_full_name, "email" : this.state.new_email, "phone" : this.state.new_phone, "address" : this.state.new_address}, {
        headers: {
          Authorization: "Bearer " + localStorage.access_token 
        }
      })
          .then(res => { 
            window.location.reload();
          })
         
          .catch(error => {
            console.log('error', error.response.message)
            alert("fail")
          }); 
    }
    setParams = (event) => {
      this.setState({[event.target.name] : event.target.value})
    }
    changePasswordForm = () => {
     
        if(this.state.changePassword){
        return (
        <div >
          <div className="row">
              <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                <div className="card card-signin my-5">
                  <div className="card-body">
                    <h5 className="card-title text-center">Change Password</h5>
                    <form className="form-signin">
                      <div className="form-label-group">
                        <input type="password" id="inputCurrentPassword" className="form-control" name="old_password" placeholder="currentpassword" required autofocus onChange={this.setParams}/>
                        <label htmlFor="inputCurrentPassword">Current Password</label>
                      </div>
                      <div className="form-label-group">
                        <input type="password" id="inputPassword" className="form-control" name="new_password" placeholder="newpassword" required onChange={this.setParams}/>
                        <label htmlFor="inputPassword">New Password</label>
                      </div>
                      <div className="form-label-group">
                        <input type="password" id="inputConfirm" className="form-control" name="confirmed_password" placeholder="confirmpassword" required onChange={this.setParams}/>
                        <label htmlFor="inputConfirm">Confirm Password</label>
                      </div>
                      <button className="btn btn-lg btn-primary btn-block text-uppercase" type="button" onClick={this.changePassword}>Submit</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
        </div>
      )}
    }
    changeProfileForm = () => {
     
      if(this.state.changeProfile){
      return (
      <div >
        <div className="row">
            <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
              <div className="card card-signin my-5">
                <div className="card-body">
                  <h5 className="card-title text-center">Change Profile</h5>
                  <form className="form-signin">
                    <div className="form-label-group">
                      <input type="text" id="inputFullName" className="form-control" name="new_full_name" placeholder="full_name" autoFocus required  onChange={this.setParams} defaultValue={this.state.full_name}/>
                      <label htmlFor="inputFullName">Full name</label>
                    </div>
                    <div className="form-label-group">
                      <input type="text" id="inputPhone" className="form-control" name="new_phone" placeholder="phone" required onChange={this.setParams} defaultValue={this.state.phone}/>
                      <label htmlFor="inputPhone">Phone</label>
                    </div>
                    <div className="form-label-group">
                      <input type="text" id="inputAddress" className="form-control" name="new_address" placeholder="address" required onChange={this.setParams} defaultValue={this.state.address}/>
                      <label htmlFor="inputAddress">Address</label>
                    </div>
                    <div className="form-label-group">
                      <input type="text" id="inputEmail" className="form-control" name="new_email" placeholder="email" required onChange={this.setParams} defaultValue={this.state.email}/>
                      <label htmlFor="inputEmail">Email</label>
                    </div>
                    <button className="btn btn-lg btn-primary btn-block text-uppercase" type="button" onClick={this.changeProfile}>Submit</button>

                  </form>
                </div>
              </div>
            </div>
          </div>
      </div>
    )}
  }

    isChangePassword = () => {
      if(this.state.changeProfile)
      {
        this.setState({
          changePassword : !this.state.changePassword,
          changeProfile : !this.state.changeProfile
        })
      } else {
        this.setState({
         
          changePassword : !this.state.changePassword
        })
      }
    }
    isChangeProfile = () => {
      if(this.state.changePassword)
      {
        this.setState({
          changePassword : !this.state.changePassword,
          changeProfile : !this.state.changeProfile
        })
      } else {
        this.setState({
         
          changeProfile : !this.state.changeProfile
        })
      }
    }
    render() {
        return (
          <div className="container">
            <div className="row">
              <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                <div className="card card-signin my-5">
                  <div className="card-body">
                    <div>{this.state.full_name}</div>
                    <div>{this.state.email}</div>
                    <div>{this.state.address}</div>
                    <div>{this.state.phone}</div>
                  </div>
                <button className="btn btn-lg btn-primary btn-block text-uppercase" onClick={this.isChangePassword}>Change Password</button>
                <button className="btn btn-lg btn-primary btn-block text-uppercase" onClick={this.isChangeProfile}>Change Profile</button>
                </div>
              </div>
            </div>
            { this.changePasswordForm()}
            {this.changeProfileForm()}
          </div>
        );
    }
}

