import React, { Component } from "react";
import {LoadScript , GoogleMap , Marker} from "@react-google-maps/api";
import { DrawingManager } from "@react-google-maps/api";
import { InfoWindow } from '@react-google-maps/api';
import { Circle } from '@react-google-maps/api'
import instance from './instance';
import baseURL from './baseURL'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
  useRouteMatch
} from "react-router-dom";
import LeftList from "./LeftList";
import DeleteIcon from '@material-ui/icons/Delete';
import { Button } from '@material-ui/core';
import './search.css';

const containerStyle = {
  width: "100%",
  height: "650px",
};



  
export default class BanDo extends Component {
  constructor(props){
    super(props)
    this.state = {
     position : [],
     isOpen: [],
     polygon : "",
     center : {lat: 16.060703728139814,lng: 108.21825236567476},
    }
  }  
 
  componentDidMount() {
    var list = []
    this.state.position.map((marker,i) => {
      list.push(false)
    })
    this.setState({
      isOpen : list
    })
  }
  
  handleMarkerClick = (i) => {
    var list1 = this.state.isOpen
    
    list1[i] = !list1[i]
    console.log(i)
    this.setState({
      isOpen : list1
    })
  }

  deletePoly = () => {
    if(this.state.polygon)
    {
      this.state.polygon.setMap(null)
    this.setState({
      polygon : null,
      position : []
    })
    }
    
  }

 polygonsArray = []
  render() {
    return (
      <div className="row">
      <div className="col-9">
      <LoadScript
        googleMapsApiKey="AIzaSyCLI3UgEHdIQE_jWywJ8fkGoPHXK_EzsK4"
        libraries={["drawing","geometry"]}
      >
        <div style={{position:"relative",top:"75px",zIndex:"1",width:'50px'}}>
      <Button variant="contained" color="error"  style={{marginLeft:'5px', paddingTop:'2px',paddingBottom:'2px',paddingRight:'0px',paddingLeft:'0px', minWidth: '45px',outline:'none'}}   onClick={() => this.deletePoly()}><DeleteIcon />
      </Button>
       </div>
      <GoogleMap
        id=" ts-map-hero"
        mapContainerStyle={containerStyle}
        zoom={16}
        center={this.state.center}
        //options={{ gestureHandling: "greedy"}}
  >
    {
      this.state.position.map((marker,i) => {
        return (
          <Marker
            key={i}
            id={i}
            position={{lat: Number(marker.details.coordinate.latitude), lng: Number(marker.details.coordinate.longitude)}}
            onClick={(ae) => this.handleMarkerClick(i)}
            icon={{
              url:'/assets/svg/vietnam.png',
              anchor: new window.google.maps.Point(5, 20),
            }}
           >
            {this.state.isOpen[i] && <InfoWindow 
             onCloseClick={(ae) => this.handleMarkerClick(i)}
             pixelOffset={{ width: 25, height: 25 }}
             zIndex={-1}
            position={{lat: marker.latitude, lng: marker.longitude}}><div id='info' style={{width: '125px', height:'110px'}}><Link to={{pathname: "/home/item/"+marker.slug}}>
              <img
                     src={marker.details.media[0] ? baseURL+"api/v1/media/"+marker.details.media[0].slug : 'https://noithatfuhome.com/wp-content/uploads/2018/08/06-3.jpg'}
                    class="img-fluid"
                    style={{borderRadius : '5px',width:"auto",objectFit: 'cover',height:'70px', aspectRatio: '1.77'}}
                    />
                    <p>{marker.details.title}</p>
              </Link></div></InfoWindow>}
          </Marker>
        )
      })
    }
    <DrawingManager
      onPolygonComplete={(polygon) => {
        var polygonBounds = polygon.getPath();
        var bounds = [];
        for (var i = 0; i < polygonBounds.length; i++) {
          var point = {
            lat: polygonBounds.getAt(i).lat(),
            lng: polygonBounds.getAt(i).lng()
          };
          bounds.push(point);
        }
        console.log(bounds);
        var stringPolygon = ""
        bounds.map((p,i) => {
          stringPolygon += "&coordinates[]=" + p.lat +","+ p.lng
          
        })
        stringPolygon = stringPolygon.slice(1,-1)
        console.log(stringPolygon)
        instance.get("/api/v1/properties?" + stringPolygon, {

        })
            .then(res => { var position1 = []
             res.data.map((p) => {
               position1.push(p)
             })
             this.setState({
               position : position1
             })
              console.log(position1)
            
            })
           
            .catch(error => {
              console.log('error', error.res)
              alert("fail")
            }); 
       if(this.state.polygon)
       {
         this.state.polygon.setMap(null)
         this.setState({
           polygon : null,
           position : []
         })
       }
        this.setState({
          polygon : polygon
        })
      }}
      options={{
        drawingControl: true,
        drawingControlOptions: {
      
          drawingModes: ["polygon"]
        },
        //polygonOptions: { editable: true , }
      }}

    />
  </GoogleMap>
       
      </LoadScript>
      </div>
      <div className="col-3">
<LeftList items={this.state.position}></LeftList>
      </div>
      </div>
    )
  }
}
