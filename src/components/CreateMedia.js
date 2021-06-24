import React, { Component } from 'react';
import instance from './instance';

export default class CreateMedia extends Component {
    constructor(props) {
        super(props);
        this.state ={
          files:{}
        }
       
      }
    
     setData = (e) => {
        this.setState({files:e.target.files})
     }
     onFormSubmit=(e)=>{
        e.preventDefault() // Stop form submit
        const formData = new FormData();
        for (let i = 0; i < this.state.files.length; i++) {
            formData.append(`files`, this.state.files[i])
        }
       
        console.log(formData)
        instance.post("api/v1/media", 
           
            formData
        ,)
        .then(res => { 
         
        })
       
        .catch(error => {
          console.log('error', error)
          alert("fail")
        });
      }

    render() {
        return (
            <div >
           
      <form onSubmit={this.onFormSubmit} >
       
        <input type="file" id="files" name="files" multiple onChange={this.setData} /><br /><br />
        <input type="submit" className="btn btn-success"/>
      </form>
       </div>
        );
    }
}

