const legend = {
  a: 10,
  b: 11,
  c: 12,
  d: 13,
  e: 14,
  f: 15,
};

// input: 1 character string that is a valid hexadecimal character
// output: a number between 0 and 15
export function toDecimal(hexAsStr) {
  if (typeof hexAsStr === "undefined") {
    return 0;
  }
  const number = Number(hexAsStr);
  if (typeof number === "number" && number < 16 && number >= 0) {
    return number;
  } else if (legend[hexAsStr]) {
    return legend[hexAsStr];
  } else {
    // this is for any character that's defined but not valid hexadecimal character.
    throw new Error(hexAsStr + " not a valid hex value"); //I wouldn't actually throw error here in a real application. Just easier in an assignment like this with so much of the calculations happening in the background.
  }
}

// input 2 decimals
// output: sum of the 2 decimals
export function addDecimal(num1, num2, num3) {
  return num1 + num2 + num3;
}

// input: 1 decimal
// output: 1 hexadecimal of the same value
export function toHex(number) {
  switch (true) {
    case number < 10:
      return number;
    case number === 10:
      return "a";
    case number === 11:
      return "b";
    case number === 12:
      return "c";
    case number === 13:
      return "d";
    case number === 14:
      return "e";
    case number === 15:
      return "f";
    default:
      throw new Error(number + " cannot convert to hex value");
  }
}

// input: a decimal
// output: [carryOver: decimal, remainder: hex]
export function calcRemaining(num) {
  if (num > 15) {
    const carryOver = Math.floor(num / 16);
    return [carryOver, toHex(num % 16)];
  } else {
    return [0, toHex(num)];
  }
}

/*
  go column by column, in reverse order
  convert both hex char to decimal
  add 2 decimals together
  calculate integer and remainder
  concat remainder to result
  update carryover with integer
  add each column with each other
*/

export function addHex(hex1, hex2) {
  let p1 = hex1.length - 1;
  let p2 = hex2.length - 1;
  let carryOver = 0;
  let result = "";
  while (p1 >= 0 && p2 >= 0) {
    const num1 = toDecimal(hex1[p1]);
    const num2 = toDecimal(hex2[p2]);
    const sum = addDecimal(num1, num2, carryOver);
    const [newCarryOver, remainder] = calcRemaining(sum);
    carryOver = newCarryOver;
    result = remainder + result;
    p1--;
    p2--;
  }
  const extra = p1 > p2 ? hex1[p1] : hex2[p2];
  const newVal = toDecimal(extra) + carryOver;
  const newHex = toHex(newVal);
  if (extra) {
    result = newHex + result;
  }
  return result;
}

// const answer = addHex("8a", "b78"); // expects C02
// console.log(answer === "c02" ? "correct" : `!! ${answer} was incorrect`);

// const answer2 = addHex("1f4a8d20", "3d1a334d"); // expect 5c64c06d
// console.log(answer2 === "5c64c06d" ? "correct" : `!! ${answer2} was incorrect`);
