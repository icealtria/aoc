import { input } from "./input.ts";

const equations = input.split("\n").map((line) => {
  const [v, ...numbers] = line.split(":").map((part) => part.trim());
  return {
    v: parseInt(v),
    numbers: numbers[0] ? numbers[0].split(" ").map(Number) : [],
  };
});

const can_equal = (v: number, numbers: number[]): boolean => {
  if (numbers.length === 1) return numbers[0] === v;
  const mul = numbers[0] * numbers[1];
  const add = numbers[0] + numbers[1];
  return can_equal(v, [mul, ...numbers.slice(2)]) ||
    can_equal(v, [add, ...numbers.slice(2)]);
};

const part1 = equations
  .reduce((sum, { v, numbers }) => sum + (can_equal(v, numbers) ? v : 0), 0);

console.log(`Part 1: ${part1}`);

const can_equal2 = (v: number, numbers: number[]): boolean => {
  if (numbers.length === 1) return numbers[0] === v;
  const mul = numbers[0] * numbers[1];
  const add = numbers[0] + numbers[1];
  // const concat = +`${numbers[0]}${numbers[1]}`;
  const concat = numbers[0] * Math.pow(10, Math.floor(Math.log10(numbers[1]) + 1)) + numbers[1];
  return can_equal2(v, [concat, ...numbers.slice(2)]) ||
    can_equal2(v, [mul, ...numbers.slice(2)]) ||
    can_equal2(v, [add, ...numbers.slice(2)]);
};

const part2 = equations
  .reduce((sum, { v, numbers }) => sum + (can_equal2(v, numbers) ? v : 0), 0);

console.log(`Part 2: ${part2}`);
