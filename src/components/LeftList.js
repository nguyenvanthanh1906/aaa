import React, { Component } from 'react'
import baseURL from './baseURL'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
    Link,
    useRouteMatch
  } from "react-router-dom";

export default class LeftList extends Component {
    render() {
        return (
            <div>
                <div className="container">
                <h2>Results</h2>
        <ul className="list-group" style={{height: '650px', overflow: 'scroll'}}>
            {
                this.props.items.map((i) => {
                    return (
                        <div style={{textAlign:'center',backgroundColor:'white', margin:'5px',objectFit:'cover'}}>
                            <Link to={{pathname: "/home/item/"+i.slug}}>
                                <div className="row">
                                <div className="col-6">
                                <img
                        src={i.details.media[0] ? baseURL+"api/v1/media/"+i.details.media[0].slug : 'https://noithatfuhome.com/wp-content/uploads/2018/08/06-3.jpg'}
                       class="img-fluid"
                       style={{borderRadius : '5px',width:"auto",objectFit: 'cover',height:'70px', aspectRatio: '1.77'}}
                       />
                                </div>
                                <div className="col-5" style={{}} >
                                <p >{i.details.title}</p>
                                </div>
                                </div>
                       
                       </Link>
                       </div>
                    )
                })
            }
          
        </ul>
      </div>
            </div>
        )
    }
}
