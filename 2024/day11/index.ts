import { input } from "./input.ts";

const nums = input.split(" ").map(Number);

const solve = (num: number, depth: number, memo: Map<string, number> = new Map()): number => {
    const key = `${num},${depth}`;
    if (memo.has(key)) {
        return memo.get(key)!;
    }

    if (depth === 0) return 1;
    if (num === 0) return solve(1, depth - 1, memo);

    const digits = num.toString().length;
    let result: number;

    if (digits % 2 === 0) {
        const divisor = 10 ** (digits / 2);
        const left = Math.floor(num / divisor);
        const right = num % divisor;
        result = solve(left, depth - 1, memo) + solve(right, depth - 1, memo);
    } else {
        result = solve(num * 2024, depth - 1, memo);
    }

    memo.set(key, result);
    return result;
};

console.log(nums.reduce((acc, num) => acc + solve(num, 25), 0));
console.log(nums.reduce((acc, num) => acc + solve(num, 75), 0));
