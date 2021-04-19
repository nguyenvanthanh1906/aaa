import React, { Component } from 'react'
import Header from './components/Header'
import Menu from './components/Menu'
import BanDo from './components/BanDo'
import Project from './components/Project'
import Footer from './components/Footer'
import SearchForm from './components/SearchForm'
import Item from './components/Item'
import MessengerCustomerChat from 'react-messenger-customer-chat';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
export default class App extends Component {
  
  
  render() {
    return ( 
      <Router>
      <div>
        

      <Menu></Menu>
      
        <Switch>

          <Route exact path="/">
          <Header></Header>
      <section className="page-section " id="portfolio">
      <div className="container-fluid">
        <div className="row ">
          <div className="col-lg-12">
          <h2 className="page-section-heading text-center text-uppercase text-secondary mb-0">Search</h2>
                  
                  <div className="divider-custom">
                      <div className="divider-custom-line"></div>
                      <div className="divider-custom-icon"><i className="fas fa-star"></i></div>
                      <div className="divider-custom-line"></div>
                  </div>
          </div>
          <div className="col-lg-12">
            <SearchForm></SearchForm> 
          </div>
         <div className="col-lg-12">
           <BanDo></BanDo>
         </div>
          
        </div>
        </div>
      </section>

       <Project></Project>
      
          </Route>
          <Route path="/item">
            <Item></Item>
            <div>
           <MessengerCustomerChat
    pageId="573519563172949"
    appId="227467335820875"
   
  />
        </div>
          </Route>
          
        </Switch>
        <Footer></Footer>
        
       
      </div>
    </Router>
   
  
      
    )
  }
}
