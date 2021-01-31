import logo from './logo.svg';
import './App.css';
import Dimu from './abis/DistributedMusic.json';
import React, { Component } from 'react';
import Web3 from 'web3';
import NavBar from 'react-bootstrap/NavBar';
import UploadTrack from './components/UploadTrack.js';
import { connect } from 'react-redux';


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
    await this.loadWeb3();
    await this.loadBlockchainData();
  }


  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
  }


  async loadBlockchainData() {
    const web3 = window.web3;
    // Load account
    const accounts = await web3.eth.getAccounts();
    this.setState({ accountAddress: accounts[0] });

    // Connect to network
    const networkID = await web3.eth.net.getId()
    const networkData = Dimu.networks[networkID]

    if(networkData) {
      const dimu = new web3.eth.Contract(Dimu.abi, networkData.address)
      this.setState({ dimu });
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
    return this.props.tracks.map(track => <p>{track.name}</p>)
  }


  render() {
    return (
      <div className="App">
        <NavBar bg='dark' variant='dark'>
          <NavBar.Brand>Distributed Music</NavBar.Brand>
          <NavBar.Text>{ this.state.accountAddress || 'Please connect to Ethereum via MetaMask' }</NavBar.Text>
        </NavBar>
        
        <div>
          Track count: { this.state.trackCount }
        </div>

        <div>
          <UploadTrack />
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
    tracks: state.tracks
  }
}


export default connect(mapStateToProps)(App);
