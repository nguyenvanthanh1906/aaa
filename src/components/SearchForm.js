import React, { Component } from 'react'
import cities from'D:/oC/qadaland/src/components/Cities.json'
import Nouislider from "nouislider-react";
import "nouislider/distribute/nouislider.css";
export default class SearchForm extends Component {
    constructor(props)
    {
        super(props)
        this.state = {
            cities : cities,
            cityId : 0,
            districtId : 0,
            districts : [],
            wards : [],
            costMin:0,
            costMax : 20,
            SMin : 0,
            SMax : 500
           
        }
    }
   changeCity = (event) => {
        this.setState({
            cityId : event.target.value,
            wards : []
        })
        this.state.cities.map((city) => {
            if(city.id == event.target.value)
            {
                this.setState({
                    districts : city.districts
                })
            }
            
        })
        if(event.target.value == 0)
            {
                this.setState({
                    districtId : 0,
                    districts : [],
                    wards : []
                })
            }
   }
   changeDistrict = (event) => {
       this.setState({
            districtId : event.target.value
       })
       this.state.districts.map((district) => {
           if(district.id == event.target.value)
           {
               this.setState({
                   wards : district.wards
               })
           }
       })
       if(event.target.value == 0)
       {
           this.setState({
                
               wards : []
           })
       }
   }
  
  onSlideS = (render, handle, value, un, percent) => {
      this.setState({
          SMin : value[0].toFixed(0),
          SMax : value[1].toFixed(0),
      })
  }
  onSlideCost = (render, handle, value, un, percent) => {
      this.setState({
          costMin : value[0].toFixed(0),
          costMax : value[1].toFixed(0),
      })
  }
  inputSMin = (event) => {
      this.setState({
          SMin : event.target.value
      })
  }
  inputSMax = (event) => {
    this.setState({
        SMax : event.target.value
    })
}
inputCostMin = (event) => {
    this.setState({
        costMin: event.target.value
    })
}
inputCostMax = (event) => {
    this.setState({
        costMax : event.target.value
    })
}
    render() {
        return (
            <div style={{margin:'30px'}}>
               
      <div className="container" style={{backgroundColor:'white',padding:'50px',borderRadius:'15px',boxShadow:'0 0.125rem 0.3125rem rgb(0 0 0 / 30%)'}}>
          <div className="row">
              <div className="col-lg-12">
              <form>
        <div className="form-row">
          <div className="col">
             <select className="form-control" name="city" onChange={(event) => this.changeCity(event)} >
             <option value={0}>City</option>
             {
                
                this.state.cities.map((city) => {
                    return (
                        
                        <option value={city.id} >{city.name}</option>
                    )
                })
             }
             </select>
        </div>
        <div className="col">
             <select className="form-control" name="district" onChange={(event) => this.changeDistrict(event)}>
             <option value={0}>District</option>
             {
                this.state.districts.map((district) => {
                    
                        return (
                            <option value={district.id}>{district.name}</option>
                        )
                    
                })
             }
             </select>
        </div>
        <div className="col">
             <select className="form-control" >
             <option value={0}>Ward</option>
             {
                this.state.wards.map((ward) => {
                    
                        return (
                            <option value={ward.id}>{ward.name}</option>
                        )
                    
                })
             }
             </select>
        </div>
        </div>
        <div className="form-row" >
            <div className="col-4" style={{paddingTop:'40px'}}>
                
               <select className="form-control">
               <option value={0}>Căn hộ</option>
               <option value={0}>phòng trọ</option>
               <option value={0}>cao ốc</option>
               <option value={0}>Đất</option>
               </select>
            </div>
            <div className="col-lg-4" style={{paddingTop:'20px'}}>
            <div className='container' style={{justifyContent:'center',fontFamily:'inherit',width:'85%',marginBottom:'5px'}}>
                <div className="row" >
                <div className="col-lg-5" style={{justifyContent:'center',fontFamily:'inherit',padding:'0'}}>Khoảng giá {"(tỷ)"}</div>
                <div className="col-lg-3" style={{padding:'0'}}>
                    <input type='text' style={{width:'90%',height:'80%'}} onChange={(event) => this.inputCostMin(event)} value={this.state.costMin}/>
                </div>
                <div className="col-lg-1" style={{justifyContent:'center',fontFamily:'inherit',padding:'0'}}>-</div>
                <div className="col-lg-3 " style={{padding:'0'}}>
                <input type='text' style={{width:'90%',height:'80%'}} onChange={(event) => this.inputCostMax(event)} value={this.state.costMax}/>
                </div>
                </div>
               
            </div>
            <div className='row' style={{justifyContent:'center'}}>
                    <div className='col-lg-10' >
                    <Nouislider 
                    range={{ min: 0, max: 20 }}
                    start={[0, 20]} connect
                    step = {1}
                    
                    onSlide = {(render, handle, value, un, percent) => this.onSlideCost(render, handle, value, un, percent)} />
                </div>
                </div>
                
            </div>
            <div className="col-lg-4" style={{paddingTop:'20px'}}>
            <div className='container' style={{justifyContent:'center',fontFamily:'inherit',width:'85%',marginBottom:'5px'}}>
                <div className="row" >
                <div className="col-lg-5" style={{justifyContent:'center',fontFamily:'inherit',padding:'0'}}>Diện tích {"(m2)"}</div>
                <div className="col-lg-3" style={{padding:'0'}}>
                    <input type='text' style={{width:'90%',height:'80%'}} onChange={(event) => this.inputSMin(event)} value={this.state.SMin}/>
                </div>
                <div className="col-lg-1" style={{justifyContent:'center',fontFamily:'inherit',padding:'0'}}>-</div>
                <div className="col-lg-3 " style={{padding:'0'}}>
                <input type='text' style={{width:'90%',height:'80%'}} onChange={(event) => this.inputSMax(event)} value={this.state.SMax}/>
                </div>
                </div>
               
            </div>
                <div className='row' style={{justifyContent:'center'}}>
                    <div className='col-lg-10'>
                    <Nouislider 
                    range={{ min: 0, max: 500 }}
                    start={[0, 500]} connect
                    step = {10}
                    
                    onSlide = {(render, handle, value, un, percent) => this.onSlideS(render, handle, value, un, percent)} />
                </div>
                </div>
                
            </div>
          
        
        </div>
        
      </form>

              </div>
        
          </div>
      
      </div>
            </div>
        )
    }
}
