import React, { Component } from 'react'
import Cookies from 'universal-cookie';
import { createHashHistory } from "history";

export default class Menu extends Component {
  logout = (event) => {
    const cookies = new Cookies();
    cookies.remove('access_token')
    const history = createHashHistory();

    history.go("/login");
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
              <li className="nav-item mx-0 mx-lg-1"><a className="btn nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger" onClick={this.logout}>Logout</a></li>
            </ul>
          </div>
        </div>
      </nav>
            </div>
        )
    }
}
