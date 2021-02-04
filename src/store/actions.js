export function trackAdded(track) {
  return {
    type: 'tracks/trackAdded',
    track
  };
}

export function web3Loaded(web3Connection) {
  return {
    type: 'load/web3Loaded',
    web3Connection
  };
}

export function dimuLoaded(Dimu) {
  return {
    type: 'load/dimuLoaded',
    dimuContract: Dimu
  }
}

export function accountLoaded(accountAddress) {
  return {
    type: 'load/accountLoaded',
    accountAddress
  }
}