const encrypt = require('./crypt_function').encrypt; // Assuming encrypt is exported
const web3 = require('web3');
const sha256 = require('sha256');
const deploy = require("../../Contract/deploy"); // Replace with actual implementation

// Import deploy and abi functions if they are in separate files
const contract_address = deploy(); // Assuming deploy returns a promise or resolves to the address
const abi = require("../../Contract/compile").abi; // Assuming abi is exported as default

async function generateCircuitInput( { sender_pubkey, receiver_address, content }: {
    sender_pubkey: string,
    receiver_address: string,
    content: string
}) {
    // Get receiver_pubkey by calling smart contract
    const web3Instance = new web3(); // Create a web3 instance
    try {
        const contract = new web3Instance.eth.Contract(abi, contract_address);
        const receiver_pubkey = await contract.methods.get_profile(receiver_address).call();

        // Encrypt email content
        const email_encrypted = encrypt(receiver_pubkey, content);

        // Compute signature
        const sign = sha256(email_encrypted.toString(), sender_pubkey); // Assuming sha256 returns a string

        // Return value
        return {
            receiver_pubkey,
            email_encrypted,
            sign,
        };
    } catch (error) {
        console.error("Error interacting with contract:", error);
    }
}