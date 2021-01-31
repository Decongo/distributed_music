import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Button, Modal, Form } from 'react-bootstrap';
import { trackAdded } from '../store/actions.js';
import Track from '../models/Track.js';



class UploadTrack extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trackName: '',
      showModal: false
    };

    this.uploadTrack = this.uploadTrack.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }


  uploadTrack(event) {
    event.preventDefault();

    // make track
    const track = new Track(this.state.trackName);

    // dispatch track action
    this.props.dispatch(trackAdded(track));
  }


  openModal() {
    this.setState({ showModal: true });
  }


  closeModal() {
    this.setState({ showModal: false });
  }


  handleInputChange(event) {
    this.setState({ trackName: event.target.value });
  }


  render() {
    return (
      <div>
        <Button variant='primary' size='lg' onClick={this.openModal}>Upload Track</Button>

        <Modal show={this.state.showModal} onHide={this.closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Upload A Track</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form onSubmit={this.uploadTrack}>
              <Form.Group controlId='formTrackName'>
                <Form.Label>Track Name</Form.Label>
                <Form.Control 
                  type='text' 
                  size='lg'
                  placeholder='Track Name...' 
                  onChange={this.handleInputChange}
                  value={this.state.trackName}
                />
              </Form.Group>
            </Form>
          </Modal.Body>

          <Modal.Footer>
            <Button variant='secondary' onClick={this.closeModal}>Close</Button>
            <Button variant='primary' onClick={this.uploadTrack}>Upload</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}


export default connect()(UploadTrack);