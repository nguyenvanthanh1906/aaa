import React, { Component } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
// Import Swiper styles
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import baseURL from './baseURL'
import instance from './instance';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
  useRouteMatch
} from "react-router-dom";
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

export default class Project extends Component {
  constructor(props){
    super(props)
    this.state = {
     "all_properties" : [],
      
    }
  }  
  componentDidMount() {
    var params = null;
  
     if(this.props.sale_method) {
        params = {
          sort_by: '-created_at',
            sale_method : this.props.sale_method,
            per_page : 10,
            page : 1
        }
        console.log(params)
    } 
   
    if(!this.props.sale_method ) {
        params = {
          sort_by: '-created_at',
            per_page : 10,
            page : 1
        }
        console.log(params)
    }
    instance.get("api/v1/properties", {
      sort_by: '-created_at',
        params : params
    })
        .then(res => { 
           
           this.setState({
               all_properties : res.data.result,
               
           })
        
        })
       
        .catch(error => {
          console.log('error', error.res)
          alert("fail")
        }); 
      }
    
  
  title = () => {
    if(this.props.sale_method == 'for_sale')
    {
      return (
        <div>
       <h2 className="page-section-heading text-center text-uppercase text-secondary mb-0" >Mua bán</h2>
        <div className="divider-custom">
            <div className="divider-custom-line" />
            <div className="divider-custom-icon"><i className="fas fa-star" /></div>
            <div className="divider-custom-line" />
          </div>
          
          <div className=" row" >
          <div className="float-right">
          <Link  style={{textDecoration:'none'}} to={{pathname:'/home/items/min_price=all/max_price=all/min_area=all/max_are=all/sale_method=for_sale/username=all/search=all/per_page=10/page=1'}}>Xem tất cả</Link>

          </div>
          </div>
        </div>
      )
    } if(this.props.sale_method == "for_rent") {
      return (
        <div>
        <h2 className="page-section-heading text-center text-uppercase text-secondary mb-0">Cho thuê</h2>
        <div className="divider-custom">
            <div className="divider-custom-line" />
            <div className="divider-custom-icon"><i className="fas fa-star" /></div>
            <div className="divider-custom-line" />
          </div>
          <div>
            <Link to={{pathname:'/home/items/min_price=all/max_price=all/min_area=all/max_are=all/sale_method=for_rent/username=all/search=all/per_page=10/page=1'}}>Xem tất cả</Link>
          </div>
        </div>
      )

    }
    else {
      return (<div>
        <h2 className="page-section-heading text-center text-uppercase text-secondary mb-0">Tất cả dự án</h2>
        <div className="divider-custom">
            <div className="divider-custom-line" />
            <div className="divider-custom-icon"><i className="fas fa-star" /></div>
            <div className="divider-custom-line" />
          </div>           
           <div  ><Link style={{color:'#2c3e50'}} to={{pathname: "/home/items/min_price=all/max_price=all/min_area=all/max_are=all/sale_method=all/username=all/search=all/per_page=10/page=1"}}>Xem tất cả</Link></div>

          
        </div>
      )
    }
  }
    render() {
        return (
            <div>
                
                
        <div className="container">
          {/* Portfolio Section Heading*/}
          {this.title()}
          {/* Icon Divider*/}
         
          <div className="col-lg-12 ">
          <Swiper
      spaceBetween={20}
      slidesPerView={4}
      navigation
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log('slide change')}
    >
      {
        this.state.all_properties.map((p) => {
          return (
            <SwiperSlide><div style={{width: '100%', height:'140px'}}><Link to={{pathname: "/home/item/"+p.slug}}><img style={{borderRadius:'15px'}} 
            src={p.details.media[0] ? baseURL+"api/v1/media/"+p.details.media[0].slug : 'https://noithatfuhome.com/wp-content/uploads/2018/08/06-3.jpg'}
            style={{borderRadius : '20px',width:"auto",objectFit: 'cover',height:'100%', aspectRatio: '1.77'}}
            /></Link></div></SwiperSlide>
          )
        })
      }
    


    </Swiper>
</div>
        </div>
      

            </div>
        )
    }
}
