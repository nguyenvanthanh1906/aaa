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
import Register from './components/Register'
import NotFound from './components/NotFound'

export default class App extends Component {
  
  componentWillMount() {
    if (localStorage.expires_at < (Date.now())){
      localStorage.clear()
    }
  }
  
  
  
  render() {
    
    return ( 
      <Router>
        <Switch>
        <Route
    exact
    path="/"
    render={() => {
        return (
            
            <Redirect to="/home" /> 
            
        )
    }}
/>
          <Route path="/home" render ={() => {
            return localStorage.access_token ? <Main></Main> : <Redirect to="/login"></Redirect>
          }}>
            
          </Route>
          
          
          <Route  path="/login" render ={() => {
           return localStorage.access_token ? <Redirect to="/home"></Redirect> : <Login></Login>
          }}>
            
          </Route>
          <Route  path="/register" render ={() => {
           return localStorage.access_token ? <Redirect to="/home"></Redirect> : <Register></Register>
          }}>
            
          </Route>
          <Route  default render ={() => {
           return <NotFound></NotFound>
          }}>
            
          </Route>
        </Switch>
      </Router>
    )
  }
}
