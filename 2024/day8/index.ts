import { input } from "./input.ts";

type Point = [number, number];

const grid = input.split("\n").map((line) => line.split(""));
const dims = [grid[0].length, grid.length] as const;

const getAntennas = (grid: string[][]): Map<string, Point[]> =>
  grid.reduce((map, row, y) => {
    row.forEach((freq, x) => {
      if (freq !== ".") {
        const points = map.get(freq) ?? [];
        points.push([x, y]);
        map.set(freq, points);
      }
    });
    return map;
  }, new Map<string, Point[]>());

const isValid = ([x, y]: Point): boolean =>
  x >= 0 && x < dims[0] && y >= 0 && y < dims[1];

const pointKey = ([x, y]: Point): string => `${x},${y}`;

const solvePart1 = (): number => {
  const antinodes = new Set<string>();
  const antennas = getAntennas(grid);

  for (const points of antennas.values()) {
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        const [x1, y1] = points[i];
        const [x2, y2] = points[j];
        const nodes = [
          [x1 + 2 * (x2 - x1), y1 + 2 * (y2 - y1)],
          [x2 + 2 * (x1 - x2), y2 + 2 * (y1 - y2)],
        ] as Point[];

        nodes.filter(isValid).forEach((p) => antinodes.add(pointKey(p)));
      }
    }
  }

  return antinodes.size;
};

console.log("Part 1:", solvePart1());

const solvePart2 = (): number => {
  const points = new Set<string>();
  const antennas = getAntennas(grid);

  for (const group of antennas.values()) {
    group.forEach((p) => points.add(pointKey(p)));

    for (const [x1, y1] of group) {
      for (const [x2, y2] of group) {
        if (x1 === x2 && y1 === y2) continue;

        const [dx, dy] = [x1 - x2, y1 - y2];
        let [x, y] = [x1 + dx, y1 + dy];

        while (isValid([x, y])) {
          points.add(pointKey([x, y]));
          x += dx;
          y += dy;
        }
      }
    }
  }

  return points.size;
};

console.log("Part 2:", solvePart2());
