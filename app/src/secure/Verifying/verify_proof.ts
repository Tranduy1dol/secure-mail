import snarkjs = require("snarkjs");
import fs = require("fs");

export default async function run() {
    const { proof, publicSignals } = await snarkjs.groth16.fullProve({a: 10, b: 21}, "circuit.wasm", "circuit_final.zkey");

    console.log("Proof: ");
    console.log(JSON.stringify(proof, null, 1));

    // @ts-ignore
    const vKey = JSON.parse(fs.readFileSync("verification_key.json"));

    return await snarkjs.groth16.verify(vKey, publicSignals, proof);
}
