import { input } from './input.ts';

const isDivisible = (a: number, b: number): boolean => (a > b ? a % b === 0 : b % a === 0);

const determinant = ([[a, b], [c, d]]: number[][]): number => a * d - b * c;

const invertMatrix = ([[a, b], [c, d]]: number[][]): number[][] => [[d, -b], [-c, a]];

const extractNumbers = (regex: RegExp, text: string): number[] =>
    (regex.exec(text)?.slice(1).map(Number)) || [];

const parseCoordinates = (info: string, regex: RegExp): [number, number] =>
    extractNumbers(regex, info) as [number, number];

const calculateCost = (matrix: number[][], prizeX: number, prizeY: number): number => {
    const det = determinant(matrix);

    if (det === 0 && !(isDivisible(prizeX, matrix[0][0]) && isDivisible(prizeY, matrix[1][0]))) {
        return 0;
    }

    const invertedMatrix = invertMatrix(matrix);
    const [a, b] = invertedMatrix.map(([x, y]) => (x * prizeX + y * prizeY) / det);

    return a >= 0 && b >= 0 && Number.isInteger(a) && Number.isInteger(b) ? a * 3 + b : 0;
};

const solve = (input: string[], offset = 0): number =>
    input.reduce((totalCost, machines) => {
        const [aInfo, bInfo, prizeInfo] = machines.split("\n");

        const [aX, aY] = parseCoordinates(aInfo, /Button A: X\+(\d+), Y\+(\d+)/);
        const [bX, bY] = parseCoordinates(bInfo, /Button B: X\+(\d+), Y\+(\d+)/);
        const [prizeX, prizeY] = extractNumbers(/X=(\d+), Y=(\d+)/, prizeInfo).map(x => x + offset);

        return totalCost + calculateCost([[aX, bX], [aY, bY]], prizeX, prizeY);
    }, 0);

const ips = input.split("\n\n");
console.log(solve(ips));
console.log(solve(ips, 10_000_000_000_000));
