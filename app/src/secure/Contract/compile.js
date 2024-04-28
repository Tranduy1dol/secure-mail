const solc = require('solc');
const fs = require('fs');

// Đọc mã Solidity từ file
const contractCode = fs.readFileSync('Smail.sol', 'utf8');

// Trình biên dịch Solidity
const input = {
    language: 'Solidity',
    sources: {
        'Smail.sol': {
            content: contractCode,
        },
    },
    settings: {
        outputSelection: {
            '*': {
                '*': ['*'],
            },
        },
    },
};

// Biên dịch contract
const abi = JSON.parse(solc.compile(JSON.stringify(input))).contracts['Smail.sol']['Smail'].abi;
const evm = JSON.parse(solc.compile(JSON.stringify(input))).contracts['Smail.sol']['Smail'].evm;
fs.writeFileSync('abi.json', JSON.stringify(abi), 'utf8');
module.exports = { abi, evm };


