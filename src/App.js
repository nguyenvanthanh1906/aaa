import React, { Component } from 'react'
import Header from './components/Header'
import Menu from './components/Menu'
import BanDo from './components/BanDo'
import Project from './components/Project'
import Footer from './components/Footer'
import Login from './components/Login'
import Main from './components/Main'

import SearchForm from './components/SearchForm'
import Item from './components/Item'
import MessengerCustomerChat from 'react-messenger-customer-chat';
import Cookies from 'universal-cookie';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useRouteMatch
} from "react-router-dom";

export default class App extends Component {
  
  
  render() {
    
    return ( 
      <Router>
        <Switch>
          <Route path="/home" render ={() => {
            const cookies = new Cookies();
            return cookies.get('access_token') ? <Main></Main> : <Redirect to="/login"></Redirect>
          }}>
            
          </Route>
          
          
          <Route  path="/login" render ={() => {
           const cookies = new Cookies();
           return cookies.get('access_token') ? <Redirect to="/home"></Redirect> : <Login></Login>
          }}>
            
          </Route>
        </Switch>
      </Router>
    )
  }
}
