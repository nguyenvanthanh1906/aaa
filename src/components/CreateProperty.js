import React, { Component } from 'react';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import instance from './instance';
import axios from 'axios';
import {LoadScript , GoogleMap , Marker} from "@react-google-maps/api";
import CreateMedia from './CreateMedia';
import { Button, Modal } from 'react-bootstrap';
import Media from './Media';
import ModalMedia from './ModalMedia';
import baseURL from './baseURL';
import { createHashHistory, createBrowserHistory } from "history";

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
          description: "" ,
          sale_method : "",
          title : "",
          lat : "",
          lng : "",
          price : "",
          files: {},
          upload : false,
          media : [],
          fail : false,
          success : false
        };
      }
    changeDescription  = (editorState) => {
      var content = draftToHtml(editorState)
    this.setState({
      contentState : content,
    });
  };
  handleClose = () => {
    this.setState({success:false})
    const history = createBrowserHistory();
    history.replace("/home");
    history.go()
    
  }
  handleClose2 = () => {
    this.setState({fail:false})
   
    
  }
  create = () => {
    const formData = new FormData();
    for (let i = 0; i < this.state.files.length; i++) {
        formData.append(`files`, this.state.files[i])
    }
   
    console.log(formData)
    instance.post("api/v1/media", 
       
        formData
    ,)
    .then(res => { 
      const slug = []
     res.data.map((d)=>{
      slug.push(d.slug)
     }) 
     console.log(slug)
     instance.post("api/v1/properties", {
      "sale_method": this.state.sale_method,
      "details": {
          "media" : slug,
          "title": this.state.title,
          "description": this.state.description,
          "price":Number(this.state.price),
          "coordinate": {
              "latitude": this.state.lat,
              "longitude": this.state.lng          
            }
      }
    }, { method: 'POST'})
    .then(res1 => { 
     console.log(res1.data)
     
     this.setState({success :true})
   
    })
   
    .catch(error1 => {
      console.log('error', error1)
      this.setState({fail :true})
    });
    })
   
    .catch(error => {
      console.log('error', error)
      this.setState({fail :true})
    });
    
}
setParams = (event) => {
  this.setState({[event.target.name] : event.target.value})
}
setData = (e) => {
  this.setState({files:e.target.files})
}
upload=()=>{
  this.setState({
    upload : !this.state.upload
  })
}
choiceMedia = () => {
  if(localStorage.media){
      var media = localStorage.media;
      media = media.split(',')
      
      media.map((m)=>{
          return (
              <div className="" style={{textAlign:'center',backgroundColor:'white', margin:'26px',width:'140px',height:'140px',objectFit:'cover'}} >
            


              <img style={{cursor:"pointer",objectFit:'cover',width:'100%',height:'100%'}}  src={baseURL+"api/v1/media/"+m} alt="" />
              
            <br></br>
          </div>   
          )
      })
    }
}
    render() {
        return (
            <div>
                 
        <div className="form-group">
          <label style={{fontWeight : 'bold'}}>Title</label>
          <input type="text" className="form-control" name="title" onChange={this.setParams}/>
        </div>
        <div className="form-group">
          <label style={{fontWeight : 'bold'}}>Price</label>
          <input type="text" className="form-control" name="price" onChange={this.setParams}/>
        </div>
        <div className="form-group">
        <label style={{fontWeight : 'bold'}}>Media</label>

        
        
         
          <div>
            <button onClick={()=>{this.setState({upload: !this.state.upload})}}>
          Upload from my media
          </button> 
          <input type="file" id="files" name="files" multiple onChange={this.setData} ></input>

          </div>
                   
           <div>
         <Modal show={this.state.upload} >
                               
                                
                               <ModalMedia ></ModalMedia>
                               {this.choiceMedia()}

                               <Modal.Footer>
                               <Button onClick={this.upload}>
                                   Close
                               </Button>
                               </Modal.Footer>
                           </Modal>
        </div>
        
          <br /><br />
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
          <textarea type="text" className="form-control" name="description" style={{height:'300px'}} onChange={this.setParams} defaultValue={this.state.description}/>

          
        </div>
        
        <button  className="btn btn-primary" onClick={this.create}>Submit</button>
        <Modal show={this.state.success} >
        <Modal.Header >
          <Modal.Title>Successfully</Modal.Title>
        </Modal.Header>
        <Modal.Body><img   src="/assets/svg/success.png" alt="" /></Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" onClick={this.handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
        <Modal show={this.state.fail} >
        <Modal.Header >
          <Modal.Title>Fail</Modal.Title>
        </Modal.Header>
        <Modal.Body><img   src="/assets/svg/fail.png" alt="" /></Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" onClick={this.handleClose2}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
            </div>
        );
    }
}

