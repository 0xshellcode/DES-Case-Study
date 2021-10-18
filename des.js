import { IP } from "./constants.mjs";
import { INVP } from "./constants.mjs";
import { plainText } from "./constants.mjs";
import { initialKey, p10Positions, p8Positions } from "./constants.mjs";
import { leftShiftOperation, permutations } from "./keyOps.mjs";
import { sw } from "./textOps.mjs";
import { f } from "./textOps.mjs";

const p10PermutedKey = permutations(p10Positions, initialKey);
const leftShiftedKey1 = leftShiftOperation(p10PermutedKey, 1);
const p8PermutedKey = permutations(p8Positions, leftShiftedKey1);
const leftShiftedKey2 = leftShiftOperation(leftShiftedKey1, 2);
const p8PermutedKey2 = permutations(p8Positions, leftShiftedKey2);


const afterIP = permutations(IP, plainText);
console.log(`After IP: ${afterIP}`);
const leftSide  = afterIP.slice(0,4);
const rightSide = afterIP.slice(4,8);
const fOutput = f(leftSide, rightSide, p8PermutedKey);
console.log(`fOutput: ${fOutput}`);
const afterSW = sw(fOutput);
console.log(`afterSW: ${afterSW}`);
const ls2  = afterSW.slice(0,4);
const rs2 = afterSW.slice(4,8);
const fOutput2 = f(ls2, rs2, p8PermutedKey2);
console.log(`fOutput2: ${fOutput2}`);
const afterINVP = permutations(INVP, fOutput2);
console.log(`afterINVP: ${afterINVP}`);
//encryption done

