import web3 from "web3/src/web3";
import { decrypt } from "../Proving/helper/crypt_function";

const deploy = require('../Contract/deploy');
const abi = require('../Contract/abi');
const verify = require('verify_proof');

export async function decrypt_email( {receiver_pubkey, receiver_private_key, email_encrypted} : {
    receiver_pubkey: string,
    receiver_private_key: string,
    email_encrypted: string
}){
    const contract_address = await deploy();
    const contract = new web3().eth.Contract(abi, contract_address);
    const proof = await contract.methods.get_profile(receiver_pubkey).call();

    const verify_result = verify();
    if (verify_result) {
        console.log("Proof validate");
        return decrypt(email_encrypted, receiver_private_key);
    } else {
        console.log("Verify failed");
    }
}