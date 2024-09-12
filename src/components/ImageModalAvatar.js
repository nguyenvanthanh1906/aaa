import React, { Component } from 'react';
import instance from './instance';
import baseURL from './baseURL';
export default class ImageModalAvatar extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }

    }
    componentDidMount() {

    }
    setImg = (slug) => {


        localStorage.avatar = slug

    }
    showAvatar =() => {
        this.props.showAvatarFunc()
    }
    image = (d) => {

        return (
            <div onClick={this.showAvatar} className="" style={{ textAlign: 'center', backgroundColor: 'white', margin: '26px', width: '140px', height: '140px', objectFit: 'cover' }} >



                <img style={{ cursor: "pointer", objectFit: 'cover', width: '100%', height: '100%' }} src={baseURL + "api/v1/media/" + d.slug} alt="" onClick={(slug) => { this.setImg(d.slug) }} />
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

