import React, { Component } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
// Import Swiper styles
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import instance from './instance';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

export default class Project extends Component {
  componentDidMount() {
    instance.get("api/v1/properties", {
      
    })
        .then(res => { 
         
        console.log(res.data)
        
        })
       
        .catch(error => {
          console.log('error', error.res)
          alert("fail")
        }); 
      }
    
  
  
    render() {
        return (
            <div>
                
                <section className="page-section portfolio" id="about" style={{backgroundColor:'#1abc9c'}}>
        <div className="container">
          {/* Portfolio Section Heading*/}
          <h2 className="page-section-heading text-center text-uppercase text-secondary mb-0">Dự án nổi bật</h2>
          {/* Icon Divider*/}
          <div className="divider-custom">
            <div className="divider-custom-line" />
            <div className="divider-custom-icon"><i className="fas fa-star" /></div>
            <div className="divider-custom-line" />
          </div>
          
          <Swiper
      spaceBetween={20}
      slidesPerView={4}
      navigation
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log('slide change')}
    >
      <SwiperSlide><div ><a href="facebook.com"><img style={{borderRadius:'15px'}} src="https://file4.batdongsan.com.vn/crop/260x146/2020/09/17/hmcVYWuR/20200917165029-9600.jpg"/></a></div></SwiperSlide>
      <SwiperSlide><div><a href="facebook.com"><img style={{borderRadius:'15px'}}src="https://file4.batdongsan.com.vn/crop/260x146/2020/09/17/hmcVYWuR/20200917165029-9600.jpg"/></a></div></SwiperSlide>

      <SwiperSlide><div><a href="facebook.com"><img style={{borderRadius:'15px'}} src="https://file4.batdongsan.com.vn/crop/260x146/2020/09/17/hmcVYWuR/20200917165029-9600.jpg"/></a></div></SwiperSlide>

      <SwiperSlide><div><a href="facebook.com"><img style={{borderRadius:'15px'}} src="https://file4.batdongsan.com.vn/crop/260x146/2020/09/17/hmcVYWuR/20200917165029-9600.jpg"/></a></div></SwiperSlide>

      <SwiperSlide><div><a href="facebook.com"><img style={{borderRadius:'15px'}} src="https://file4.batdongsan.com.vn/crop/260x146/2020/09/17/hmcVYWuR/20200917165029-9600.jpg"/></a></div></SwiperSlide>

      <SwiperSlide><div><a href="facebook.com"><img style={{borderRadius:'15px'}} src="https://file4.batdongsan.com.vn/crop/260x146/2020/09/17/hmcVYWuR/20200917165029-9600.jpg"/></a></div></SwiperSlide>


    </Swiper>

        </div>
      </section>

            </div>
        )
    }
}
