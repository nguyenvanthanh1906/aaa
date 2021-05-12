import React, { Component } from 'react'
import Cookies from 'universal-cookie';
import { createHashHistory } from "history";
import { Link } from 'react-router-dom';
import axios from 'axios';
export default class Menu extends Component {
  logout = (event) => {
    
    axios.post("http://d8842e38a456.ngrok.io/api/v1/auth/sign-out",{}, {
      headers: {
        Authorization: "Bearer " + localStorage.access_token
      }
    })
        .then(res => { 
          if (res.status == 200) {
           
          } else {
            throw Error(res.status)
          }
        })
       
        .catch(error => {
          console.log('error', error)
          alert("fail")
        }); 

        localStorage.clear();
  }
    render() {
       
        return (
            <div>
                
      <nav className="navbar navbar-expand-lg bg-secondary text-uppercase fixed-top" id="mainNav">
        <div className="container">
          <a className="navbar-brand js-scroll-trigger" href="#page-top">Start Bootstrap</a>
          <button className="navbar-toggler navbar-toggler-right text-uppercase font-weight-bold bg-primary text-white rounded" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
            Menu
            <i className="fas fa-bars" />
          </button>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item mx-0 mx-lg-1"><a className="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger" href="#portfolio">Portfolio</a></li>
              <li className="nav-item mx-0 mx-lg-1"><a className="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger" href="#about">About</a></li>
              <li className="nav-item mx-0 mx-lg-1"><a className="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger" href="#contact">Contact</a></li>
              <li className="nav-item mx-0 mx-lg-1"><Link className="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger" to="/home/profile"  >Profile</Link></li>
              <li className="nav-item mx-0 mx-lg-1"><Link className="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger" to="/login"  onClick={this.logout}>Logout</Link></li>
            </ul>
          </div>
        </div>
      </nav>
            </div>
        )
    }
}
