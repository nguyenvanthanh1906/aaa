import React, { Component } from 'react'

export default class NotFound extends Component {
    render() {
        return (
            <div clasName="container">
                <div className="row">
                    <div className="col-4" >
                        <div style={{margin:'100px'}}>
                            <h1 style={{ fontSize:'1000%'}}>404</h1>
                            <h1 style={{ fontSize:'500%'}}>Page Not Found</h1>
                        </div>
                        
                    </div>
                    <div className="col-8">
                        <img  style={{width:'100%'}} src="/assets/svg/20.png" alt="" />
                    </div>
                </div>
                
            
            </div>
        )
    }
}
