import React, { Component } from 'react';
import { Button, Slider } from '@material-ui/core';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
    Link,
    useRouteMatch
  } from "react-router-dom";
  import LoginIcon from '@material-ui/icons/Login';
class RegisterSuccess extends Component {
    render() {
        return (
            <div className="container" style={{border: '3px',borderRadius: '10px', boxShadow: '0 0.5rem 1rem 0 rgba(0, 0, 0, 0.2)', marginTop:"100px",  padding:'0px'}}>
                <div style={{backgroundColor:"#4ad395", width:"100%", textAlign:'center', borderTopRightRadius: '10px',borderTopLeftRadius: '10px'}}>
                    <div style={{paddingTop:"40px"}}>
                    <img src='/assets/svg/check (2).png' width="20%"></img>
                    </div>
                    <div style={{color:"white", marginTop:"40px", paddingBottom:'20px'}}>
                        <h1 > Kích hoạt email thành công</h1>
                    </div>
                    
                </div>
                <div style={{ display:"flex", width:"100%", marginTop:"50px", paddingBottom:'50px'}}>
                <Button variant="contained" style={{marginTop:'40px', margin:'auto'}} startIcon={<LoginIcon />}>
                <Link style={{color:'white'}} 
                to={{pathname: "/login"}} >Chuyển đến trang đăng nhập</Link>
                    </Button>
                </div>
            </div>
        );
    }
}

export default RegisterSuccess;