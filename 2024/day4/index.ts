import { input } from "./input.ts";

const letters = input.split("\n").map((line) => line.split(""));

const search_words = (letters: string[][]) => {
    const directions = [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1],
        [-1, -1],
        [-1, 1],
        [1, -1],
        [1, 1],
    ]

    const [col, row] = [letters[0].length, letters.length];

    const is_valid = (x: number, y: number) => {
        return x >= 0 && x < col && y >= 0 && y < row;
    }

    let count = 0;
    letters.forEach((line, i) => {
        line.forEach((char, j) => {
            if (char === "X") {
                let [x, y] = [j, i];
                directions.forEach(([dx, dy]) => {
                    let [x2, y2] = [x + dx, y + dy];
                    let [x3, y3] = [x2 + dx, y2 + dy];
                    let [x4, y4] = [x3 + dx, y3 + dy];

                    if (!is_valid(x2, y2) || !is_valid(x3, y3) || !is_valid(x4, y4)) {
                        return;
                    }

                    const word = letters[y][x] + letters[y2][x2] + letters[y3][x3] + letters[y4][x4];
                    if (word === "XMAS") {
                        count++;
                    }
                })
            }
        })
    })

    return count;
}

console.log(`Part1: ${search_words(letters)}`);

const search_words2 = (letters: string[][]) => {
    const directions = [
        [[-1, -1],
        [1, 1],],
        [[-1, 1],
        [1, -1],]
    ]

    const [col, row] = [letters[0].length, letters.length];
    const is_valid = (x: number, y: number) => {
        return x >= 0 && x < col && y >= 0 && y < row;
    }

    let count = 0;

    letters.forEach((line, i) => {
        line.forEach((char, j) => {
            if (char === 'A') {
                let [x, y] = [j, i];
                directions.map(direction => {
                    let d1 = direction[0];
                    let d2 = direction[1];
                    let [x2, y2] = [x + d1[0], y + d1[1]];
                    let [x3, y3] = [x + d2[0], y + d2[1]];

                    if (!is_valid(x2, y2) || !is_valid(x3, y3)) {
                        return;
                    }
                    const word = letters[y2][x2] + letters[y][x] + letters[y3][x3];

                    if (word === "MAS" || word === "SAM") {
                        return true;
                    }
                }).every(Boolean) && count++;
            }

        })
    })
    return count;
}

console.log(`Part2: ${search_words2(letters)}`);