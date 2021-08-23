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
  import { styled } from '@material-ui/core/styles';
  import Card from '@material-ui/core/Card';
  import CardHeader from '@material-ui/core/CardHeader';
  import CardMedia from '@material-ui/core/CardMedia';
  import CardContent from '@material-ui/core/CardContent';
  import CardActions from '@material-ui/core/CardActions';
  import Collapse from '@material-ui/core/Collapse';
  import Avatar from '@material-ui/core/Avatar';
  import IconButton from '@material-ui/core/IconButton';
  import Typography from '@material-ui/core/Typography';
  import { red } from '@material-ui/core/colors';
  import FavoriteIcon from '@material-ui/icons/Favorite';
  import ShareIcon from '@material-ui/icons/Share';
  import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
  import MoreVertIcon from '@material-ui/icons/MoreVert';
  import DeleteIcon from '@material-ui/icons/Delete';
  import EditIcon from '@material-ui/icons/Edit';
  import RemoveRedEyeIcon from '@material-ui/icons/RemoveRedEye';
  import BookmarkIcon from '@material-ui/icons/Bookmark';
  import instance from './instance';
  import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
  import BookmarkRemoveIcon from '@material-ui/icons/BookmarkRemove';
export default class CardProperty extends Component {
    constructor(props){
        super(props)
        this.state = {
         deleted_at : this.props.deleted_at,
         delete_bookmark : false
        }
      }  
    continue = () => {
        if(this.props.property.description.length > 150)
        {
            var description = ""
            for ( let i = 0; i<=300; i++){
                description += this.props.property.description.charAt(i)
            }

            return (<div>{description}<Link className="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger" to={{pathname: "/home/item/"+this.props.slug}}  > Xem tiếp</Link></div>)
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
    bookmark = () => {
        instance.post("api/v1/bookmarks", {
            "property_id" : this.props.id
        })
            .then(res => { 
            
            })
           
            .catch(error => {
              
            }); 
    }
    deleteBookmark = () => {
        instance.delete("api/v1/bookmarks/"+this.props.idBookmark, {
        })
            .then(res => { 
            this.setState({
                delete_bookmark:true
            })
            })
           
            .catch(error => {
              
            }); 
    }
    iconBookmarkFunction = () => {
        
            if(this.props.bookmark == 'bookmarked'){
                return (  <div style={{display:'inline'}}>
                <Link className="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger "  onClick={this.deleteBookmark}  > <IconButton aria-label="bookmark"  style={{paddingLeft:'0px',paddingRight:'0px',outline:'none'}}> <BookmarkRemoveIcon /></IconButton></Link>
            </div>)
            }
            if(true){
                return (  <div style={{display:'inline'}}>
                <Link className="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger "  onClick={this.bookmark}  > <IconButton aria-label="bookmark"  style={{paddingLeft:'0px',paddingRight:'0px',outline:'none'}}> <BookmarkIcon /></IconButton></Link>
            </div>)
            }
          
        
    }
    editDelete= () =>{
        if(this.props.company){
           if(this.props.company.user.username == localStorage.user) {
               if(this.state.deleted_at || this.state.delete_bookmark) {
                return (<div className="" >
                <Link className="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger disabled" to={{pathname: "/home/item/"+this.props.slug}}  > <IconButton aria-label="view"  style={{paddingLeft:'0px',paddingRight:'0px',outline:'none'}}> <RemoveRedEyeIcon /></IconButton></Link>
             <Link className="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger disabled" to={{pathname: "/home/item/edit/"+this.props.slug}}  > <IconButton aria-label="edit" style={{paddingLeft:'0px',paddingRight:'0px',outline:'none'}} > <EditIcon /></IconButton></Link>
            <Link className="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger disabled" onClick={(slug) => {this.delete(this.props.slug)}}  > <IconButton aria-label="delete"  style={{paddingLeft:'0px',paddingRight:'0px',outline:'none'}}> <DeleteIcon /></IconButton></Link>
            {this.iconBookmarkFunction()}
        </div>
           
        )
               } else {
            return (<div className="">
                    <Link className="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger " to={{pathname: "/home/item/"+this.props.slug}}  > <IconButton aria-label="view"  style={{paddingLeft:'0px',paddingRight:'0px',outline:'none'}}> <RemoveRedEyeIcon /></IconButton></Link>
                 <Link className="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger " to={{pathname: "/home/item/edit/"+this.props.slug}} > <IconButton aria-label="edit"  style={{paddingLeft:'0px',paddingRight:'0px',outline:'none'}}> <EditIcon /></IconButton></Link>
                <Link className="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger" onClick={(slug) => {this.delete(this.props.slug)}}  ><IconButton aria-label="delete"  style={{paddingLeft:'0px',paddingRight:'0px',outline:'none'}}> <DeleteIcon /></IconButton></Link>
                {this.iconBookmarkFunction()}
            </div>
               
            )}
        } else {
            return (<div>  <Link className="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger " to={{pathname: "/home/item/"+this.props.slug}}  > <IconButton aria-label="view"  style={{paddingLeft:'0px',paddingRight:'0px',outline:'none'}}> <RemoveRedEyeIcon /></IconButton></Link>
           {this.iconBookmarkFunction()}
            </div>)
        } 
        } else {
            return (
                <div>  <Link className="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger " to={{pathname: "/home/item/"+this.props.slug}}  > <IconButton aria-label="view"  style={{paddingLeft:'0px',paddingRight:'0px',outline:'none'}}> <RemoveRedEyeIcon /></IconButton></Link>
               {this.iconBookmarkFunction()}
            </div>
            )
        }
        
    }
    render() {
        return (
            this.props.property
            ?
                this.state.deleted_at || this.state.delete_bookmark
                ?
                
                <div className="col-md-12 " style={{ opacity:'0.4',marginBottom:'20px', marginTop:'20px', background:'white',border: '0',borderRadius: '3px', boxShadow: '0 0.5rem 1rem 0 rgba(0, 0, 0, 0.2)'}}>
                    <div className='row' >
                        <div className='col-md-5' style={{padding:'0px',marginRight: '30px'}}>
                            <img 
                                src={this.props.property.media[0] ? baseURL+"api/v1/media/"+this.props.property.media[0].slug : 'https://noithatfuhome.com/wp-content/uploads/2018/08/06-3.jpg'}
                                class="img-fluid"
                                style={{borderRadius : '3px',width:"100%",objectFit: 'cover',height:'auto', aspectRatio: '1.77'}}
                            />
                        </div>
                        <div className='col-md-6' style={{ marginTop:'10px'}}>
                            <div className="row">
                                <div className="col-md-2" style={{padding:'0px'}}>
                                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                    R
                                </Avatar>
                                </div>
                                <div className="col-md-4" style={{padding:'0px'}}>
                                    <div className="row font-weight-bold">
                                    {this.props.company ? this.props.company.full_name : 'Đang cập nhật'}  
                                    </div>
                                    <div className="row">
                                        {this.props.property.created_at.slice(0,10)}
                                    </div>
                                </div>  
                                <div className="col-md-6" style={{padding:'0px', textAlign:'end'}}>
                                    {this.editDelete()}
                                </div>
                                <hr style={{width:'100%',textAlign:'center',marginLeft:'0', marginTop:'5px', marginBottom:'5px', backgroundColor:'gray', borderWidth:'1px'}}></hr>
                            </div>
                            <div className="row">
                                <h6>{this.props.property.title}</h6>
                            </div>
                            <div className="row">
                                {this.continue()}
                            </div>
                        </div>
                    </div>
                </div>
                :
                <div className="col-md-12 " style={{marginBottom:'20px', marginTop:'20px', background:'white',border: '0',borderRadius: '3px', boxShadow: '0 0.5rem 1rem 0 rgba(0, 0, 0, 0.2)'}}>
                    <div className='row' >
                        <div className='col-md-5' style={{padding:'0px',marginRight: '30px'}}>
                            <img 
                                src={this.props.property.media[0] ? baseURL+"api/v1/media/"+this.props.property.media[0].slug : 'https://noithatfuhome.com/wp-content/uploads/2018/08/06-3.jpg'}
                                class="img-fluid"
                                style={{borderRadius : '3px',width:"100%",objectFit: 'cover',height:'auto', aspectRatio: '1.77'}}
                            />
                        </div>
                        <div className='col-md-6' style={{ marginTop:'10px'}}>
                            <div className="row">
                                <div className="col-md-2" style={{padding:'0px'}}>
                                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                    R
                                </Avatar>
                                </div>
                                <div className="col-md-4" style={{padding:'0px'}}>
                                    <div className="row font-weight-bold">
                                        {this.props.company ? this.props.company.full_name : 'Đang cập nhật'} 
                                    </div>
                                    <div className="row">
                                        {this.props.property.created_at.slice(0,10)}
                                    </div>
                                </div>  
                                <div className="col-md-6" style={{padding:'0px',textAlign:'end'}}>
                                    {this.editDelete()}
                                </div>
                                <hr style={{width:'100%',textAlign:'center',marginLeft:'0', marginTop:'5px', marginBottom:'5px', backgroundColor:'gray', borderWidth:'1px'}}></hr>
                            </div>
                            <div className="row">
                                <h6>{this.props.property.title}</h6>
                            </div>
                            <div className="row">
                                {this.continue()}
                            </div>
                        </div>
                    </div>
                </div>
             : <div></div>   
        );
    }
}

