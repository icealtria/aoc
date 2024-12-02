import { input } from "./day1input.ts";
import { Counter } from "../utils.ts";

const [left, right] = input.split("\n").reduce(([l, r], line) => {
  const [a, b] = line.split("   ");
  return [
    [...l, parseInt(a)],
    [...r, parseInt(b)],
  ];
}, [[], []] as number[][]);

// Part 1
const sortedLeft = [...left].sort((a, b) => a - b);
const sortedRight = [...right].sort((a, b) => a - b);

const distance = sortedLeft.reduce(
  (sum, l, i) => sum + Math.abs(l - sortedRight[i]),
  0,
);

console.log(`Part 1: ${distance}`);

// Part 2
const rightCounter = new Counter();

right.forEach((r) => rightCounter.add(r));

const part2 = left.reduce((sum, l) => sum + l * rightCounter.get(l), 0);

console.log(`Part 2: ${part2}`);
