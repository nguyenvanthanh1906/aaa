import React, { Component } from 'react'
import cities from'./Cities.json'
import Nouislider from "nouislider-react";
import "nouislider/distribute/nouislider.css";
import { Button, Slider } from '@material-ui/core';
import './search.css';
import SearchIcon from '@material-ui/icons/Search';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
    Link,
    useRouteMatch
  } from "react-router-dom";
export default class SearchForm extends Component {
    constructor(props)
    {
        super(props)
        this.state = {
            cities : cities,
            cityId : 0,
            districtId : 0,
            districts : [],
            wards : [],
            costMin:1,
            costMax : 20001,
            SMin : 1,
            SMax : 501,
            search : "",
            sale_method : "all",
            wardId : 0
        }
    }
   changeCity = (event) => {
        this.setState({
            cityId : event.target.value,
            wards : []
        })
        this.state.cities.map((city) => {
            if(city.id == event.target.value)
            {
                this.setState({
                    search : city.name,
                    districts : city.districts
                })
            }
            
        })
        if(event.target.value == 0)
            {
                this.setState({
                    districtId : 0,
                    districts : [],
                    wards : []
                })
            }
   }
   changeDistrict = (event) => {
       this.setState({
            districtId : event.target.value,
       })
       this.state.districts.map((district) => {
           if(district.id == event.target.value)
           {
               this.setState({
                search : district.name,
                   wards : district.wards
               })
           }
       })
       if(event.target.value == 0)
       {
           if(this.state.cityId){

           }
           this.setState({
            
               wards : []
           })
       }
   }
   changeWard = (event) => {
       this.state.wards.map((w) => {
           if(w.id == event.target.value){
                this.setState({
         search : w.name,
    })
   
           }
       })
   
   
}
  
