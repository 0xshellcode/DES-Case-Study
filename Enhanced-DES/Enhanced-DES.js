let initialKey = '1010000010';
const p10Positions = [3, 5, 2, 7, 4, 10, 1, 9, 8, 6];

let newKey = p10Positions.map((newPosition) => {
  let tempArray = [];

  console.log([...initialKey][newPosition - 1]);
  tempArray.push([...initialKey][newPosition - 1]);

  return tempArray;
});

let newJoinedKey = newKey.join('');

console.log(`Initial Key: ${initialKey}`);
console.log(`New Key: ${newJoinedKey}`);
