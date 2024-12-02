import { input } from "./input.ts";

const reports = input.split("\n").map((line) => line.split(" ").map(Number));

const differences = (arr: number[]) =>
  arr.slice(1).map((val, i) => val - arr[i]);

const is_safe = (arr: number[]) => {
  let [up, down] = [true, true];
  const diffs = differences(arr);
  for (let i = 0; i < diffs.length; i++) {
    const diff = diffs[i];
    if (Math.abs(diff) > 3 || diff === 0) return false;
    if (diff > 0) down = false;
    if (diff < 0) up = false;
    if (!up && !down) break;
  }
  return up || down;
};

const part1 = reports.map((arr) => is_safe(arr)).filter(Boolean).length;

console.log(`Part1: ${part1}`);

const can_be_safe = (arr: number[]) => {
  if (is_safe(arr)) return true;

  for (let i = 0; i < arr.length; i++) {
    const newArr = [...arr.slice(0, i), ...arr.slice(i + 1)];
    if (is_safe(newArr)) return true;
  }
  return false;
};

const part2 = reports.map((arr) => can_be_safe(arr)).filter(Boolean).length;

console.log(`Part1: ${part2}`);
