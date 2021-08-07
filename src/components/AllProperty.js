import React, { Component } from 'react';
import CardProperty from './CardProperty';
import LazyLoad from 'react-lazyload';
import instance from './instance';
import ButtonPage from './ButtonPage';

export default class AllProperty extends Component {
    constructor(props){
        super(props)
        this.state = {
         "all_properties" : [],
           "last_page" : null ,
           "current_page" : null,
           "total_page" : null,
           "per_page" : null,
           "sort_by" : 'created_at'
        }
      }  
    componentDidMount() {
        var params = {}
       
     
            params = {
                username : this.props.username,
                search : this.props.search,
                sale_method : this.props.sale_method,
                sort_by : this.state.sort_by,
                min_price : this.props.min_price,
                max_price : this.props.max_price,
                min_area : this.props.min_area,
                max_area : this.props.max_area,
                per_page : this.props.per_page,
                page : this.props.page
            }
            
       for (var propName in params) {
    if (params[propName] === null || params[propName] === undefined ||params[propName] === "all") {
      delete params[propName];
    }
  }
       console.log(params)
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
        params = {
            username : this.props.username,
            search : this.props.search,
            sale_method : this.props.sale_method,
            sort_by : this.state.sort_by,
            min_price : this.props.min_price,
            max_price : this.props.max_price,
            min_area : this.props.min_area,
            max_area : this.props.max_area,
            per_page : pe,
            page : p
        }
        for (var propName in params) {
            if (params[propName] === null || params[propName] === undefined ||params[propName] === "all") {
              delete params[propName];
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
                                search = {this.props.search}
                                ></ButtonPage>)
                         })
                     }
                     
                
                </ul>
              </nav>
            )
        }
    }
    sortBy = (e) => {
        this.setState({
            sort_by : e.target.value 
        },() => {
            var params = null;
            params = {
                username : this.props.username,
                search : this.props.search,
                sale_method : this.props.sale_method,
                sort_by : this.state.sort_by,
                min_price : this.props.min_price,
                max_price : this.props.max_price,
                min_area : this.props.min_area,
                max_area : this.props.max_area,
                per_page : this.props.per_page,
                page : this.props.page
            }
            for (var propName in params) {
                if (params[propName] === null || params[propName] === undefined ||params[propName] === "all") {
                  delete params[propName];
                }
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
        });
    }
    deleteFunction = (slug) => {
        instance.delete("api/v1/properties/" + slug, {
            
               
            
        })
            .then(res => { 
                this.state.all_properties.map((p,index) => {
                   if(p.deleted_at){
                       
                   }
                  })
            
            })
           
            .catch(error => {
              console.log('error', error)
              alert("fail")
            }); 
    }
    render() {
        return (
            <div className="container" >
            <div className="col-lg-12">
                <div className="col-md-3 ">
                     <label style={{fontWeight : 'bold'}}>Sort by</label>
                    <select name="sort_by"  className="form-control" onChange={this.sortBy}>
                        <option value="+created_at">Created at : from old to new</option>
                        <option  value="-created_at">Created at : from new to old</option>
                        <option  value="+updated_at">Updated at : from old to new</option>
                        <option  value="-updated_at">Updated at : from new to old</option>
                        <option  value="+price">Price : from low to high</option>
                        <option  value="-price">Price : from high to low</option>
                        <option  value="+area">Area : from low to high</option>
                        <option  value="-area">Area : from high to low</option>
                        
                    </select>
                </div>
                               
          <div className="row">
          {
          this.state.all_properties.map((p,index) => {
            return (
             
                <CardProperty property={p.details} slug={p.slug} deleted_at={p.deleted_at} company={p.company} delete={this.deleteFunction}/>
              
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

 