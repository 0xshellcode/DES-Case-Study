import { transposeColumns } from "./enhancedOps.mjs";
import { setCols } from "./enhancedOps.mjs";

const plaintext = 'DID YOU SEE';
const fixedColsMatrix = setCols(plaintext.replace(/ /g, ''), 3);
let rounds = 2;
let shiftedColsMatrix = fixedColsMatrix;
while(rounds > 0){
    shiftedColsMatrix = transposeColumns(shiftedColsMatrix, [2,3,1]);
    rounds--;
}

console.log(shiftedColsMatrix);