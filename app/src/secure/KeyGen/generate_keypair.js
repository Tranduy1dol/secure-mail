const sha256 = require("sha256");

export default function keypair(address: String) {
    const pubkey = sha256(address);
    const privateKey = sha256(pubkey);
    return {
        pubkey,
        privateKey
    }
}