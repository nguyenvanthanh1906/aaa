import React, { Component } from 'react'
import {LoadScript , GoogleMap , Marker} from "@react-google-maps/api";
import instance from './instance';
import Parser from 'html-react-parser';
import { Button, Modal } from 'react-bootstrap';
import baseURL from './baseURL'
import { createHashHistory } from "history";
const containerStyle = {
    width: "100%",
    height: "400px"
  };
  
 

  
export default class Item extends Component {
  constructor(props)
    {
        super(props)
        this.state = {
          "title" : "",
          "description" : "",
          "lat" : 0,
          "lng" : 0,
          "companyProfile" : false,
          "company_address" : "",
          "company_email" : "",
          "company_phone" : "",
          "company_full_name" : "",
          "user" : "",
          "media" : []
        }
    }
   componentDidMount() {
    var property = this.props.property
console.log(baseURL)
    instance.get("api/v1/properties/" + property, {

    })
        .then(res => { console.log(res.status)
         
            this.setState({
              title : res.data.details.title,
              description : res.data.details.description,
              lat:res.data.details.coordinate.latitude, 
              lng:res.data.details.coordinate.longitude,
              company_address : res.data.company?.address,
              company_email : res.data.company?.email,
              company_phone : res.data.company?.phone,
              company_full_name : res.data.company?.full_name,
              user : res.data.company?.user,
              media : res.data.details.media,
              area :res.data.details.area,
              price : res.data.details.price,
            })
            
         
         
        })
       
        .catch(error => {
          console.log('error', error)
          window.location.replace("/Not Found");
        }); 
  }
    showProfileCompany = () => {
      this.setState({
        companyProfile : !this.state.companyProfile
      })
    }
    caro = (d,index) => {
      if(index==0){
        return (
          <div className="carousel-item active" >
          <img style={{borderRadius : '20px',width:"auto",objectFit: 'cover',height:'auto'}}className="d-block w-100" src={baseURL+"api/v1/media/"+d.slug} alt=""  />
        </div>
        )
      } else {
        return (
          <div className="carousel-item ">
          <img style={{borderRadius : '20px',width:"auto",objectFit: 'cover'}}className="d-block w-100" src={baseURL+"api/v1/media/"+d.slug} alt=""  />
        </div>
        )
      }
    }
    render = () => {
        return (
            <div className="container-fluid " style={{marginTop:'150px'}} >
              <div className=" row">
                <div className="col-lg-2" >
                <div className="container" style={{marginTop:'550px'}}>
        
                <div className="card" style={{width: '100%'}}>
        <img className="card-img-top" src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22286%22%20height%3D%22180%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%230%200%20286%20180%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_1784b427b6e%20text%30%7B%20fill%3Argba(255%2C255%2C255%2C.75)%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A14pt%30%7D%30%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_1784b427b6e%22%3E%3Crect%20width%3D%22286%22%20height%3D%22180%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22107.1953125%22%20y%3D%2296.3%22%3E286x180%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" alt="Card image cap" />
        <div className="card-body">
          <p className="card-title"><i class="fas fa-envelope" style={{fontSize:'1rem',marginRight:'10px',color:'#1abc9c'}}></i>abc@gmail.com</p>
          <p className="card-text"><i class="fas fa-phone" style={{fontSize:'1rem',marginRight:'10px',color:'#1abc9c'}}></i>0522812101</p>
          
        </div>
      </div>

              </div>
                </div>
                <div className="col-lg-7" style={{width:'60%'}}>
                <div id="carouselExampleIndicators" className="carousel slide " data-ride="carousel"  >
       
        <div className="carousel-inner" style={{borderRadius : '20px',width:'100%', height:'500px'}}> 
          {
            this.state.media.map((d,index)=> {
              return (
                this.caro(d,index)
              )
            })
          }
         
         
        </div>
        <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="sr-only">Previous</span>
        </a>
        <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="sr-only">Next</span>
        </a>
      </div>
      
      <br />
          <div >
              <h3>{this.state.title}</h3>
          </div>
          <br />
          <div className='container'>
          <div className="row" style={{padding:'25px',backgroundColor:'white',boxShadow: '0 0.125rem 0.3125rem rgb(0 0 0 / 30%)',borderRadius : '10px',fontFamily:'"Roboto", sans-serif'}}>
          
            <div className="col-lg-4" >
            
                <div ><i className="fas fa-home" style={{fontSize:'2.5rem',marginRight:'10px',color:'#1abc9c'}} />Diện tích</div>
                <div  ><h4>{this.state.area}m vuông</h4></div>
                
            </div>
            <div className="col-lg-4">
            
            <div ><i className="fas fa-hand-holding-usd" style={{fontSize:'2.5rem',marginRight:'10px',color:'#1abc9c'}}></i>Mức giá</div>
                <div  ><h4>{this.state.price} triệu</h4></div>
               
            </div>
            <div className="col-lg-4">
            
            <div ><i className="fas fa-bed" style={{fontSize:'2.5rem',marginRight:'10px',color:'#1abc9c'}}></i>Phòng ngủ</div>
                <div  ><h4>3 phòng ngủ</h4></div>
               
            </div>
           
            
           
          </div>
          </div>
          <div >
          <br />
              <div  >
                <h5><i class="fas fa-hand-point-right" style={{fontSize:'2.5rem',marginRight:'15px',color:'#1abc9c'}}></i>Thông tin mô tả</h5>
              </div>
            <div style={{fontFamily:'"Roboto", sans-serif'}} className='container'>
              {(this.state.description)}
            </div>
          </div>
          <div >
          <br />
            <div>
                <h5> <i class="fas fa-info-circle" style={{fontSize:'2.5rem',marginRight:'15px',color:'#1abc9c'}}></i>Thông tin chi tiết</h5>
            </div>
            <div style={{borderRadius : '10px',boxShadow: '0 0.125rem 0.3125rem rgb(0 0 0 / 30%)',backgroundColor:'white',fontFamily:'"Roboto", sans-serif'}} className="container">
                <div className="row">
                   <div className="col-lg-3" style={{fontWeight:'bold',margin:'13px'}}>Loại tin đăng</div>
                   <div className="col-lg-7"  style={{margin:'13px'}}>Tin bán nhà</div>
                </div>
                <div className="row">
                   <div className="col-lg-3" style={{fontWeight:'bold',margin:'13px'}}>Mặt tiền</div>
                   <div className="col-lg-7"  style={{margin:'13px'}}>35m</div>
                </div>
                <div className="row">
                   <div className="col-lg-3" style={{fontWeight:'bold',margin:'13px'}}>Hướng đất</div>
                   <div className="col-lg-7"  style={{margin:'13px'}}>Nam</div>
                </div>
                <div className="row">
                   <div className="col-lg-3" style={{fontWeight:'bold',margin:'13px'}}>Số tầng</div>
                   <div className="col-lg-7"  style={{margin:'13px'}}>3 tầng</div>
                </div>
                <div className="row">
                   <div className="col-lg-3" style={{fontWeight:'bold',margin:'13px'}}>Số phòng ngủ</div>
                   <div className="col-lg-7" style={{margin:'13px'}}>3 phòng</div>
                </div>
                <div className="row">
                   <div className="col-lg-3" style={{fontWeight:'bold',margin:'13px'}}>Người đăng</div>
                   <div className="col-lg-7" style={{margin:'13px'}}><a style={{cursor: 'pointer', textDecorationLine : 'underline'}} onClick = {this.showProfileCompany}>{this.state.user}</a></div>
                </div>
            </div>
          </div>
          <br/>
          <Modal show={this.state.companyProfile} >
        <Modal.Header >
          <Modal.Title>Company Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="row">
                   <div className="col-lg-3" style={{fontWeight:'bold',margin:'13px'}}>Tên công ty</div>
                   <div className="col-lg-7"  style={{margin:'13px'}}>{this.state.company_full_name}</div>
                </div>
                <div className="row">
                   <div className="col-lg-3" style={{fontWeight:'bold',margin:'13px'}}>Số điện thoai</div>
                   <div className="col-lg-7"  style={{margin:'13px'}}>{this.state.company_phone}</div>
                </div>
                <div className="row">
                   <div className="col-lg-3" style={{fontWeight:'bold',margin:'13px'}}>Email</div>
                   <div className="col-lg-7" style={{margin:'13px'}}>{this.state.company_email}</div>
                </div>
                <div className="row">
                   <div className="col-lg-3" style={{fontWeight:'bold',margin:'13px'}}>Địa chỉ</div>
                   <div className="col-lg-7" style={{margin:'13px'}}>{this.state.company_address}</div>
                </div>
        </Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" onClick={this.showProfileCompany}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
          <h5><i class="fas fa-map-marked-alt" style={{fontSize:'2.5rem',marginRight:'15px',color:'#1abc9c'}}></i>Xem trên bản đồ</h5>
          {
            this.state.lat
            ?  <LoadScript
        googleMapsApiKey="AIzaSyCLI3UgEHdIQE_jWywJ8fkGoPHXK_EzsK4"
        libraries={["drawing","geometry"]}
        
      >
      <GoogleMap
        id="drawing-manager-example"
        mapContainerStyle={containerStyle}
        zoom={14}
        center ={{lat:Number(this.state.lat), lng :Number(this.state.lng)}}
        //options={{ gestureHandling: "greedy"}}
  >
    <Marker
       
       position={{lat:Number(this.state.lat), lng :Number(this.state.lng)}}
      >
     </Marker>
    
  </GoogleMap>
       
      </LoadScript>
      
      : <p></p>
          }
         <br></br>
         <br></br>
      </div> <div className='col-lg-3 vertical-menu' style={{}}>
        <div>
          <h5><i class="fas fa-map-marker-alt" style={{fontSize:'2.5rem',marginRight:'10px',color:'#1abc9c'}}></i>Bất động sản lân cận</h5>
        </div>
      <div className='' style={{width:'80%',borderRadius : '10px',boxShadow: '0 0.125rem 0.3125rem rgb(0 0 0 / 30%)',backgroundColor:'white',fontFamily:'"Roboto", sans-serif'}}>
      <a  href="#">Separated link</a>
      <a  href="#">Separated link</a>
      <a  href="#">Separated link</a>
      <a  href="#">Separated link</a>
      <a  href="#">Separated link</a>
      <a  href="#">Separated link</a>
      <a  href="#">Separated link</a>
      </div>
      
      </div>
     
                   <br/>
            </div>
            </div>
        )
    }
}
