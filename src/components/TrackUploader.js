import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Button, Modal, Form } from 'react-bootstrap';
import { uploadTrack } from '../store/interactions.js';
import Track from '../models/Track.js';



class TrackUploader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trackTitle: '',
      showModal: false
    };

    this.uploadTrack = this.uploadTrack.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }


  async uploadTrack(event) {
    event.preventDefault();
    const { dimuContract, accountAddress, dispatch } = this.props;

    // make track
    const track = new Track(this.state.trackTitle);

    // upload track to blockchain
    try {
      await uploadTrack(dimuContract, track, accountAddress, dispatch);
      this.closeModal();
      this.setState({ trackTitle: '' });
    } catch (e) {
      console.error(e);
      window.alert('There was an error.');
    }
  }


  openModal() {
    this.setState({ showModal: true });
  }


  closeModal() {
    this.setState({ showModal: false });
  }


  handleInputChange(event) {
    this.setState({ trackTitle: event.target.value });
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
              <Form.Group controlId='formTrackTitle'>
                <Form.Label>Track Name</Form.Label>
                <Form.Control 
                  type='text' 
                  size='lg'
                  placeholder='Track Name...' 
                  onChange={this.handleInputChange}
                  value={this.state.trackTitle}
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


function mapStateToProps(state) {
  return {
    dimuContract: state.dimuContract,
    accountAddress: state.accountAddress
  }
}


export default connect(mapStateToProps)(TrackUploader);