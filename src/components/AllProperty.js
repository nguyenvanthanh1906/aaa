import React, { Component } from 'react';
import CardProperty from './CardProperty';
import LazyLoad from 'react-lazyload';
import instance from './instance';
import ButtonPage from './ButtonPage';
import Pagination from "react-js-pagination";
import ReactPaginate from 'react-paginate';
export default class AllProperty extends Component {
    constructor(props){
        super(props)
        this.state = {
         "all_properties" : [],
           "last_page" : null ,
           "current_page" : null,
           "total_page" : null,
           "per_page" : null
        }
      }  
    componentDidMount() {
        var params = null;
        if (this.props.username != null) {
            params = {
                username : this.props.username,
                per_page : this.props.per_page,
                page : this.props.page
            }
            console.log(params)
        } if(this.props.sale_method) {
            params = {
                sale_method : this.props.sale_method,
                per_page : this.props.per_page,
                page : this.props.page
            }
            console.log(params)
        } 
        if(this.props.min_price) {
            params = {
                min_price : this.props.min_price,
                max_price : this.props.max_price,
                min_area : this.props.min_area,
                max_area : this.props.max_area,
                per_page : this.props.per_page,
                page : this.props.page
            }
            console.log(params)
        } 
        if(!this.props.username && !this.props.min_price &&!this.props.sale_method) {
            params = {
               
                per_page : this.props.per_page,
                page : this.props.page
            }
            console.log(params)
        }
        instance.get("api/v1/properties", {
            params : params
        })
            .then(res => { 
                var total = []
                for(let i =1 ; i <= res.data.last_page; i++)
                {
                    total.push(i)
                }
                
               this.setState({
                   all_properties : res.data.result,
                    last_page : res.data.last_page,
                    total_page : total,
                    current_page : this.props.page,
                    per_page : this.props.per_page
               })
            
            })
           
            .catch(error => {
              console.log('error', error.res)
              alert("fail")
            }); 
    }
    goPage = (p,pe) => {
        var params = null;
        if (this.props.username) {
            params = {
                username : this.props.username,
                per_page : pe,
                page : p
            }
        } if(this.props.sale_method) {
            params = {
                sale_method : this.props.sale_method,
                per_page : pe,
                page : p
            }
        } 
        if(this.props.min_price) {
            params = {
                min_price : this.props.min_price,
                max_price : this.props.max_price,
                min_area : this.props.min_area,
                max_area : this.props.max_area,
                per_page : pe,
                page : p
            }
        } 
        if(!this.props.username && !this.props.min_price &&!this.props.sale_method) {
            params = {
               
                per_page : pe,
                page : p
            }
        }
        instance.get("api/v1/properties", {
            params: params
        })
            .then(res => { 
                window.scrollTo(0, 0)
                var total = []
                for(let i =1 ; i <= res.data.last_page; i++)
                {
                    total.push(i)
                }
                
               this.setState({
                   all_properties : res.data.result,
                    last_page : res.data.last_page,
                    total_page : total,
                    current_page : this.props.page,
                    per_page : this.props.per_page
               })
            
            })
           
            .catch(error => {
              console.log('error', error.res)
              alert("fail")
            }); 
    }
    
        
        
    
    
    pagination = () => {
        if(this.state.last_page > 1){
            return (
                <nav aria-label="Page navigation example">
                <ul className="pagination">
                  
                     {
                         this.state.total_page.map((p) => {
                            return (<ButtonPage 
                                current_page={this.state.current_page} 
                                per_page={this.state.per_page} 
                                page={p} 
                                goPage={this.goPage} 
                                username = {this.props.username} 
                                sale_method={this.props.sale_method} 
                                min_price = {this.props.min_price}
                                max_price = {this.props.max_price}
                                min_area={this.props.min_area}
                                max_area = {this.props.max_area}
                                ></ButtonPage>)
                         })
                     }
                     
                
                </ul>
              </nav>
            )
        }
    }
    render() {
        return (
            <div className="container" >
            <div className="col-lg-12">
          <div className="row">
          {this.state.all_properties.map((p,index) => {
            return (
             
                <CardProperty property={p.details} slug={p.slug} company={p.company}/>
              
            );
          })
          }   
       
        
        </div>
        {this.pagination()}
        </div>
        </div>
        );
    }
}

 