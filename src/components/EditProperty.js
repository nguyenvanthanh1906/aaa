import React, { Component } from 'react';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import instance from './instance';
import axios from 'axios';
import {LoadScript , GoogleMap , Marker} from "@react-google-maps/api";
import Select from 'react-select'


const containerStyle = {
    width: "100%",
    height: "600px"
  };
  const center = {
    lat: -3.745,
    lng: -38.523
  };
 
  
export default class EditProperty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            "title" : "",
            "description" : "",
            "lat" : 0,
            "lng" : 0,
            "sale_method" : "",
            "all_sale_method" : ""
        };
      }
      componentDidMount() {
        var property = this.props.property
    
        instance.get("api/v1/properties/" + property, {
    
        })
            .then(res => { console.log(res.data.company)
              this.setState({
                title : res.data.details.title,
                description : res.data.details.description,
                lat:res.data.details.coordinate.latitude, 
                lng:res.data.details.coordinate.longitude,
                
                sale_method : res.data.sale_method
              })
               instance.get("api/v1/property-sale-methods" , {
    
            })
                .then(res => { 
                  var sale_method_array = []
                  res.data.data.map((s) => {
                    sale_method_array.push({ value: s.name, label: s.name})
                  })
                  this.setState({
                    all_sale_method : sale_method_array
                  })
                })
               
                .catch(error => {
                  console.log('error', error.res)
                  alert("fail")
                }); 
            })
           
            .catch(error => {
              console.log('error', error.res)
              alert("fail")
            }); 
           
      }
changeSaleMethod = (e) => {
this.setState({
  sale_method : e.value
})
}
setParams = (event) => {
  this.setState({[event.target.name] : event.target.value})
}
edit = () => {
  instance.patch("/api/v1/properties/" + this.props.property, {
    "sale_method" : this.state.sale_method,
    "details": {

     
      "address": "Đường Chơn Tâm 10, Hòa Khánh Nam, Liên Chiểu, Đà Nẵng",
      "title": this.state.title,
      "description": this.state.description,
      "coordinate": {
          "latitude": this.state.lat,
          "longitude": this.state.lng
      }
    }
  }, {method:"PATCH" })
      .then(res => { 
       this.setState({
         success : true,
         changeProfile : !this.state.changeProfile
       })
      })
     
      .catch(error => {
        
        alert("fail")
      }); 
}
    render() {
    
        return (
            <div>
                          
        <div className="form-group">
          <label style={{fontWeight : 'bold'}}>Title</label>
          <input type="text" className="form-control" name="title" onChange={this.setParams} defaultValue={this.state.title}/>
        </div>
        <div className="form-group">
          <label style={{fontWeight : 'bold'}}>Sale method</label>
          {
            this.state.all_sale_method
            ? <Select 
            options={this.state.all_sale_method}
            defaultValue={{value: this.state.sale_method, label: this.state.sale_method}}
            isSelected = {true}
            isSearchable = {false}
            selectValue = {{value: this.state.sale_method, label: this.state.sale_method}}
            onChange =  {this.changeSaleMethod }
            />
            :<p></p>
          }
           
         
          
        </div>
        <div className="form-group">
          <label style={{fontWeight : 'bold'}}>Position</label>
          {
            this.state.lat
         ? <LoadScript
        googleMapsApiKey="AIzaSyCLI3UgEHdIQE_jWywJ8fkGoPHXK_EzsK4"
        libraries={["drawing","geometry"]}
      >
      <GoogleMap
        id="drawing-manager-example"
        mapContainerStyle={containerStyle}
        zoom={12}
        center={{ lat: Number(this.state.lat),
          lng: Number(this.state.lng)}}
        onClick={(e) => {
          this.setState({
            lat : e.latLng.lat(),
            lng : e.latLng.lng()
          })
        }}

        //options={{ gestureHandling: "greedy"}}
  >
   
   <Marker
       
        position={{ lat: Number(this.state.lat),
          lng: Number(this.state.lng)}}
       >
      </Marker>
  </GoogleMap>
       
      </LoadScript>
      :<p></p>
    }
        </div>
        <div className="form-group" >
          <label style={{fontWeight : 'bold'}}>Description</label>
          <textarea type="text" className="form-control" name="description" onChange={this.setParams} defaultValue={this.state.description}/>

        
        
          
        </div>
        
        <button  className="btn btn-primary" onClick={this.edit}>Submit</button>
      
    
            </div>
        );
    }
}