  onSlideS = (render, handle, value, un, percent) => {
      this.setState({
          SMin : value[0].toFixed(0),
          SMax : value[1].toFixed(0),
      })
  }
  onSlideCost = (render, handle, value, un, percent) => {
      this.setState({
          costMin : value[0].toFixed(0),
          costMax : value[1].toFixed(0),
      })
  }
  inputSMin = (event) => {
      this.setState({
          SMin : event.target.value
      })
  }
  inputSMax = (event) => {
    this.setState({
        SMax : event.target.value
    })
}
inputCostMin = (event) => {
    this.setState({
        costMin: event.target.value
    })
}
inputCostMax = (event) => {
    this.setState({
        costMax : event.target.value
    })
}
search = (e) => {
    this.setState({
        search : e.target.value
    })
}
searchButton = () => {
    if(this.state.search.length >4){
        return (
            <Link className="btn btn-secondary" to={{pathname: "/home/items/min_price=all/max_price=all/min_area=all/max_are=all/sale_method=all/username=all/search="+this.state.search+"/per_page=10/page=1"}} ><i className="fa fa-search" /></Link>
        )
    } else {
        return (
            <div>
             <Link className="btn btn-secondary disabled"  ><i className="fa fa-search" /></Link>
            </div>
        )
    }
}
inputError = () =>{
    if (this.state.search.length <4 && this.state.search != "") {
        return (
            <p style={{color:'red',display:'inline'}}>Input must be longer than 4</p>
        )
    }
}
setParams = (event) => {
    this.setState({[event.target.name] : event.target.value})
  }
    render() {
        return (
            <div style={{margin:'30px'}}>
                <div className="container" style={{marginBottom:'20px'}}>
                <div className="input-group">
        <input type="text" className="form-control" placeholder="Search" onChange={this.search} />
        <div className="input-group-append">
        {this.searchButton()}
         
        </div>
        
      </div>
      {this.inputError()}
                </div>
              
      <div className="container" style={{backgroundColor:'white',paddingTop:'50px',paddingLeft:'40px',paddingRight:'40px',paddingBottom:'20px',borderRadius:'15px',boxShadow:'0 0.125rem 0.3125rem rgb(0 0 0 / 30%)'}}>
          <div className="row">
              <div className="col-lg-12">
             
        <div className="form-row">
          <div className="col">
             <select className="form-control" name="city" onChange={(event) => this.changeCity(event)} >
             <option value={0}>City</option>
             {
                
                this.state.cities.map((city) => {
                    return (
                        
                        <option value={city.id} >{city.name}</option>
                    )
                })
             }
             </select>
        </div>
        <div className="col">
             <select className="form-control" name="district" onChange={(event) => this.changeDistrict(event)}>
             <option value={0}>District</option>
             {
                this.state.districts.map((district) => {
                    
                        return (
                            <option value={district.id}>{district.name}</option>
                        )
                    
                })
             }
             </select>
        </div>
        <div className="col">
             <select className="form-control" onChange={(event) => this.changeWard(event)}>
             <option value={0}>Ward</option>
             {
                this.state.wards.map((ward) => {
                    
                        return (
                            <option value={ward.id}>{ward.name}</option>
                        )
                    
                })
             }
             </select>
        </div>
        </div>
        <div className="form-row" >
            <div className="col-4" style={{paddingTop:'55px'}}>
                
            <select name="sale_method"  className="form-control" onChange={this.setParams}>
          <option value="">Sale method</option>
        <option value="for_sale">Sale</option>
        <option value="for_rent">Rent</option>
      </select>
            </div>
            <div className="col-lg-4" style={{paddingTop:'35px'}}>
            <div className='container' style={{justifyContent:'center',fontFamily:'inherit',width:'85%',marginBottom:'5px'}}>
                <div className="row" >
                <div className="col-lg-5" style={{justifyContent:'center',fontFamily:'inherit',padding:'0'}}>Khoảng giá {"(tỷ)"}</div>
                <div className="col-lg-3" style={{padding:'0'}}>
                    <input type='text' style={{width:'90%',height:'80%'}} onChange={(event) => this.inputCostMin(event)} value={this.state.costMin}/>
                </div>
                <div className="col-lg-1" style={{justifyContent:'center',fontFamily:'inherit',padding:'0'}}>-</div>
                <div className="col-lg-3 " style={{padding:'0'}}>
                <input type='text' style={{width:'90%',height:'80%'}} onChange={(event) => this.inputCostMax(event)} value={this.state.costMax}/>
                </div>
                </div>
               
            </div>
            <div className='row' style={{justifyContent:'center'}}>
                    <div className='col-lg-10' >
                    <Nouislider 
                    range={{ min: 1, max: 20001 }}
                    start={[1, 20001]} connect
                    step = {100}
                    
                    onSlide = {(render, handle, value, un, percent) => this.onSlideCost(render, handle, value, un, percent)} />
                </div>
                </div>
                
            </div>
            <div className="col-lg-4" style={{paddingTop:'35px'}}>
            <div className='container' style={{justifyContent:'center',fontFamily:'inherit',width:'85%',marginBottom:'5px'}}>
                <div className="row" >
                <div className="col-lg-5" style={{justifyContent:'center',fontFamily:'inherit',padding:'0'}}>Diện tích {"(m2)"}</div>
                <div className="col-lg-3" style={{padding:'0'}}>
                    <input type='text' style={{width:'90%',height:'80%'}} onChange={(event) => this.inputSMin(event)} value={this.state.SMin}/>
                </div>
                <div className="col-lg-1" style={{justifyContent:'center',fontFamily:'inherit',padding:'0'}}>-</div>
                <div className="col-lg-3 " style={{padding:'0'}}>
                <input type='text' style={{width:'90%',height:'80%'}} onChange={(event) => this.inputSMax(event)} value={this.state.SMax}/>
                </div>
                </div>
               
            </div>
                <div className='row' style={{justifyContent:'center'}}>
                    <div className='col-lg-10'>
                   
                    <Nouislider 
                    range={{ min: 1, max: 501 }}
                    start={[1, 501]} connect
                    step = {10}
                    
                    onSlide = {(render, handle, value, un, percent) => this.onSlideS(render, handle, value, un, percent)} />
                </div>
                </div>
                
            </div>
          
        
        </div>
        
      

              </div>
        
          </div>
          <div className="">      
          <Button variant="contained" style={{marginTop:'40px', left:'87%'}} startIcon={<SearchIcon />}>
          <Link style={{color:'white'}} 
          to={{pathname: "/home/items/min_price="+this.state.costMin+"/max_price="+this.state.costMax+"/min_area="+this.state.SMin+"/max_are="+this.state.SMax+"/sale_method="+this.state.sale_method+"/username=all/search="+this.state.search+"/per_page=10/page=1/"}} >Search</Link>
            </Button>
</div>
      </div>
            </div>
        )
    }
}
