import React, { Component } from 'react';
import instance from './instance';
import baseURL from './baseURL';
export default class Image extends Component {
    constructor(props) {
        super(props);
        this.state ={
         delete_at: null
        }
       
      }
    image = (d) => {
        if(this.state.delete_at){
            return (
                <div className="" style={{textAlign:'center',backgroundColor:'white', margin:'45px',width:'280px',height:'300px',opacity:'0.5',objectFit:'cover'}} >

             
              <img style={{cursor:"pointer",objectFit:'cover',width:'100%',height:'100%'}}  src={baseURL+"api/v1/media/"+d.slug} alt="" onClick={(imgURL)=>{this.props.show(baseURL+"api/v1/media/"+d.slug)}}/>
            <br></br>
            <button class="btn btn-danger" style={{cursor:"none"}} onClick={(slug)=>{this.delete(d.slug)}}>Delete</button>
          </div>   
            )
        } else {
            return (
                <div className="" style={{textAlign:'center',backgroundColor:'white', margin:'45px',width:'280px',height:'300px',objectFit:'cover',border:'1px solid rgb(26, 188, 156)', borderRadius:'15px'}} >

             
              <img style={{cursor:"pointer",objectFit:'cover',width:'100%',height:'200px',borderRadius:'15px' }}  src={baseURL+"api/v1/media/"+d.slug} alt="" onClick={(imgURL)=>{this.props.show(baseURL+"api/v1/media/"+d.slug)}}/>
            <br></br>
            <div>User : {d.user}</div>
            <div>Size : {d.file_size} KB</div>
            <button class="btn btn-danger" onClick={(slug)=>{this.delete(d.slug)}}>Delete</button>
          </div>   
            )
        }
    }
    delete = (slug) => {
        instance.delete("api/v1/media/" +slug, {
            
        })
            .then(res => { 
             console.log(res.data)
             this.setState({
                 delete_at: true
             })
            })
           
            .catch(error => {
              console.log('error', error.res)
              alert("fail")
            }); 
    }
    render() {
        return (
            <div >
                {this.image(this.props.d)}
            </div>
        );
    }
}

