import { input } from "./input.ts";

const lines = input.split("\n");

type Point = [number, number];

function parseMap(map: string[]): Point[] {
    return map.flatMap((row, rowIndex) =>
        Array.from(row, (_, colIndex) => (row[colIndex] === '0' ? [rowIndex, colIndex] as Point : null))
            .filter((point): point is Point => point !== null)
    );
}

function bfs(map: string[], start: Point, condition: (height: number) => boolean): Set<string> {
    const height = map.length;
    const width = map[0].length;
    const visited = new Set<string>();
    const queue = [{ point: start, currentHeight: 0 }];
    const reachable = new Set<string>();

    while (queue.length > 0) {
        const { point, currentHeight } = queue.shift()!;
        const [row, col] = point;
        const key = `${row},${col}`;

        if (visited.has(key)) continue;
        visited.add(key);

        if (condition(parseInt(map[row][col]))) {
            reachable.add(key);
        }

        const directions: Point[] = [[-1, 0], [1, 0], [0, -1], [0, 1]];
        for (const [dr, dc] of directions) {
            const newRow = row + dr;
            const newCol = col + dc;
            if (newRow >= 0 && newRow < height && newCol >= 0 && newCol < width) {
                const nextHeight = parseInt(map[newRow][newCol]);
                if (nextHeight === currentHeight + 1) {
                    queue.push({ point: [newRow, newCol], currentHeight: nextHeight });
                }
            }
        }
    }

    return reachable;
}

function part1(map: string[]): number {
    const trailheads = parseMap(map);
    return trailheads.reduce((total, start) => total + bfs(map, start, height => height === 9).size, 0);
}

console.log("Part 1:", part1(lines));


function part2(map: string[]): number {
    const trailheads = parseMap(map);
    const cache = new Map<string, number>();

    function countPaths(point: Point, currentHeight: number): number {
        const key = `${point[0]},${point[1]},${currentHeight}`;
        if (cache.has(key)) return cache.get(key)!;

        if (parseInt(map[point[0]][point[1]]) === 9) {
            return 1;
        }

        let paths = 0;
        const directions: Point[] = [[-1, 0], [1, 0], [0, -1], [0, 1]];
        for (const [dr, dc] of directions) {
            const [newRow, newCol] = [point[0] + dr, point[1] + dc];
            if (newRow >= 0 && newRow < map.length && newCol >= 0 && newCol < map[0].length) {
                const nextHeight = parseInt(map[newRow][newCol]);
                if (nextHeight === currentHeight + 1) {
                    paths += countPaths([newRow, newCol], nextHeight);
                }
            }
        }

        cache.set(key, paths);
        return paths;
    }

    return trailheads.reduce((total, start) => total + countPaths(start, 0), 0);
}

console.log("Part 2:", part2(lines));
