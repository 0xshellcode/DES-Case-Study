import { sBox0 } from "./constants.mjs";
import { P4 } from "./constants.mjs";
import { sBox1 } from "./constants.mjs";
import { EP } from "./constants.mjs";
import { permutations } from "./keyOps.mjs";

export const bigF = (right, subkey) => {
    if(right.length!=4){console.log('Tamaño substirng incorrecto')}
    if(subkey.length!=8){console.log('Tamaño subkey incorrecto')}
    const expandedText = permutations(EP, right);
    const xored = xor(expandedText, subkey);
    const leftSide = xored.slice(0,4);
    const rightSide = xored.slice(4,8);
    const reducedLeft = sboxing(leftSide, sBox0)
    const reducedRight = sboxing(rightSide, sBox1)
    console.log(`reducedLeft: ${reducedLeft}`);
    console.log(`reducedRight: ${reducedRight}`);
    return permutations(P4, reducedLeft+reducedRight);
  }
  
const xor = (halfClearText, key) => {
  return ((parseInt(halfClearText, 2) ^ parseInt(key, 2)) >>> 0).toString(2);
};

const sboxing = (substring, sbox) => {
  const li = parseInt(outerBits(substring), 2);
  const ri = parseInt(innerBits(substring), 2);
  if(li<0 || li>3 || ri<0 || ri>3){console.log('Error indices Sbox')}
  return sbox[li][ri].toString(2);
}

const outerBits = (stringHalf) => {
  return stringHalf.charAt(0) + stringHalf.slice(-1);
};

const innerBits = (stringHalf) => {
  return stringHalf.slice(1, -2);
};