import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class ButtonPage extends Component {
   
    pagination = () => {
        
            if(this.props.page == this.props.current_page ){
                return ( <li className="page-item disabled"><Link className="page-link" to={{pathname: "/home/items/min_price="+this.props.min_price+"/max_price="+this.props.max_price+"/min_area="+this.props.min_area+"/max_are="+this.props.max_area+"/sale_method="+this.props.sale_method+"/username="+this.props.username+"/search="+this.props.search+"/per_page="+this.props.per_page+"/page="+this.props.page+"/"}}  onClick={(p,pe) => {this.props.goPage(this.props.page,this.props.per_page)}}>{this.props.page}</Link></li>)
            } else {
                return ( <li className="page-item"><Link className="page-link" to={{pathname: "/home/items/min_price="+this.props.min_price+"/max_price="+this.props.max_price+"/min_area="+this.props.min_area+"/max_are="+this.props.max_area+"/sale_method="+this.props.sale_method+"/username="+this.props.username+"/search="+this.props.search+"/per_page="+this.props.per_page+"/page="+this.props.page+"/"}}  onClick={(p,pe) => {this.props.goPage(this.props.page,this.props.per_page)}}>{this.props.page}</Link></li>)
            }
        
        
    }
    render() {
        return (
            <div>
               {this.pagination()}

            </div>
        );
    }
}

