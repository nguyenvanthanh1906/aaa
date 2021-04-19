import React, { Component } from "react";
import {LoadScript , GoogleMap , Marker} from "@react-google-maps/api";
import { DrawingManager } from "@react-google-maps/api";
import { InfoWindow } from '@react-google-maps/api';
import { Circle } from '@react-google-maps/api'

var  position1 = [
  {
    lat: 37.772,
    lng: -122.214
  },
  {
    lat: 36.772,
    lng: -122.214
  },
  {
    lat: 35.772,
    lng: -122.214
  },
  {
    lat: 34.772,
    lng: -122.214
  },
  {
    lat: 33.772,
    lng: -122.214
  },
  {
    lat: 32.772,
    lng: -122.214
  }
  
]

const containerStyle = {
  width: "100%",
  height: "600px"
};


const onLoad = drawingManager => {
    console.log(drawingManager)
  }
  
 
  function getPaths(polygon){
    const coords = polygon.getPath().getArray().map(coord => {
      return {
        lat: coord.lat(),
        lng: coord.lng()
      }
    });
  
    //console.log(JSON.stringify(coords, null, 1));
   
    
  }
  
  
export default class BanDo extends Component {
  constructor(props){
    super(props)
    this.state = {
     position : position1,
     isOpen: [],
     polygon : "",
     center : {lat: 35.772,lng: -122.214},
     currentPosition : []
    }
  }  
  getPosition = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({
        center : {lat:position.coords.latitude, lng:position.coords.longitude},
        currentPosition : [{lat:position.coords.latitude, lng:position.coords.longitude}]
      })
     
    });
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
      position : position1,
      polygon : null
    })
    }
    
  }
ad
 polygonsArray = []
  render() {
    return (
     
      <LoadScript
        googleMapsApiKey="AIzaSyCLI3UgEHdIQE_jWywJ8fkGoPHXK_EzsK4"
        libraries={["drawing","geometry"]}
        
      >
        
        <div>
          <button onClick={() => this.deletePoly()}>Delete</button>
          <button onClick={() => this.getPosition()}>position</button>
       </div>
      <GoogleMap
        id=" ts-map-hero"
       
        mapContainerStyle={containerStyle}
        zoom={15}
        center={this.state.center}
        //options={{ gestureHandling: "greedy"}}
  >
    { 
    this.state.currentPosition.map((current,i) => {
      return (
        <div>
           <Marker
        key={i}
        id={i}
        position={{lat: current.lat, lng: current.lng}}
       >
      </Marker>
      <Circle
      
      
      center={{lat: current.lat, lng: current.lng}}
      
      radius = {500}
      options = {{strokeColor: '#FF0000',strokeOpacity: 0.5,fillColor: '#FF0000',fillOpacity: 0.1,}}
      
    
      
    ></Circle>
        </div>
       
      
      )
    })
  }
  
   
    {
      this.state.position.map((marker,i) => {
        return (
          <Marker
          
           
            key={i}
            id={i}
            position={{lat: marker.lat, lng: marker.lng}}
            onClick={(ae) => this.handleMarkerClick(i)}
            //icon={{
            //  url:'./assets/svg/icon-house.svg'
            //}}
           >
           
            {this.state.isOpen[i] && <InfoWindow 
             onCloseClick={(ae) => this.handleMarkerClick(i)}
             
            
             pixelOffset={{ width: 25, height: 25 }}
             zIndex={-1}
            position={{lat: marker.lat, lng: marker.lng}}><div id='info'><a href="./item">facebook</a></div></InfoWindow>}
          </Marker>
          
        
        )
        
      })
    }
    thanh3
    <DrawingManager
      onLoad={onLoad}
      onPolygonComplete={(polygon) => {
       if(this.state.polygon)
       {
         this.state.polygon.setMap(null)
         this.setState({
           polygon : null
         })
       }
      
        var position3 = []
        position1.map((p) => {
          if(window.google.maps.geometry.poly.containsLocation(new window.google.maps.LatLng(p.lat, p.lng),polygon))
          {
            position3.push(p)
          }
        })
        
      
        this.setState({
          position : position3,
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
     
    )
  }
}
