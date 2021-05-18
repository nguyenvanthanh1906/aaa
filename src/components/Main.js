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
import CreateProperty from './CreateProperty';
import EditProperty from './EditProperty';
import AllProperty from './AllProperty';
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
                <Route   path="/home/map" render ={() => {
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
                <Route exact path="/home/item/all/:username/:per_page/:page" render ={(match) => {
                  return localStorage.access_token ?
                  <section className="page-section " id="portfolio">
                  <div className="container-fluid">
                    <div className="row ">
                      <div className="col-lg-12">
                        <h2 className="page-section-heading text-center text-uppercase text-secondary mb-0">All My property</h2>
                        <div className="divider-custom">
                            <div className="divider-custom-line"></div>
                            <div className="divider-custom-icon"><i className="fas fa-star"></i></div>
                            <div className="divider-custom-line"></div>
                        </div>
                      </div>
                     <AllProperty page = {match.match.params.page} per_page={match.match.params.per_page} username={match.match.params.username}></AllProperty>
                    
                    </div>
                  </div>
                </section> 
                  : <Redirect to="/login"></Redirect>
                }}>
                </Route > 
                 
                <Route exact path="/home/item/all/:per_page/:page" render ={(match) => {
                  return localStorage.access_token ?
                  <section className="page-section " id="portfolio">
                  <div className="container-fluid">
                    <div className="row ">
                      <div className="col-lg-12">
                        <h2 className="page-section-heading text-center text-uppercase text-secondary mb-0">All properties</h2>
                        <div className="divider-custom">
                            <div className="divider-custom-line"></div>
                            <div className="divider-custom-icon"><i className="fas fa-star"></i></div>
                            <div className="divider-custom-line"></div>
                        </div>
                      </div>
                     <AllProperty page = {match.match.params.page} per_page={match.match.params.per_page} ></AllProperty>
                    
                    </div>
                  </div>
                </section> 
                  : <Redirect to="/login"></Redirect>
                }}>
                </Route > 
                <Route exact path="/home/item/sale-method/:sale_method" render ={(match) => {
                  return localStorage.access_token ?
                  <section className="page-section " id="portfolio">
                  <div className="container-fluid">
                    <div className="row ">
                      <div className="col-lg-12">
                        <h2 className="page-section-heading text-center text-uppercase text-secondary mb-0">{match.match.params.sale_method} properties</h2>
                        <div className="divider-custom">
                            <div className="divider-custom-line"></div>
                            <div className="divider-custom-icon"><i className="fas fa-star"></i></div>
                            <div className="divider-custom-line"></div>
                        </div>
                      </div>
                     <AllProperty page = {match.match.params.page} per_page={match.match.params.per_page} sale_method={match.match.params.sale_method}></AllProperty>
                    
                    </div>
                  </div>
                </section> 
                  : <Redirect to="/login"></Redirect>
                }}>
                </Route > 
                <Route exact path="/home/item/search/:min_price/:max_price/:min_area/:max_area/:per_page/:page" render ={(match) => {
                  return localStorage.access_token ?
                  <section className="page-section " id="portfolio">
                  <div className="container-fluid">
                    <div className="row ">
                      <div className="col-lg-12">
                        <h2 className="page-section-heading text-center text-uppercase text-secondary mb-0">{match.match.params.sale_method} properties</h2>
                        <div className="divider-custom">
                            <div className="divider-custom-line"></div>
                            <div className="divider-custom-icon"><i className="fas fa-star"></i></div>
                            <div className="divider-custom-line"></div>
                        </div>
                      </div>
                     <AllProperty page = {match.match.params.page} 
                     per_page={match.match.params.per_page} 
                     min_price={match.match.params.min_price} 
                     max_price={match.match.params.max_price}
                     min_area={match.match.params.min_area}
                     max_area={match.match.params.max_area}
                     ></AllProperty>
                    
                    </div>
                  </div>
                </section> 
                  : <Redirect to="/login"></Redirect>
                }}>
                </Route > 
                <Route exact path="/home/item/:property" render ={(match) => {
                  return localStorage.access_token ?
                  <Item property = {match.match.params.property}></Item>
                  : <Redirect to="/login"></Redirect>
                }}>
                </Route >  
                <Route path="/home/item/edit/:property" render ={(match) => {
                  return localStorage.access_token ?
                  <section className="page-section " id="portfolio">
                  <div className="container-fluid">
                    <div className="row ">
                      <div className="col-lg-12">
                        <h2 className="page-section-heading text-center text-uppercase text-secondary mb-0">Edit property</h2>
                        <div className="divider-custom">
                            <div className="divider-custom-line"></div>
                            <div className="divider-custom-icon"><i className="fas fa-star"></i></div>
                            <div className="divider-custom-line"></div>
                        </div>
                      </div>
                      <div className="col-lg-12">
                      <EditProperty property = {match.match.params.property}></EditProperty>

                      </div>
                    </div>
                  </div>
                </section> 
                  : <Redirect to="/login"></Redirect>
                }}>
                </Route >  


                <Route   path="/home/profile/:username" render ={(match) => {
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
                          <UserProfile username={match.match.params.username}></UserProfile> 
                        </div>
                      </div>
                    </div>
                  </section> 
             : <Redirect to="/login"></Redirect>
            
          }}>
                  
                </Route >    
                <Route   path="/home/create" render ={() => {
                return localStorage.access_token ?
               
              <section className="page-section " id="portfolio">
                    <div className="container-fluid">
                      <div className="row ">
                        <div className="col-lg-12">
                          <h2 className="page-section-heading text-center text-uppercase text-secondary mb-0">Create property</h2>
                          <div className="divider-custom">
                              <div className="divider-custom-line"></div>
                              <div className="divider-custom-icon"><i className="fas fa-star"></i></div>
                              <div className="divider-custom-line"></div>
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <CreateProperty></CreateProperty> 
                        </div>
                      </div>
                    </div>
                  </section> 
             : <Redirect to="/login"></Redirect>
            
          }}>
                  
                </Route >    
                <div>
                    <MessengerCustomerChat
                      pageId="100410325571682"
                      appId="499116921270328"/>
                  </div>
                <Footer></Footer>         
              </div>        
           </Switch>
        );
    }
}
export default Main;