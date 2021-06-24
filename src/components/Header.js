import React, { Component } from 'react'

export default class Header extends Component {
    render() {
        return (
            <div >
                 <header className="masthead bg-primary text-white text-center" style={{backgroundPositionY:'-30px',height:'800px ',backgroundImage:'url("header_img.jpeg")',backgroundRepeat: 'no-repeat',backgroundAttachment: 'fixed',backgroundSize: 'cover'}}>
        <div className="container d-flex align-items-center flex-column" style={{marginTop:'100px'}}>
          {/* Masthead Avatar Image*/}
         
          
          {/* Masthead Heading*/}
          <h1 className="masthead-heading text-uppercase mb-0" style={{color:'#2c3e50'}}>QuadaLand</h1>
          {/* Icon Divider*/}
          <div className="divider-custom divider-light" >
            <div className="divider-custom-line" style={{backgroundColor:'#2c3e50'}}/>
            <div className="divider-custom-icon" ><i className="fas fa-star" style={{color:'#2c3e50'}}/></div>
            <div className="divider-custom-line" style={{backgroundColor:'#2c3e50'}}/>
          </div>
          {/* Masthead Subheading*/}
          <p className="masthead-subheading font-weight-light mb-0" style={{color:'#2c3e50'}} >Be your better home</p>
        </div>
      </header>
            </div>
        )
    }
}
