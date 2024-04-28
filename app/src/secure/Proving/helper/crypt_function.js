const encrypt = (pubkey, message) => {
    // Simple substitution cipher - Caesar shift by pubkey value (assuming pubkey is a number)
    const key = parseInt(pubkey, 10);
    let encryptedMessage = "";
    for (let i = 0; i < message.length; i++) {
        const charCode = message.charCodeAt(i);
        let newCharCode = charCode + key;

        // Handle character overflow (wrap around to keep printable characters)
        if (newCharCode > 126) {
            newCharCode = newCharCode - 91 + 32; // Wrap from 'z' to ' '
        } else if (newCharCode < 32) {
            newCharCode = newCharCode + 91 - 32; // Wrap from ' ' to '!'
        }

        encryptedMessage += String.fromCharCode(newCharCode);
    }
    return encryptedMessage;
}

const decrypt = (privateKey, encryptedMessage) => {
    // Simple substitution cipher - Caesar shift back by private key value
    const key = parseInt(privateKey, 10);
    let decryptedMessage = "";
    for (let i = 0; i < encryptedMessage.length; i++) {
        const charCode = encryptedMessage.charCodeAt(i);
        let newCharCode = charCode - key;

        // Handle character underflow (wrap around to keep printable characters)
        if (newCharCode < 32) {
            newCharCode = newCharCode + 91 - 32; // Wrap from '!' to ' '
        } else if (newCharCode > 126) {
            newCharCode = newCharCode - 91 + 32; // Wrap from 'z' to ' '
        }

        decryptedMessage += String.fromCharCode(newCharCode);
    }
    return decryptedMessage;
}

module.exports = { encrypt, decrypt };

// Example usage (assuming pubkey and privatekey are a matching pair)
// const pubkey = "13"; // Shift by 13 characters (Caesar cipher)
// const privateKey = pubkey; // Same key for decryption
// const message = "This is a secret message!";
//
// const encryptedMessage = encrypt(pubkey, message);
// console.log("Encrypted message:", encryptedMessage);
//
// const decryptedMessage = decrypt(privateKey, encryptedMessage);
// console.log("Decrypted message:", decryptedMessage);
