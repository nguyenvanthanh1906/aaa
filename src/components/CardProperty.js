import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
    Link,
    useRouteMatch
  } from "react-router-dom";
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
                <Link className="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger disabled" to={{pathname: "/home/item/"+this.props.slug}}  ><button className="btn btn-primary">View</button></Link>
             <Link className="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger disabled" to={{pathname: "/home/item/edit/"+this.props.slug}}  ><button className="btn btn-success">Edit</button></Link>
            <Link className="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger disabled" onClick={(slug) => {this.delete(this.props.slug)}}  ><button className="btn btn-danger">Delete</button></Link>
        </div>
           
        )
               } else {
            return (<div className="">
                    <Link className="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger " to={{pathname: "/home/item/"+this.props.slug}}  ><button className="btn btn-primary">View</button></Link>
                 <Link className="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger " to={{pathname: "/home/item/edit/"+this.props.slug}}  ><button className="btn btn-success">Edit</button></Link>
                <Link className="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger" onClick={(slug) => {this.delete(this.props.slug)}}  ><button className="btn btn-danger">Delete</button></Link>
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
    render() {
        return (
            this.state.deleted_at
            ?
            <div className="col-md-12 " style={{margin:'20px 0 20px 0', opacity:'0.4'}}>
               <div className="row ">
                    <div className="col-md-4">
                    <img
                    src="https://mdbootstrap.com/img/new/standard/nature/111.jpg"
                    class="img-fluid"
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
                    <div className="col-md-4">
                    <img
                    src="https://mdbootstrap.com/img/new/standard/nature/111.jpg"
                    class="img-fluid"
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

