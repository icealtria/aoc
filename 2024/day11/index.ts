import { input } from "./input.ts"

const nums = input.split(" ").map(Number);

const memo = new Map<string, number>();

const solve = (num: number, depth: number): number => {
    const key = `${num},${depth}`;
    if (memo.has(key)) {
        return memo.get(key)!;
    }

    if (depth === 0) return 1;
    if (num === 0) return solve(1, depth - 1);

    const digits = num.toString().length;
    let result: number;

    if (digits % 2 === 0) {
        const divisor = 10 ** (digits / 2);
        const left = Math.floor(num / divisor);
        const right = num % divisor;
        result = solve(left, depth - 1) + solve(right, depth - 1);
    } else {
        result = solve(num * 2024, depth - 1);
    }

    memo.set(key, result);
    return result;
};

let total = 0;
for (const num of nums) {
    total += solve(num, 75);
}

console.log(total);
