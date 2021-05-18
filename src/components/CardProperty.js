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
    editDelete= () =>{
        if(this.props.company){
           if(this.props.company.user == localStorage.user) {
            return (<div>
                    <Link className="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger" to={{pathname: "/home/item/"+this.props.slug}}  ><button className="btn btn-primary">View</button></Link>
                 <Link className="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger" to={{pathname: "/home/item/edit/"+this.props.slug}}  ><button className="btn btn-success">Edit</button></Link>
                <Link className="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger" to={{pathname: "/home/item/"+this.props.slug}}  ><button className="btn btn-danger">Delete</button></Link>
            </div>
               
            )
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
            <div className="col-md-12" style={{margin:'20px 0 20px 0',}}>
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

