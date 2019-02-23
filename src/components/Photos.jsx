import React, { Component } from 'react';
import axios from 'axios';
import { Image, Button, Modal, ListGroup, FormControl } from 'react-bootstrap';
import './Photos.css';

class PhotosComponent extends Component {
    state = {
        photos: []
    }

    componentDidMount() {
        axios.get('http://starlord.hackerearth.com/insta').then((data) => {
            this.setState({ photos: data.data }, () => {
                console.log(this.state.photos);
            });
        });
    }

    render() { 
        return (
            <React.Fragment>
                <div className="titlebar">
                    <span className="titlePage">Sanjeet Tiwari</span>
                    <i className="fas fa-plus-circle addImage" onClick={this.addAnImage}></i>
                </div>
                <br />
                <div className="photoscontainer">
                    {this.state.photos.map(photo => {
                        return (
                        <div className="photovhave" onMouseEnter={() => this.showDiv(photo)} onMouseLeave={() => this.hideDiv(photo)} onDoubleClick={() => this.likePhoto(photo)}>
                            <Image src={photo.Image} className="photoimage" rounded></Image>
                            {(photo.hovered)?<div className="imageboard">
                                <div>
                                    {(!photo.liked)?<i className="far fa-heart"></i>:<i className="fas fa-heart"></i>}
                                    &nbsp;
                                    {photo.likes}
                                </div>
                                <div>
                                    <i className="fas fa-comments"></i>
                                    &nbsp;
                                    {(photo.comments)?photo.comments.length:'0'}
                                </div>
                                <div>
                                    <Button variant="outline-light" className="imageboarddel" onClick={() => this.delAnImage(photo)}>Delete</Button>
                                    &nbsp;
                                    <Button variant="outline-light" className="imageboarddel" onClick={() => this.addComment(photo)}>Comment</Button>
                                </div>
                            </div>:null}
                            <Modal show={photo.commented} onHide={() => this.handleClose(photo)}>
                                <Modal.Body>
                                    <Image src={photo.Image} rounded className="modalimage"></Image>
                                    <br />
                                    {(photo.comments)?<ListGroup>
                                        {photo.comments.map(comment => {
                                            return (<ListGroup.Item>{comment}</ListGroup.Item>)
                                        })}
                                    </ListGroup>:null}
                                    <br />
                                    <FormControl placeholder="Enter a comment"></FormControl>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={() => this.handleClose(photo)}>
                                    Close
                                    </Button>
                                    <Button variant="primary" onClick={() => this.handleClose(photo)}>
                                    Add Comment
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                        </div>)
                    })}     
                </div>
            </React.Fragment>
        );
    }

    showDiv = (photo) => {
        let updatedPhotos = this.state.photos;
        updatedPhotos[updatedPhotos.indexOf(photo)].hovered = true;
        this.setState({ photos: updatedPhotos });
    }

    hideDiv = (photo) => {
        let updatedPhotos = this.state.photos;
        updatedPhotos[updatedPhotos.indexOf(photo)].hovered = false;
        this.setState({ photos: updatedPhotos });
    }

    addAnImage = () => {
        console.log('An image needs to be added..!!');
    }

    delAnImage = (photo) => {
        console.log('This image needs to be deleted..!!');
        let updatedPhotos = this.state.photos;
        updatedPhotos.splice(updatedPhotos.indexOf(photo), 1);
        this.setState({ photos: updatedPhotos });
    }

    addComment = (photo) => {
        let updatedPhotos = this.state.photos;
        updatedPhotos[updatedPhotos.indexOf(photo)].commented = true;
        this.setState({ photos: updatedPhotos });
    }

    handleClose = (photo) => {
        let updatedPhotos = this.state.photos;
        updatedPhotos[updatedPhotos.indexOf(photo)].commented = false;
        this.setState({ photos: updatedPhotos });
    }

    likePhoto = (photo) => {
        let updatedPhotos = this.state.photos;
        if(photo.liked) {
            updatedPhotos[updatedPhotos.indexOf(photo)].liked = false;
            updatedPhotos[updatedPhotos.indexOf(photo)].likes = updatedPhotos[updatedPhotos.indexOf(photo)].likes - 1;
            this.setState({ photos: updatedPhotos });
        }
        else {
            updatedPhotos[updatedPhotos.indexOf(photo)].liked = true;
            updatedPhotos[updatedPhotos.indexOf(photo)].likes = updatedPhotos[updatedPhotos.indexOf(photo)].likes + 1;
            this.setState({ photos: updatedPhotos });
        }
    }
}
 
export default PhotosComponent;