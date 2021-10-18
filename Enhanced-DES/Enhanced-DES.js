const initialKey = '1010000010';
const p10Positions = [3, 5, 2, 7, 4, 10, 1, 9, 8, 6];
const p8Positions = [6, 3, 7, 4, 8, 5, 10, 9];
const p8Positions4CipherText = [2, 6, 3, 1, 4, 8, 5, 7];
const inversep8Positions4CipherText = [4, 1, 3, 5, 7, 2, 8, 6];
const expansionPermutation = [4, 1, 2, 3, 2, 3, 4, 1];
const p4PositionsCipherText = [2, 4, 3, 1];

const filler = (binaryText, desiredLenght) => {
  let difference = binaryText.length - desiredLenght;
  return difference !== 0 ? '0' * difference + binaryText : '';
};

const permutations = (permutedPositions, stringToPermute) => {
  const result = permutedPositions
    .map((newPosition) => stringToPermute[newPosition - 1])
    .join('');
  return result;
};

const leftShiftOperation = (str, leftShifts) => {
  let part1 = str.slice(0, 5);
  let part2 = str.slice(5, 10);
  return (
    part1.slice(leftShifts) +
    part1.slice(0, leftShifts) +
    part2.slice(leftShifts) +
    part2.slice(0, leftShifts)
  );
};

const p10PermutedKey = permutations(p10Positions, initialKey);
const leftShiftedKey1 = leftShiftOperation(p10PermutedKey, 1);
const p8PermutedKey = permutations(p8Positions, leftShiftedKey1);
const leftShiftedKey2 = leftShiftOperation(leftShiftedKey1, 2);
const p8PermutedKey2 = permutations(p8Positions, leftShiftedKey2);

// Key Schedule

console.log(`Initial Key: ${initialKey}`);
console.log(`Permuted Key (P10): ${p10PermutedKey}`);
console.log(`Circular Left Shift for Key 1: ${leftShiftedKey1}`);
console.log(`Permuted Key (P8): ${p8PermutedKey}`);
console.log(`Double Circular Left Shift for Key 2: ${leftShiftedKey2}`);
console.log(`Key 2 (p8): ${p8PermutedKey2}`);

// DES Algorithm

const clearText = '10000001';

// Initial Permutation

const p8permutedClearText = permutations(p8Positions4CipherText, clearText);

// Function -> fK(L, R) = (L ! F(R, SK), R)

// Expansion Permutation

const leftPart = p8permutedClearText.slice(0, 4);
const rightPart = p8permutedClearText.slice(4, 9);
const permutedRightPart = permutations(expansionPermutation, rightPart);

// XOR Operatation

const xorPermutation = (plainText, key) => {
  return ((parseInt(plainText, 2) ^ parseInt(key, 2)) >>> 0).toString(2);
};
const xoredClearTextWithKey1 = xorPermutation(permutedRightPart, p8PermutedKey);

// S-Box Operation

const outerBits = (stringHalf) => {
  return stringHalf.charAt(0) + stringHalf.slice(-1);
};

const innerBits = (stringHalf) => {
  return stringHalf.slice(1, 3);
};

// S-Box

const sboxing = (substring, sbox) => {
  const li = parseInt(outerBits(substring), 2);
  const ri = parseInt(innerBits(substring), 2);
  if (li < 0 || li > 3 || ri < 0 || ri > 3) {
    console.log('Error Indices S-box');
  }
  return sbox[li][ri].toString(2);
};

// 00 -> Inner
// 10 -> Outer

const sBox0 = [
  [1, 0, 3, 2],
  [3, 2, 1, 0],
  [0, 2, 1, 3],
  [3, 1, 3, 2],
];

const sBox1 = [
  [0, 1, 2, 3],
  [2, 0, 1, 3],
  [3, 0, 1, 0],
  [2, 1, 0, 3],
];

const xoredHalfLeftPart = xoredClearTextWithKey1.slice(0, 4);
const xoredHalfRightPart = xoredClearTextWithKey1.slice(4, 8);

const xoredHalfLeftPartInnerBits = innerBits(xoredHalfLeftPart);
const xoredHalfLeftPartOuterBits = outerBits(xoredHalfLeftPart);

const xoredHalfRightPartInnerBits = innerBits(xoredHalfRightPart);
const xoredHalfRightPartOuterBits = outerBits(xoredHalfRightPart);

const sBox0Output = filler(sboxing(xoredHalfLeftPart, sBox0), 2);
const sBox1Output = filler(sboxing(xoredHalfRightPart, sBox1), 2);

console.log(`PlainText: ${clearText}`);
console.log(`Initial Permutation: ${p8permutedClearText}`);
console.log(`Left Part: ${leftPart}`);
console.log(`Right Part: ${rightPart}`);
console.log(`Permuted/Expanded Right Part: ${permutedRightPart}`);
console.log(`Xored Right Part with Subkey 1 (P8): ${xoredClearTextWithKey1}`);

console.log(`Left Part: ${xoredHalfLeftPart}`);

console.log(`Left Part Inner Bits: ${xoredHalfLeftPartInnerBits}`);
console.log(`Left Part Outer Bits: ${xoredHalfLeftPartOuterBits}`);

console.log(`Right Part: ${xoredHalfRightPart}`);

console.log(`Right Part Inner Bits:${xoredHalfRightPartInnerBits}`);
console.log(`Right Part Outer Bits: ${xoredHalfRightPartOuterBits}`);

console.log(`S-Box0 Output: ${sBox0Output}`);
console.log(`S-Box1 Output: ${sBox1Output}`);

// Permutation (4)

const joinedSboxesOutput = sBox0Output + sBox1Output;
const p4permutationSboxesOutput = permutations(
  p4PositionsCipherText,
  joinedSboxesOutput
);

console.log(
  `Permutation P4 on S-boxes (F Function Output): ${p4permutationSboxesOutput}`
); // This is the output of the function

// XOR Operation Between

const fResult = filler(xorPermutation(p4permutationSboxesOutput, leftPart), 4);
console.log(`F-Result: ${fResult}`);
