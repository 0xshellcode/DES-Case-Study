export const permutations = (permutedPositions, stringToPermute) => {
  const result = permutedPositions.map( itr => stringToPermute[itr - 1]).join('');
  return result;
};

export const leftShiftOperation = (str, leftShifts) => {
  let part1 = str.slice(0, 5);
  let part2 = str.slice(5, 10);
  return circularShift(part1, leftShifts)+circularShift(part2, leftShifts);
};

const circularShift = (str, index) => {
  let rotated= ''
  for(let i=index; i< str.length;i++){
    rotated+=str[i];
  }
  for(let i=0; i< index;i++){
    rotated+=str[i];
  }
  return rotated;
}


