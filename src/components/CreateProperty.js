import React, { Component } from 'react';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import instance from './instance';
import axios from 'axios';
import {LoadScript , GoogleMap , Marker} from "@react-google-maps/api";
const containerStyle = {
  width: "100%",
  height: "650px"
};
const center = {
  lat: 16.060703728139814,lng: 108.21825236567476
};
export default class CreateProperty extends Component {
    constructor(props) {
        super(props);
        this.state = {
          contentState: "" ,
          sale_method : "",
          title : "",
          lat : "",
          lng : ""
        };
      }
    changeDescription  = (editorState) => {
      var content = draftToHtml(editorState)
    this.setState({
      contentState : content,
    });
  };

  create = () => {
    instance.post("api/v1/properties", {
      "sale_method": this.state.sale_method,
      "details": {
          "title": this.state.title,
          "description": this.state.contentState,
          "coordinate": {
              "latitude": this.state.lat,
              "longitude": this.state.lng          
            }
      }
    }, { method: 'POST'})
    .then(res => { 
     console.log(res.data)
    })
   
    .catch(error => {
      console.log('error', error)
      alert("fail")
    });
}
setParams = (event) => {
  this.setState({[event.target.name] : event.target.value})
}
    render() {
        return (
            <div>
                 
        <div className="form-group">
          <label style={{fontWeight : 'bold'}}>Title</label>
          <input type="text" className="form-control" name="title" onChange={this.setParams}/>
        </div>
        <div className="form-group">
          <label style={{fontWeight : 'bold'}}>Sale method</label>
          <select name="sale_method"  className="form-control" onChange={this.setParams}>
          <option >Sale method</option>
        <option value="for_sale">Sale</option>
        <option value="for_rent">Rent</option>
      </select>
        </div>
        <div className="form-group">
          <label style={{fontWeight : 'bold'}}>Position</label>
          <LoadScript
        googleMapsApiKey="AIzaSyCLI3UgEHdIQE_jWywJ8fkGoPHXK_EzsK4"
        libraries={["drawing","geometry"]}
      >
      <GoogleMap
        id="drawing-manager-example"
        mapContainerStyle={containerStyle}
        zoom={13}
        center={center}
        onClick={(e) => {
          this.setState({
            lat : e.latLng.lat(),
            lng : e.latLng.lng()
          })
        }}

        //options={{ gestureHandling: "greedy"}}
  >
   
   <Marker
       
        position={{ lat: this.state.lat,
          lng: this.state.lng}}
       >
      </Marker>
  </GoogleMap>
       
      </LoadScript>
        </div>
        <div className="form-group" >
          <label style={{fontWeight : 'bold'}}>Description</label>
          <textarea type="text" className="form-control" name="title" style={{height:'300px'}} onChange={this.setParams} defaultValue={this.state.description}/>

          
        </div>
        
        <button  className="btn btn-primary" onClick={this.create}>Submit</button>
      
    
            </div>
        );
    }
}

