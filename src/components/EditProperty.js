import React, { Component } from 'react';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import instance from './instance';
import axios from 'axios';
import {LoadScript , GoogleMap , Marker} from "@react-google-maps/api";
import Select from 'react-select'
import ModalMedia from './ModalMedia';
import baseURL from './baseURL';
import { Button, Modal } from 'react-bootstrap';
import { createHashHistory, createBrowserHistory } from "history";
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
            "all_sale_method" : "",
            "upload" : false,
          "media" : [],
          "fail" : false,
          "success" : false,
          files: {},
          area: "",
          price : ""
        };
      }
      componentWillMount() {
    localStorage.removeItem('media')
  }
  upload=()=>{
    this.setState({
      upload : !this.state.upload
    })
    if(localStorage.media) {
    this.setState({
      media : this.state.media.concat(localStorage.media.split(','))
    })
    localStorage.removeItem('media')
    } else {
      this.setState({
        media : this.state.media
      })
    }
  }
  setData = (e) => {
    this.setState({files:e.target.files})
  }
  deleteMedia  = (m) => {
    var imgs = []
    imgs = this.state.media;
    imgs.map((me, i)=>{
      if(me == m){
        imgs.splice(i,1)
      }
    })
    this.setState({
      media : imgs
    })

  }
  choiceMedia = (m) => {
  
    return (
        <div className="a" style={{borderRadius : '20px',width:"auto",objectFit: 'cover',height:'100px', aspectRatio: '1.77', margin :'5px'}} >
      


        <img style={{cursor:"pointer",objectFit:'cover',width:'100%',height:'100%'}}  src={baseURL+"api/v1/media/"+m} alt="" />
        <button className="btn btn-danger"  onClick={()=>{this.deleteMedia(m)}}>X</button>
      <br></br>
    </div>   
    )

}
handleClose = () => {
  this.setState({success:false})
  const history = createBrowserHistory();
  history.replace("/home");
  history.go()
  
}
handleClose2 = () => {
  this.setState({fail:false})
 
  
}
      componentDidMount() {
        var property = this.props.property
    
        instance.get("api/v1/properties/" + property, {
    
        })
            .then(res => { console.log(res.data.company)
              var media= [];
               res.data.details.media.map((m)=>{
                media.push(m.slug)
              })
              this.setState({
                title : res.data.details.title,
                description : res.data.details.description,
                lat:res.data.details.coordinate.latitude, 
                lng:res.data.details.coordinate.longitude,
                media:media,
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
  if(this.state.files.length > 0){
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
    
  instance.patch("/api/v1/properties/" + this.props.property, {
    "sale_method" : this.state.sale_method,
    "details": {
      "area" : Number(this.state.area), 
      "media" : slug.concat(this.state.media),
      "price":Number(this.state.price),
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

    }).catch(error => {
      console.log('error', error)
      this.setState({fail :true})
    });
    } else {
      instance.patch("/api/v1/properties/" + this.props.property, {
        "sale_method" : this.state.sale_method,
        "details": {
          "area" : Number(this.state.area), 
          "media" : this.state.media,
          "price":Number(this.state.price),
          "title": this.state.title,
          "description": this.state.description,
          "coordinate": {
              "latitude": this.state.lat,
              "longitude": this.state.lng
          }
        }
      }, { method: 'PATCH'})
      .then(res1 => { 
       console.log(res1.data)
       
       this.setState({success :true})
     
      })
     
      .catch(error1 => {
        console.log('error', error1)
        this.setState({fail :true})
      });
    }
}
    render() {
    
        return (
            <div>
                          
        <div className="form-group">
          <label style={{fontWeight : 'bold'}}>Title</label>
          <input type="text" className="form-control" name="title" onChange={this.setParams} defaultValue={this.state.title}/>
        </div>
        <div className="form-group">
          <label style={{fontWeight : 'bold'}}>Price (triệu đồng)</label>
          <input type="text" className="form-control" name="price" onChange={this.setParams}/>
        </div>
        <div className="form-group">
          <label style={{fontWeight : 'bold'}}>Area</label>
          <input type="text" className="form-control" name="area" onChange={this.setParams}/>
        </div>
        <div className="form-group">
        <label style={{fontWeight : 'bold'}}>Media</label>         
          <div>
            <button onClick={()=>{this.setState({upload: !this.state.upload})}}>
          Upload from my media
          </button> 
          <input type="file" id="files" name="files" multiple onChange={this.setData} ></input>
          <div style={{display:'flex'}}>
          {
            
              this.state.media.map((m )=> {
                return (
                  this.choiceMedia(m)
                )
                })
          }
          </div>
          </div>     
           <div>
         <Modal show={this.state.upload} >             
          <ModalMedia ></ModalMedia>
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

