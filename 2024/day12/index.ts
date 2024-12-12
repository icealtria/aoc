import { input } from "./input.ts";

function part1(input: string): number {
    const map = input.trim().split('\n').map(line => [...line]);
    const visited = new Set<string>();
    let total = 0;

    const dirs = [[0, -1], [0, 1], [-1, 0], [1, 0]];

    function calculate(x: number, y: number): number {
        const type = map[y][x];
        const queue = [[x, y]];
        let area = 0;
        let sides = 0;

        while (queue.length) {
            const [cx, cy] = queue.shift()!;
            const key = `${cx},${cy}`;
            if (visited.has(key)) continue;
            visited.add(key);
            area++;

            for (const [dx, dy] of dirs) {
                const nx = cx + dx, ny = cy + dy;
                if (nx >= 0 && nx < map[0].length && ny >= 0 && ny < map.length) {
                    if (map[ny][nx] === type && !visited.has(`${nx},${ny}`)) {
                        queue.push([nx, ny]);
                    } else if (map[ny][nx] !== type) {
                        sides++;
                    }
                } else {
                    sides++;
                }
            }
        }

        return sides * area;
    }

    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[0].length; x++) {
            if (!visited.has(`${x},${y}`)) {
                total += calculate(x, y);
            }
        }
    }

    return total;
}

console.log(part1(input));