import { IP } from "./constants.mjs";
import { plainText } from "./constants.mjs";
import { initialKey, p10Positions, p8Positions } from "./constants.mjs";
import { leftShiftOperation, permutations } from "./keyOps.mjs";
import { resize } from "./textOps.mjs";
import { f } from "./textOps.mjs";

const p10PermutedKey = permutations(p10Positions, initialKey);
const leftShiftedKey1 = leftShiftOperation(p10PermutedKey, 1);
const p8PermutedKey = permutations(p8Positions, leftShiftedKey1);
const leftShiftedKey2 = leftShiftOperation(leftShiftedKey1, 2);
const p8PermutedKey2 = permutations(p8Positions, leftShiftedKey2);

//getting K1
// console.log(`Initial Key: ${initialKey}`);
// console.log(`Permuted Key (P10): ${p10PermutedKey}`);
// console.log(`Circular Left Shift for Key 1: ${leftShiftedKey1}`);
// console.log(`Permuted Key (P8): ${p8PermutedKey}`);

//prepping ciphertext
const afterIP = permutations(IP, plainText);
// console.log(`After IP: ${afterIP}`);
const leftSide  = afterIP.slice(0,4);
const rightSide = afterIP.slice(4,8);
const fOutput = f(leftSide, rightSide, p8PermutedKey);
console.log(`fOutput: ${fOutput}`);

// console.log(`Double Circular Left Shift for Key 2: ${leftShiftedKey2}`);
// console.log(`Key 2 (p8): ${p8PermutedKey2}`);

