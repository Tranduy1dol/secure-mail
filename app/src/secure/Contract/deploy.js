const HDWalletProvider = require('@truffle/hdwallet-provider');
const { Web3 } = require('web3');
const { abi, evm } = require('./compile')

const provider = new HDWalletProvider (
    'virtual wheel divert strong sauce grid exist soda exact morning bulb fork',
    'https://sepolia.infura.io/v3/a15e8b21b43d4e4e9ad908bf92dc1640'
);
const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log('Attempting to deploy from account', accounts[0]);
    const result = await new web3.eth.Contract(abi)
        .deploy( { data: evm.bytecode.object, arguments: ['378994318']})
        .send({  gas: '0', from: accounts[0]});
    console.log('Contract deployed to', result.options.address);
    provider.result.stop();
    return result.options.address;
};

module.exports = deploy;
