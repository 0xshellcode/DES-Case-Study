const initialKey = '1010000010';
const p10Positions = [3, 5, 2, 7, 4, 10, 1, 9, 8, 6];
const p8Positions = [6, 3, 7, 4, 8, 5, 10, 9];
const p8Positions4CipherText = [2, 6, 3, 1, 4, 8, 5, 7];
const inversep8Positions4CipherText = [4, 1, 3, 5, 7, 2, 8, 6];
const expansionPermutation = [4, 1, 2, 3, 2, 3, 4, 1];

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
permutedRightPart = permutations(expansionPermutation, rightPart);

// XOR Operatation

const xorPermutation = (halfClearText, key) => {
  return ((parseInt(halfClearText, 2) ^ parseInt(key, 2)) >>> 0).toString(2);
};
const xoredClearTextWithKey1 = xorPermutation(permutedRightPart, p8PermutedKey);

// S-Box Operation

outerBits = (stringHalf) => {
  return stringHalf.charAt(0) + stringHalf.slice(-1);
};

innerBits = (stringHalf) => {
  return stringHalf.slice(1, -2);
};

// S-Box

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

xoredHalfRightPart = xoredClearTextWithKey1.slice(0, 4);
xoredHalfLeftPArt = xoredClearTextWithKey1.slice(4, 8);

xoredHaldRightPartInnerBits;

console.log(`PlainText: ${clearText}`);
console.log(`Initial Permutation: ${p8permutedClearText}`);
console.log(`Left Part: ${leftPart}`);
console.log(`Right Part: ${rightPart}`);
console.log(`Permuted/Expanded Right Part: ${permutedRightPart}`);
console.log(`Xored Right Part with Subkey 1 (P8): ${xoredClearTextWithKey1}`);

console.log(xoredClearTextWithKey1.charAt(0));
console.log(xoredClearTextWithKey1.slice(-1));

console.log(xoredClearTextWithKey1.slice(1, -1));
console.log(xoredClearTextWithKey1.slice(0, 4));
console.log(xoredClearTextWithKey1.slice(4, 8));
