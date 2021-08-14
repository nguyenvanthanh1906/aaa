import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
    Link,
    useRouteMatch
  } from "react-router-dom";
  import baseURL from './baseURL'
  import { Button } from '@material-ui/core';

export default class CardProperty extends Component {
    constructor(props){
        super(props)
        this.state = {
         deleted_at : this.props.deleted_at
        }
      }  
    continue = () => {
        if(this.props.property.description.length > 150)
        {
            var description = ""
            for ( let i = 0; i<=150; i++){
                description += this.props.property.description.charAt(i)
            }

            return (<div>{description}<Link className="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger" to={{pathname: "/home/item/"+this.props.slug}}  >Xem tiếp</Link></div>)
        } else {
            return (<div>{this.props.property.description}</div>)

        }
    }
    delete = (slug) => {
        this.setState({
            deleted_at : true
        })
        this.props.delete(slug)
    }
    editDelete= () =>{
        if(this.props.company){
           if(this.props.company.user == localStorage.user) {
               if(this.state.deleted_at) {
                return (<div className="">
                <Link className="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger disabled" to={{pathname: "/home/item/"+this.props.slug}}  ><Button variant="contained" color="success">View</Button></Link>
             <Link className="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger disabled" to={{pathname: "/home/item/edit/"+this.props.slug}}  ><Button variant="contained" color="primary">Edit</Button></Link>
            <Link className="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger disabled" onClick={(slug) => {this.delete(this.props.slug)}}  ><Button variant="contained" color="error">Delete</Button></Link>
        </div>
           
        )
               } else {
            return (<div className="">
                    <Link className="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger " to={{pathname: "/home/item/"+this.props.slug}}  ><Button variant="contained" color="success">View</Button></Link>
                 <Link className="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger " to={{pathname: "/home/item/edit/"+this.props.slug}}  ><Button variant="contained" color="primary">Edit</Button></Link>
                <Link className="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger" onClick={(slug) => {this.delete(this.props.slug)}}  ><Button variant="contained" color="error">Delete</Button></Link>
            </div>
               
            )}
        } else {
            return (<div>  <Link className="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger" to={{pathname: "/home/item/"+this.props.slug}}  ><button className="btn btn-primary">View</button></Link>
            </div>)
        } 
        } else {
            return (
                <div>  <Link className="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger" to={{pathname: "/home/item/"+this.props.slug}}  ><button className="btn btn-primary">View</button></Link>
            </div>
            )
        }
        
    }
    render() {console.log(this.props.property.media)
        return (
            this.state.deleted_at
            ?
            <div className="col-md-12 " style={{margin:'20px 0 20px 0', opacity:'0.4'}}>
               <div className="row ">
                    <div className="col-md-4" style={{width: '100%', height:'200px'}}>
                    <img
                    src={this.props.property.media[0] ? baseURL+"api/v1/media/"+this.props.property.media[0].slug : 'https://noithatfuhome.com/wp-content/uploads/2018/08/06-3.jpg'}
                    class="img-fluid"
                    style={{borderRadius : '20px',width:"auto",objectFit: 'cover',height:'100%', aspectRatio: '1.77'}}
                    />
                    </div>
                    <div className="col-md-8">
                        <h4>{this.props.property.title}</h4>
                         {this.continue()}   
                        <div>Price : {this.props.property.price} triệu</div>
                        {this.editDelete()}

                    </div>
               </div>
            </div>
            :
            <div className="col-md-12 " style={{margin:'20px 0 20px 0'}}>
               <div className="row ">
                    <div className="col-md-4" style={{width: '100%', height:'200px'}}>
                    <img
                     src={this.props.property.media[0] ? baseURL+"api/v1/media/"+this.props.property.media[0].slug : 'https://noithatfuhome.com/wp-content/uploads/2018/08/06-3.jpg'}
                    class="img-fluid"
                    style={{borderRadius : '20px',width:"auto",objectFit: 'cover',height:'100%', aspectRatio: '1.77'}}
                    />
                    </div>
                    <div className="col-md-8">
                        <h4>{this.props.property.title}</h4>
                         {this.continue()}   
                        <div>Price : {this.props.property.price} triệu</div>
                        {this.editDelete()}

                    </div>
               </div>
            </div>
        );
    }
}

