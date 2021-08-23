import React, { Component } from 'react'
import Cookies from 'universal-cookie';
import { createHashHistory } from "history";
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import instance from './instance';
import { getPusher } from '../pusher';
import Avatar from '@material-ui/core/Avatar';

export default class Menu extends Component {

  logout = (event) => {

    instance.post("api/v1/auth/sign-out", {}, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    })
      .then(res => {
        if (res.status == 200) {
          localStorage.clear();
          getPusher() && getPusher().disconnect();
          const history = createHashHistory();

          history.push('/login')
        } else {
          throw Error(res.status)
        }
      })

      .catch(error => {
        console.log('error', error)
        alert("fail")
      });


  }
  properties = () => {
    window.location.href = "/home/items/min_price=all/max_price=all/min_area=all/max_are=all/sale_method=all/username=" + localStorage.user + "/search=all/per_page=10/page=1"
  }
  render() {

    return (
      <div>

        <nav className="navbar navbar-expand-lg bg-secondary text-uppercase fixed-top" id="mainNav">
          <div className="container">
            <a className="navbar-brand js-scroll-trigger" href="#page-top">QuadaLand</a>
            <button className="navbar-toggler navbar-toggler-right text-uppercase font-weight-bold bg-primary text-white rounded" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
              Menu
              <i className="fas fa-bars" />
            </button>
            <div className="collapse navbar-collapse" id="navbarResponsive">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item mx-0 mx-lg-1"><Link className="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger" to={{ pathname: "/home" }}  >Trang chủ</Link></li>
                <li className="nav-item mx-0 mx-lg-1"><a className="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger" href="/home/map">Bản đồ</a></li>
                {(localStorage.role === 'company')
                  ? <li className="nav-item mx-0 mx-lg-1"><Link className="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger" to={{ pathname: "/home/create" }}  >Tạo bài</Link></li>
                  : <p></p>}
                {(localStorage.role === 'company')
                  ? <li className="nav-item mx-0 mx-lg-1"><Link className="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger" to={{ pathname: "/home/media" }}  >Bộ sưu tập</Link></li>
                  : <p></p>}
                {(localStorage.role === 'company')
                  ? <li className="nav-item mx-0 mx-lg-1"><a className="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger" onClick={this.properties} style={{ cursor: 'pointer' }}  >Bài viết</a></li>
                  : <p></p>}
              
               
                      
                   
               
                
              </ul>
               <div className="dropdown" style={{  marginLeft:'100px'}}>
                    
                      <div  className="btn" data-toggle="dropdown" style={{padding:'0',  marginRight:'100px'}}>
                     
                        <Avatar
                          alt=""
                          src=""
                          sx={{ width: 40, height: 40 }}
                        />
                      </div>
                   
                    <div className="dropdown-menu">
                     <div style={{marginTop:'5px', marginBottom:'5px'}}><Link className="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger " style={{paddingTop:'10px'}} to="/login" onClick={this.logout}>Đăng xuất</Link></div>
                     <hr style={{width:'70%',textAlign:'left',margin:'auto', opacity:'50%', backgroundColor:'gray', borderWidth:'1px'}}></hr>
                     <div style={{marginTop:'5px', marginBottom:'5px'}}> <Link className="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger" style={{paddingTop:'10px'}} to={{ pathname: "/home/profile/" + localStorage.user }}  >Cá nhân</Link></div>
                     <hr style={{width:'70%',textAlign:'left',margin:'auto', opacity:'50%', backgroundColor:'gray', borderWidth:'1px'}}></hr>
                     <div style={{marginTop:'5px', marginBottom:'5px'}}> <Link className="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger" style={{paddingTop:'10px'}} to={{ pathname: "/home/bookmarks/per_page=10/page=1/sort_by=-created_at"}}  >Đã lưu</Link></div>
                    </div>
                  </div>
            </div>
          </div>
        </nav>
      </div>
    )
  }
}
