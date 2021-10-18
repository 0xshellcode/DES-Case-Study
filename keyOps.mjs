export const permutations = (permutedPositions, stringToPermute) => {
  const result = permutedPositions.map( itr => stringToPermute[itr - 1]).join('');
  return result;
};

export const leftShiftOperation = (str, leftShifts) => {
  let part1 = str.slice(0, 5);
  let part2 = str.slice(5, 10);
  return (
    part1.slice(leftShifts) +
    part1.slice(0, leftShifts) +
    part2.slice(leftShifts) +
    part2.slice(0, leftShifts)
  );
};

