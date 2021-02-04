import logo from './logo.svg';
import './App.css';
import Dimu from './abis/DistributedMusic.json';
import React, { Component } from 'react';
import Web3 from 'web3';
import NavBar from 'react-bootstrap/NavBar';
import TrackUploader from './components/TrackUploader.js';
import { connect } from 'react-redux';
import {
  loadWeb3,
  loadDimu,
  loadAccount
} from './store/interactions.js';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      accountAddress: '',
      contractAddress: '',
      dimu: null,
      trackCount: 'not initialized'
    };
  }

  async componentDidMount() {
    const dispatch = this.props.dispatch;
    await this.loadBlockchainData(dispatch);
  }

  async loadBlockchainData(dispatch) {
    const web3 = loadWeb3(dispatch);
    await window.ethereum.enable();

    // Load account
    const account = await loadAccount(web3, dispatch);

    // Connect to network
    const networkID = await web3.eth.net.getId()
    const networkData = Dimu.networks[networkID]

    if(networkData) {
      const dimu = await loadDimu(web3, networkID, dispatch);
      if (!dimu) {
        window.alert('Distributed Music contract not found. Please try connecting to another network.');
      }
      
      const trackCount = await dimu.methods.trackCount().call();
      this.setState({ trackCount });

      // // Load videos, sort by newest
      // for (var i=videosCount; i>=1; i--) {
      //   const video = await dvideo.methods.videos(i).call()
      //   this.setState({
      //     videos: [...this.state.videos, video]
      //   })
      // }

      // //Set latest video with title to view as default 
      // const latest = await dvideo.methods.videos(videosCount).call()
      // this.setState({
      //   currentHash: latest.hash,
      //   currentTitle: latest.title
      // })
      // this.setState({ loading: false})
    } else {
      window.alert('Dimu contract not deployed to detected network.')
    }
  }


  renderTracks() {
    return this.props.tracks.map(track => <p>{track.title}</p>)
  }


  render() {
    return (
      <div className="App">
        <NavBar bg='dark' variant='dark'>
          <NavBar.Brand>Distributed Music</NavBar.Brand>
          <NavBar.Text>{ this.props.accountAddress || 'Please connect to Ethereum via MetaMask' }</NavBar.Text>
        </NavBar>
        
        <div>
          Track count: { this.state.trackCount }
        </div>

        <div>
          <TrackUploader />
        </div>

        <div>
          {this.renderTracks()}
        </div>
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    tracks: state.tracks,
    dimuContract: state.dimuContract,
    accountAddress: state.accountAddress
  }
}


export default connect(mapStateToProps)(App);
