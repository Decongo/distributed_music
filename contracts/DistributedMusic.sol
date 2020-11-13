pragma solidity >=0.4.22 <0.8.0;

contract DistributedMusic {
  string public name = "DistributedMusic";
  uint public trackCount;
  mapping(uint => Track) public tracks;


  struct Track {
    uint id;
    string hash;        // IPFS hash
    string title;
    address author;      // address of poster
  }


  event TrackUploaded(
    uint id,
    string hash,
    string title,
    address author
  );


  constructor() public { 

  }


  /* 
  upload a track to the blockchain
  @param {String} trackHash - the IPFS hash
  @param {String} title
  */
  function uploadTrack(string memory trackHash, string memory title) public {
    // verify that the parameters were passed in
    require(bytes(trackHash).length > 0);
    require(bytes(title).length > 0);

    // verify that sender address exists
    require(msg.sender != address(0));

    // increment track count for ID purposes
    trackCount++;

    // add track to the contract
    tracks[trackCount] = Track(trackCount, trackHash, title, msg.sender);

    // emit an event
    emit TrackUploaded(trackCount, trackHash, title, msg.sender);
  }
}