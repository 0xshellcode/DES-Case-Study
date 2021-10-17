const initialKey = '1010000010';
const p10Positions = [3, 5, 2, 7, 4, 10, 1, 9, 8, 6];
const p8Positions = [6, 3, 7, 4, 8, 5, 10, 9];

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

console.log(`Initial Key: ${initialKey}`);
console.log(`Permuted Key (P10): ${p10PermutedKey}`);
console.log(`Circular Left Shift for Key 1: ${leftShiftedKey1}`);
console.log(`Permuted Key (P8): ${p8PermutedKey}`);

console.log(`Double Circular Left Shift for Key 2: ${leftShiftedKey2}`);
console.log(`Key 2 (p8): ${p8PermutedKey2}`);

// 1) 10000 01100
// 2) 00001 11000
// 3) 00001 11000
// 4) 1010 0100 [6 3 7 4 8 5 10 9]

// 00100 00011
