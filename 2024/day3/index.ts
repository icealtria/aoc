import { solve_part1, solve_part2 } from "./day3/pkg/day3.js";

const input = await Deno.readTextFile("./day3/input");

console.log(solve_part1(input));


console.log(solve_part2(input));