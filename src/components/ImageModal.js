import React, { Component } from 'react';
import instance from './instance';
import baseURL from './baseURL';
export default class ImageModal extends Component {
    constructor(props) {
        super(props);
        this.state ={
            'choice' : false
        }
       
      }
      componentDidMount() {
        if(localStorage.media){
        var media = localStorage.media;
        media = media.split(',')
        media.map((m)=>{
            if(this.props.d.slug === m){
                this.setState({
                    choice : true
                })
            } 
        });
      }
    }
      setImg = (slug) => {
          
        this.setState({
            choice : !this.state.choice
        })
       
          if(localStorage.media){
              let hi = false;
               var media = localStorage.media;
               media = media.split(',')
               media.map((m)=>{
                   if(slug === m){
                    const index = media.indexOf(m);
                    media.splice(index, 1);
                    localStorage.media = media;
                    hi = true
                   } 
               });
               if (!hi){
                media.push(slug)
                localStorage.media = media
               }
               
          } else {
              let media = [];
              media.push(slug)
              
              localStorage.media = media
          }
      }
    image = (d) => {
       
            return (
                <div className="" style={{textAlign:'center',backgroundColor:'white', margin:'26px',width:'140px',height:'140px',objectFit:'cover'}} >
                  


              <img style={{cursor:"pointer",objectFit:'cover',width:'100%',height:'100%'}}  src={baseURL+"api/v1/media/"+d.slug} alt="" onClick={(slug)=>{this.setImg(d.slug)}}/>
               {
                       this.state.choice?<p><img   src="/assets/svg/checked.png" alt="" />
                       </p>:<p></p>
                   } 
            <br></br>
          </div>   
            )
        
    }
    render() {
        return (
            <div>
                {this.image(this.props.d)}
            </div>
        );
    }
}

