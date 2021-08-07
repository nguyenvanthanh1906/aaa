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
import { Button, Modal } from 'react-bootstrap';
import instance from './instance';

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
           "changeProfile" : false,
           "success" : false,
           "fail" : false,
        }
    }

  
   
    componentDidMount() {    
      var username = this.props.username
    if (localStorage.role == "customer") {  
    instance.get("api/v1/customers/" + username, {

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
      } else {
        instance.get("api/v1/companies/" + username, {
      
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
    }
    
    changePassword = () => {
    
    instance.post("api/v1/users/change-password",{"old_password": this.state.old_password,"new_password": this.state.new_password,"confirmed_new_password": this.state.confirmed_password}, {
     
    })
        .then(res => { 
         this.setState({
          success : true,
           changePassword : false
         })
        })
       
        .catch(error => {
          console.log('error', error)
          this.setState({
            fail : true,
             
           })
        }); 
    }

    changeProfile = () => {
    if (localStorage.role == "customer") {
      instance.patch("api/v1/customers/" + localStorage.user, {"full_name" : this.state.new_full_name, "email" : this.state.new_email, "phone" : this.state.new_phone, "address" : this.state.new_address}, {
       
      })
          .then(res => { 
           this.setState({
             success : true,
             changeProfile : !this.state.changeProfile
           })
          })
         
          .catch(error => {
            console.log('error', error.response.message)
            this.setState({
              fail : true,
               
             })
          }); 
        } else {
          instance.patch("api/v1/companies/" + localStorage.user, {"full_name" : this.state.new_full_name, "email" : this.state.new_email, "phone" : this.state.new_phone, "address" : this.state.new_address}, {
           
          })
              .then(res => { 
               this.setState({
                 success : true,
                 changeProfile : !this.state.changeProfile
               })
              })
             
              .catch(error => {
                this.setState({
                  fail : true,
                   
                 })
              }); 
        }    
    }
    setParams = (event) => {
      this.setState({[event.target.name] : event.target.value})
    }
    handleClose = () => {
      this.setState({success:false})
      window.location.reload()
      
    }
    handleClose2 = () => {
      this.setState({fail:false})
      window.location.reload()
      
    }
    showPassword = () => {
      var x = document.getElementById("inputCurrentPassword");
      var y = document.getElementById("inputPassword");
      var z = document.getElementById("inputConfirm");

      if (x.type === "password" && y.type === "password" && z.type === "password") {
        x.type = "text";
        y.type = "text";
        z.type = "text";
      } else {
        x.type = "password";
        y.type = "password";
        z.type = "password";
      }
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
                      <input type="checkbox" style={{marginBottom:'15px'}} onClick={this.showPassword}/> Show Password
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
                    <button className="btn btn-lg btn-primary btn-block text-uppercase" type="button" onClick={this.changeProfile} data-toggle="modal" data-target="#myModal">Submit</button>

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
    socialmedia = () => {
      if(localStorage.role == "company") {
        return (
        <div> <div style={{fontWeight : 'bold'}}>Facebook</div>
        <div style={{fontWeight : 'bold'}}>Instagram</div>
        <div style={{fontWeight : 'bold'}}>Twiter</div></div>
       
        )
    }
  }
    render() {
        return (
          <div className="container">
            <div className="row">
              <div className="col-sm-9 col-md-7 col-lg-8 mx-auto">
                <div className="card card-signin my-3">
                  <div className="card-body col-lg-12">
                    <div className="row">
                      <div className="col-md-3">
                        <div style={{fontWeight : 'bold'}}>Full name</div>
                        <div style={{fontWeight : 'bold'}}>Email</div>
                        <div style={{fontWeight : 'bold'}}>Address</div>
                        <div style={{fontWeight : 'bold'}}>Phone</div>         
                      </div>
                      <div className="col-md-9">
                        <div>{this.state.full_name}</div>
                        <div>{this.state.email}</div>
                        <div>{this.state.address}</div>
                        <div>{this.state.phone}</div>
                      </div>
                    </div>
                  </div>
              </div>
              <div className="row">
                    <div className="col-md-6">
                      <button className="btn btn-lg btn-primary btn-block text-uppercase" onClick={this.isChangePassword}>Change Password</button>
                    </div>
                    <div className="col-md-6">
                        <button className="btn btn-lg btn-danger btn-block text-uppercase" onClick={this.isChangeProfile}>Change Profile</button>
                    </div>
                  </div>
                </div>
            </div>
            { this.changePasswordForm()}
            {this.changeProfileForm()}
            <Modal show={this.state.success} >
        <Modal.Header >
          <Modal.Title>Change User's profile successfully</Modal.Title>
        </Modal.Header>
        <Modal.Body><img   src="/assets/svg/success.png" alt="" /></Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" onClick={this.handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={this.state.fail} >
        <Modal.Header >
          <Modal.Title>Fail</Modal.Title>
        </Modal.Header>
        <Modal.Body><img   src="/assets/svg/fail.png" alt="" /></Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" onClick={this.handleClose2}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
          </div>
        );
    }
}

