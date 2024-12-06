import { input } from "./input.ts";

type Point = [number, number];
type Direction = "^" | ">" | "v" | "<";

const map = input.split("\n").map((line) => line.split(""));
const [rows, cols] = [map.length, map[0].length];
const startLine = map.findIndex((row) => row.includes("^"));
const start: Point = [startLine, map[startLine].indexOf("^")];

const directions = {
  "^": [-1, 0],
  ">": [0, 1],
  "v": [1, 0],
  "<": [0, -1],
};

const nextDirection: Record<Direction, Direction> = {
  "^": ">",
  ">": "v",
  "v": "<",
  "<": "^",
};

function getNext([row, col]: Point, direction: Direction): Point {
  const [dr, dc] = directions[direction];
  return [row + dr, col + dc];
}

function isInBounds([row, col]: Point): boolean {
  return row >= 0 && row < rows && col >= 0 && col < cols;
}

function getOriginalPath(start: Point, direction: Direction): Point[] {
  const path: Point[] = [];
  let curr = start;

  while (true) {
    path.push(curr);
    const next = getNext(curr, direction);
    if (!isInBounds(next)) {
      break;
    }
    if (map[next[0]][next[1]] === '#') {
      direction = nextDirection[direction];
    } else {
      curr = next;
    }
  }

  return path;
}

function Part1(start: Point, direction: Direction): number {
  const visited = new Set<string>();
  let curr = start;

  while (true) {
    visited.add(curr.join(","));
    const next = getNext(curr, direction);

    if (!isInBounds(next)) {
      return visited.size;
    }

    if (map[next[0]][next[1]] === '#') {
      direction = nextDirection[direction];
    } else {
      curr = next;
    }
  }
}

console.log("Part 1:", Part1(start, "^"));


function willLoop(start: Point, direction: Direction, blockPos: Point, originalPath: Point[]): boolean {
  const visited = new Set<string>();
  let curr = start;

  const maxSteps = rows * cols * 4;
  let steps = 0;

  while (steps < maxSteps) {
    const state = `${curr[0]},${curr[1]},${direction}`;
    // same position and direction indicates a loop
    if (visited.has(state)) {
      return true;
    }
    visited.add(state);

    const next = getNext(curr, direction);
    if (!isInBounds(next)) {
      return false;
    }

    if (next[0] === blockPos[0] && next[1] === blockPos[1] || map[next[0]][next[1]] === '#') {
      direction = nextDirection[direction];
    } else {
      curr = next;
    }
    steps++;
  }

  return true;
}

function Part2(): number {
  const originalPath = getOriginalPath(start, "^");
  let count = 0;

  const seen = new Set<string>();
  for (const [row, col] of originalPath) {
    const key = `${row},${col}`;
    if (!seen.has(key) && map[row][col] === '.' && !(row === start[0] && col === start[1])) {
      seen.add(key);
      if (willLoop(start, "^", [row, col], originalPath)) {
        count++;
      }
    }
  }

  return count;
}

console.log("Part 2:", Part2());