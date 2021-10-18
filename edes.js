import { process } from "./encrypt.mjs";
import { transposeColumns } from "./enhancedOps.mjs";
import { getStringFromMatrix } from "./enhancedOps.mjs";
import { setCols } from "./enhancedOps.mjs";
import { circularShift } from "./keyOps.mjs";
import { resize } from "./textOps.mjs";

const plaintext = 'DID YOU SEE';
const fixedColsMatrix = setCols(plaintext.replace(/ /g, ''), 3);
let rounds = 2;
let shiftedColsMatrix = fixedColsMatrix;
while(rounds > 0){
    shiftedColsMatrix = transposeColumns(shiftedColsMatrix, [2,3,1]);
    rounds--;
}
const row1 = shiftedColsMatrix[0];
const row2 = circularShift(shiftedColsMatrix[1].join(''),1).split('')
const row3 = circularShift(shiftedColsMatrix[2].join(''),2).split('')
const strMatrix = getStringFromMatrix([row1, row2, row3]);

let encryptedText='';
let hex = ''
for(const letter of strMatrix){
    encryptedText += process(resize(letter.charCodeAt(0).toString(2), 8), true)+' ';
    hex += parseInt(process(resize(letter.charCodeAt(0).toString(2), 8), true)+' ', 2).toString(16).toUpperCase(); 
}

console.log(encryptedText);
console.log(hex);

