import Web3 from 'web3';
import Dimu from '../abis/DistributedMusic.json';
import {
  web3Loaded,
  dimuLoaded,
  trackAdded,
  accountLoaded
} from './actions.js';

export const loadWeb3 = (dispatch) => {
  const web3 = new Web3(Web3.givenProvider || 'http://localhost:7575');
  dispatch(web3Loaded(web3));
  return web3;
}

export const loadDimu = async (web3, networkID, dispatch) => {
  try {
    const dimuReference = new web3.eth.Contract(Dimu.abi, Dimu.networks[networkID].address);
    dispatch(dimuLoaded(dimuReference));
    return dimuReference;
  } catch (e) {
    console.error(e);
    return null;
  }
}

export const loadAccount = async (web3, dispatch) => {
  const accounts = await web3.eth.getAccounts();
  const account = accounts[0];
  dispatch(accountLoaded(account));
  return account;
}

export const uploadTrack = async (dimu, track, account, dispatch) => {
  await dimu.methods.uploadTrack('testhash', track.title).send({ from: account })
  .on('transactionHash', hash => {
    dispatch(trackAdded(track));
  })
  .on('error', error => {
    throw new Error(error);
  });
}

