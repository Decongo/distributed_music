# distributed_music

A decentralized react app and Ethereum smart contract for streaming music.

Artists upload their work.  Listeners can stream artists' work for a small fee.  The fee goes directly to the artist, with a small amount going to the developer.

This project is mostly so that I can learn Ethereum smart contract development.

## Goals
1. Tracks - upload, list, and play tracks
2. Albums - group tracks by album
3. Artists - group work by artists


# Truffle/Ganache

This project is being developed using the Truffle Suite.  The primary tool is Ganache 2.1.1.  

## Deploy Smart Contract to Ganache

With Ganache running, navigate to the working directory and run:

`truffle migrate`

The console should display data about the migration, and the balance of the first account in Ganache should decrease.

## Serving Front End

In the working directory, run:

`npm run start`

This will serve the front end on port 3000.

## Connect to the Blockchain Through MetaMask

Ensure that you have the MetaMask extension installed.  Also ensure that metamask is set up to connect to Ganache.  You may have to add a custom RPC.  Use the information on the "Accounts" screen of Ganache.


# Other Commands

## Redeploy Smart Contract

If you make any changes to the smart contract, redeploy it to Ganache by using:

`truffle migrate --reset`

## Test Smart Contract

`truffle test`
