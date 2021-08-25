import React, { Component } from 'react';
import instance from './instance';
import baseURL from './baseURL';
import { Button, Modal } from 'react-bootstrap';
import Image from './Image';
import { Link } from 'react-router-dom';
import ImageModalAvatar from './ImageModalAvatar';

export default class ModalMediaAvatar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            media: [],
            show: false,
            imgURL: "",
            total_page: [],
            last_page: null,
            current_page: 1,
            showAvatar: false
        }

    }
    componentDidMount() {
        instance.get("api/v1/media", {
            params: {
                per_page: 10,
                page: 1,

            }
        })
            .then(res => {
                console.log(res.data)
                var total = []
                for (let i = 1; i <= res.data.last_page; i++) {
                    total.push(i)
                }
                this.setState({
                    last_page: res.data.last_page,
                    media: res.data.result,
                    total_page: total
                })

            })

            .catch(error => {
                console.log('error', error.res)
                alert("fail")
            });
    }
    show = (imgURL) => {
        this.setState({
            imgURL: imgURL,
            show: !this.state.show
        })
    }
    goPage = (page) => {
        var params = null;
        params = {

            per_page: 10,
            page: page
        }
        for (var propName in params) {
            if (params[propName] === null || params[propName] === undefined || params[propName] === "all") {
                delete params[propName];
            }
        }
        instance.get("api/v1/media", {
            params: params
        })
            .then(res => {
                window.scrollTo(0, 0)
                var total = []
                for (let i = 1; i <= res.data.last_page; i++) {
                    total.push(i)
                }

                this.setState({
                    last_page: res.data.last_page,
                    media: res.data.result,
                    total_page: total,
                    current_page: page,

                })

            })

            .catch(error => {
                console.log('error', error.res)
                alert("fail")
            });
    }
    pagination = () => {
        if (this.state.last_page > 1) {
            return (
                <nav aria-label="Page navigation example">
                    <ul className="pagination">

                        {
                            this.state.total_page.map((p) => {
                                if (p == this.state.current_page) {
                                    return (<li className="page-item disabled"><Link className="page-link" to={{}} onClick={(page) => { this.goPage(p) }}>{p}</Link></li>)
                                } else {
                                    return (<li className="page-item"><Link className="page-link" to={{}} onClick={(page) => { this.goPage(p) }}>{p}</Link></li>)
                                }
                            })
                        }


                    </ul>
                </nav>
            )
        }
    }
    showAvatar = () => {
        this.setState({
            showAvatar: !this.state.showAvatar
        })
    }
    render() {
        return (
            <div>
                <div className="container-fluid">
                    <div className="row" >
                        {
                            this.state.media.map((d) => {
                                return (
                                    <ImageModalAvatar d={d} key={d.slug} showAvatarFunc={this.showAvatar}></ImageModalAvatar>
                                )
                            })
                        }


                    </div>
                    {this.pagination()}
                </div>
                <Modal show={this.state.showAvatar} >
                    <Modal.Header >
                        <Modal.Title>Ảnh đại diện</Modal.Title>
                    </Modal.Header>
                    <Modal.Body><img src={baseURL + "api/v1/media/" + localStorage.avatar} alt="" /></Modal.Body>
                    <Modal.Footer>
                        <Button variant="contained" style={{ outline: "none" }} color="primary" onClick={this.props.setAvatarMediaFunc} >
                            Đặt
                        </Button>
                        <Button variant="secondary" onClick={this.showAvatar}>
                            Đóng
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

