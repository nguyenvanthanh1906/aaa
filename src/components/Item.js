import React, { Component } from 'react'
import { LoadScript, GoogleMap, Marker } from "@react-google-maps/api";
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
    constructor(props) {
        super(props)
        this.state = {
            "title": "",
            "description": "",
            "lat": 0,
            "lng": 0,
            "companyProfile": false,
            "company_address": "",
            "company_email": "",
            "company_phone": "",
            "company_full_name": "",
            "user": "",
            "media": [],
            "area":'',
            "price":'',
            "sale_method":''
        }
    }
    componentDidMount() {
        var property = this.props.property

        instance.get("api/v1/properties/" + property, {

        })
            .then(res => {
                console.log(res)

                this.setState({
                    title: res.data.details?.title,
                    description: res.data.details?.description,
                    lat: res.data.details.coordinate?.latitude,
                    lng: res.data.details.coordinate?.longitude,
                    company_address: res.data.company?.address,
                    company_email: res.data.company?.email,
                    company_phone: res.data.company?.phone,
                    company_full_name: res.data.company?.full_name,
                    user: res.data.company?.user.username,
                    media: res.data.details.media,
                    area: res.data.details.area,
                    price: res.data.details.price,
                    sale_method: res.data.sale_method,
                })



            })

            .catch(error => {
                console.log('error', error)

            });
    }
    showProfileCompany = () => {
        this.setState({
            companyProfile: !this.state.companyProfile
        })
    }
    caro = (d, index) => {
        if (index == 0) {
            return (
                <div className="carousel-item active" key={index}>
                    <img style={{ borderRadius: '10px', width: "auto", objectFit: 'cover', height: 'auto' }} className="d-block w-100" src={baseURL + "api/v1/media/" + d.slug} alt="" />
                </div>
            )
        } else {
            return (
                <div className="carousel-item " key={index}>
                    <img style={{ borderRadius: '10px', width: "auto", objectFit: 'cover' }} className="d-block w-100" src={baseURL + "api/v1/media/" + d.slug} alt="" />
                </div>
            )
        }
    }
    render = () => {
        return (
            <div className="container " style={{ marginTop: '150px' }} >
                <div className=" row">
                    
                    <div className="col-lg-12" style={{ width: '60%' }}>
                        <div id="carouselExampleIndicators" className="carousel slide " data-ride="carousel"  >

                            <div className="carousel-inner" style={{ borderRadius: '10px', width: '100%', height: '500px' }}>
                                {
                                    this.state.media.map((d, index) => {
                                        return (
                                            this.caro(d, index)
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
                            <div className="row" style={{ padding: '25px', backgroundColor: 'white', boxShadow: '0 0.125rem 0.3125rem rgb(0 0 0 / 30%)', borderRadius: '10px', fontFamily: '"Roboto", sans-serif' }}>

                                <div className="col-lg-4" >

                                    <div ><i className="fas fa-home" style={{ fontSize: '2.5rem', marginRight: '10px', color: '#1abc9c' }} />Diện tích</div>
                                    <div  ><h4>{this.state.area}m vuông</h4></div>

                                </div>
                                <div className="col-lg-4">

                                    <div ><i className="fas fa-hand-holding-usd" style={{ fontSize: '2.5rem', marginRight: '10px', color: '#1abc9c' }}></i>Mức giá</div>
                                    <div  ><h4>{this.state.price} triệu</h4></div>

                                </div>
                                <div className="col-lg-4">

                                    <div ><i className="fas fa-bed" style={{ fontSize: '2.5rem', marginRight: '10px', color: '#1abc9c' }}></i>Phòng ngủ</div>
                                    <div  ><h4>Đang cập nhật...</h4></div>

                                </div>



                            </div>
                        </div>
                        <div >
                            <br />
                            <div  >
                                <h5><i class="fas fa-hand-point-right" style={{ fontSize: '2.5rem', marginRight: '15px', color: '#1abc9c' }}></i>Thông tin mô tả</h5>
                            </div>
                            <div style={{ fontFamily: '"Roboto", sans-serif' }} className='container'>
                                {(this.state.description)}
                            </div>
                        </div>
                        <div >
                            <br />
                            <div>
                                <h5> <i class="fas fa-info-circle" style={{ fontSize: '2.5rem', marginRight: '15px', color: '#1abc9c' }}></i>Thông tin chi tiết</h5>
                            </div>
                            <div style={{ borderRadius: '10px', boxShadow: '0 0.125rem 0.3125rem rgb(0 0 0 / 30%)', backgroundColor: 'white', fontFamily: '"Roboto", sans-serif' }} className="container">
                                <div className="row">
                                    <div className="col-lg-3" style={{ fontWeight: 'bold', margin: '13px' }}>Loại tin đăng</div>
                                    <div className="col-lg-7" style={{ margin: '13px' }}>{this.state.sale_method}</div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-3" style={{ fontWeight: 'bold', margin: '13px' }}>Mặt tiền</div>
                                    <div className="col-lg-7" style={{ margin: '13px' }}>35m</div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-3" style={{ fontWeight: 'bold', margin: '13px' }}>Hướng đất</div>
                                    <div className="col-lg-7" style={{ margin: '13px' }}>Nam</div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-3" style={{ fontWeight: 'bold', margin: '13px' }}>Số tầng</div>
                                    <div className="col-lg-7" style={{ margin: '13px' }}>3 tầng</div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-3" style={{ fontWeight: 'bold', margin: '13px' }}>Số phòng ngủ</div>
                                    <div className="col-lg-7" style={{ margin: '13px' }}>3 phòng</div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-3" style={{ fontWeight: 'bold', margin: '13px' }}>Người đăng</div>
                                    <div className="col-lg-7" style={{ margin: '13px' }}><a style={{ cursor: 'pointer', textDecorationLine: 'underline' }} onClick={this.showProfileCompany}>{this.state.user}</a></div>
                                </div>
                            </div>
                        </div>
                        <br />
                        <Modal show={this.state.companyProfile} >
                            <Modal.Header >
                                <Modal.Title>Company Profile</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <div className="row">
                                    <div className="col-lg-3" style={{ fontWeight: 'bold', margin: '13px' }}>Tên công ty</div>
                                    <div className="col-lg-7" style={{ margin: '13px' }}>{this.state.company_full_name}</div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-3" style={{ fontWeight: 'bold', margin: '13px' }}>Số điện thoai</div>
                                    <div className="col-lg-7" style={{ margin: '13px' }}>{this.state.company_phone}</div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-3" style={{ fontWeight: 'bold', margin: '13px' }}>Email</div>
                                    <div className="col-lg-7" style={{ margin: '13px' }}>{this.state.company_email}</div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-3" style={{ fontWeight: 'bold', margin: '13px' }}>Địa chỉ</div>
                                    <div className="col-lg-7" style={{ margin: '13px' }}>{this.state.company_address}</div>
                                </div>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={this.showProfileCompany}>
                                    Close
                                </Button>
                            </Modal.Footer>
                        </Modal>
                        <h5><i class="fas fa-map-marked-alt" style={{ fontSize: '2.5rem', marginRight: '15px', color: '#1abc9c' }}></i>Xem trên bản đồ</h5>
                        {
                            this.state.lat
                                ? <LoadScript
                                    googleMapsApiKey="AIzaSyCLI3UgEHdIQE_jWywJ8fkGoPHXK_EzsK4"
                                    libraries={["drawing", "geometry"]}

                                >
                                    <GoogleMap
                                        id="drawing-manager-example"
                                        mapContainerStyle={containerStyle}
                                        zoom={14}
                                        center={{ lat: Number(this.state.lat), lng: Number(this.state.lng) }}
                                    //options={{ gestureHandling: "greedy"}}
                                    >
                                        <Marker

                                            position={{ lat: Number(this.state.lat), lng: Number(this.state.lng) }}
                                        >
                                        </Marker>

                                    </GoogleMap>

                                </LoadScript>

                                : <p></p>
                        }
                        <br></br>
                        <br></br>
                    </div> 

                    <br />
                </div>
            </div>
        )
    }
}
