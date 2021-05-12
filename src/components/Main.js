import React, { Component } from 'react';
import Header from './Header'
import Menu from './Menu'
import BanDo from './BanDo'
import Project from './Project'
import Footer from './Footer'
import Login from './Login'
import SearchForm from './SearchForm'
import Item from './Item'
import MessengerCustomerChat from 'react-messenger-customer-chat';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
  useRouteMatch
} from "react-router-dom";
import Cookies from 'universal-cookie';
import UserProfile from './UserProfile';
class Main extends Component {


    render() {
        return (
          
            <Switch>
              <div>
                
                <Menu></Menu>
                
                <Route exact path="/home">
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
                      </div>
                    </div>
                  </section>     
                  <Project></Project>           
                </Route>
                <Route   path="/home/search" render ={() => {
                return localStorage.access_token ?
               
              <section className="page-section " id="portfolio">
                    <div className="container-fluid">
                      <div className="row ">
                        <div className="col-lg-12">
                          <h2 className="page-section-heading text-center text-uppercase text-secondary mb-0">Map</h2>
                          <div className="divider-custom">
                              <div className="divider-custom-line"></div>
                              <div className="divider-custom-icon"><i className="fas fa-star"></i></div>
                              <div className="divider-custom-line"></div>
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <BanDo></BanDo> 
                        </div>
                      </div>
                    </div>
                  </section> 
             : <Redirect to="/login"></Redirect>
            
          }}>
                  
                </Route >    
                <Route path="/home/item">
                  <Item></Item>
                  <div>
                    <MessengerCustomerChat
                      pageId="573519563172949"
                      appId="227467335820875"/>
                  </div>
                </Route >  


                <Route   path="/home/profile" render ={() => {
                return localStorage.access_token ?
               
              <section className="page-section " id="portfolio">
                    <div className="container-fluid">
                      <div className="row ">
                        <div className="col-lg-12">
                          <h2 className="page-section-heading text-center text-uppercase text-secondary mb-0">Your profile</h2>
                          <div className="divider-custom">
                              <div className="divider-custom-line"></div>
                              <div className="divider-custom-icon"><i className="fas fa-star"></i></div>
                              <div className="divider-custom-line"></div>
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <UserProfile></UserProfile> 
                        </div>
                      </div>
                    </div>
                  </section> 
             : <Redirect to="/login"></Redirect>
            
          }}>
                  
                </Route >    
                <Footer></Footer>         
              </div>        
           </Switch>
        );
    }
}
export default Main;