import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class ButtonPage extends Component {
    pagination = () => {
        if( this.props.username) {
            if(this.props.page == this.props.current_page ){
                return ( <li className="page-item disabled"><Link className="page-link" to={{pathname: "/home/item/all/"+localStorage.user+"/"+this.props.per_page+"/"+this.props.page}}  onClick={(p,pe) => {this.props.goPage(this.props.page,this.props.per_page)}}>{this.props.page}</Link></li>)
            } else {
                return ( <li className="page-item"><Link className="page-link" to={{pathname: "/home/item/all/"+localStorage.user+"/"+this.props.per_page+"/"+this.props.page}}  onClick={(p,pe) => {this.props.goPage(this.props.page,this.props.per_page)}}>{this.props.page}</Link></li>)
            }
        } if( this.props.sale_method) {
            if(this.props.page == this.props.current_page ){
                return ( <li className="page-item disabled"><Link className="page-link" to={{pathname: "/home/item/sale-method/"+this.props.sale_method+"/"+this.props.per_page+"/"+this.props.page}}  onClick={(p,pe) => {this.props.goPage(this.props.page,this.props.per_page)}}>{this.props.page}</Link></li>)
            } else {
                return ( <li className="page-item"><Link className="page-link" to={{pathname: "/home/item/sale-method/"+this.props.sale_method+"/"+this.props.per_page+"/"+this.props.page}}  onClick={(p,pe) => {this.props.goPage(this.props.page,this.props.per_page)}}>{this.props.page}</Link></li>)
            }
        }
        if( this.props.min_price) {
            if(this.props.page == this.props.current_page ){
                return ( <li className="page-item disabled"><Link className="page-link" to={{pathname: "/home/item/search/"+this.props.min_price+"/"+this.props.max_price+"/"+this.props.min_area+"/"+this.props.max_area+"/"+this.props.per_page+"/"+this.props.page}}  onClick={(p,pe) => {this.props.goPage(this.props.page,this.props.per_page)}}>{this.props.page}</Link></li>)
            } else {
                return ( <li className="page-item"><Link className="page-link" to={{pathname: "/home/item/search/"+this.props.min_price+"/"+this.props.max_price+"/"+this.props.min_area+"/"+this.props.max_area+"/"+this.props.per_page+"/"+this.props.page}}  onClick={(p,pe) => {this.props.goPage(this.props.page,this.props.per_page)}}>{this.props.page}</Link></li>)
            }
        }
         else {
            if(this.props.page == this.props.current_page ){
                return ( <li className="page-item disabled"><Link className="page-link" to={{pathname: "/home/item/all/"+this.props.per_page+"/"+this.props.page}}  onClick={(p,pe) => {this.props.goPage(this.props.page,this.props.per_page)}}>{this.props.page}</Link></li>)
            } else {
                return ( <li className="page-item"><Link className="page-link" to={{pathname: "/home/item/all/"+this.props.per_page+"/"+this.props.page}}  onClick={(p,pe) => {this.props.goPage(this.props.page,this.props.per_page)}}>{this.props.page}</Link></li>)
            }
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

