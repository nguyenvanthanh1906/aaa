import React, { Component } from 'react'
import {LoadScript , GoogleMap , Marker} from "@react-google-maps/api";
const containerStyle = {
    width: "100%",
    height: "400px"
  };
  
  const center = {
    lat: -3.745,
    lng: -38.523
  };
export default class Item extends Component {
   
    render() {
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
        <ol className="carousel-indicators">
          <li data-target="#carouselExampleIndicators" data-slide-to={0} className="active" />
          <li data-target="#carouselExampleIndicators" data-slide-to={1} />
          <li data-target="#carouselExampleIndicators" data-slide-to={2} />
        </ol>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img style={{borderRadius : '20px'}}className="d-block w-100" src="data:image/jpeg;base64,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" alt="First slide" />
          </div>
          <div className="carousel-item">
            <img style={{borderRadius : '20px'}} className="d-block w-100" src="data:image/jpeg;base64,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" alt="Second slide" />
          </div>
          <div className="carousel-item">
            <img style={{borderRadius : '20px'}} className="d-block w-100" src="data:image/jpeg;base64,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" alt="Third slide" />
          </div>
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
              <h3>Nhà 2,450 triệu. Ở Hiệp Thành 13. Ngay chợ Hiệp Thành. Gần ngay Nguyễn Ảnh Thủ</h3>
          </div>
          <br />
          <div className='container'>
          <div className="row" style={{padding:'25px',backgroundColor:'white',boxShadow: '0 0.125rem 0.3125rem rgb(0 0 0 / 30%)',borderRadius : '10px',fontFamily:'"Roboto", sans-serif'}}>
          
            <div className="col-lg-4" >
            
                <div ><i className="fas fa-home" style={{fontSize:'2.5rem',marginRight:'10px',color:'#1abc9c'}} />Diện tích</div>
                <div  ><h4>50m vuông</h4></div>
                
            </div>
            <div className="col-lg-4">
            
            <div ><i className="fas fa-hand-holding-usd" style={{fontSize:'2.5rem',marginRight:'10px',color:'#1abc9c'}}></i>Mức giá</div>
                <div  ><h4>3 tỷ</h4></div>
               
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
         Nhà sổ riêng 1/ HT13, Hiệp Thành Q12.<br /> Ra chợ Hiệp Thành 2 phút.
        Dt đất 41,7m2, nhà cấp 4.<br /> Trên có 2 phòng ngủ Có 2pn, 2 vệ sinh, 2 nhà kho.<br /> Có sân để xe máy.<br />
        Phía sau nhà là sân bóng nên mở cửa sổ rất mát.<br />
        Tiện ích: gần chợ, trường học, siêu thị<br />
        Giá: 2.45 tỷ.<br />
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
            </div>
          </div>
          <br/>
          <h5><i class="fas fa-map-marked-alt" style={{fontSize:'2.5rem',marginRight:'15px',color:'#1abc9c'}}></i>Xem trên bản đồ</h5>
          <LoadScript
        googleMapsApiKey="AIzaSyCLI3UgEHdIQE_jWywJ8fkGoPHXK_EzsK4"
        libraries={["drawing","geometry"]}
        
      >
      <GoogleMap
        id="drawing-manager-example"
        mapContainerStyle={containerStyle}
        zoom={18}
        center={center}
        //options={{ gestureHandling: "greedy"}}
  >
   
    
  </GoogleMap>
       
      </LoadScript>
      </div>
      <div className='col-lg-3 vertical-menu' style={{}}>
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
