import { exectime } from "../utils.ts";
import { input } from "./input.ts";

const part1 = (input: string) => {
  const disk = input.split("").reduce((res, number, i) => {
    const n = Number(number);
    if ((i % 2) === 0) {
      return res.concat(new Array<number>(n).fill(i / 2));
    }
    return res.concat(new Array<number | null>(n).fill(null));
  }, new Array<number | null>());

  let [left, right] = [0, disk.length - 1];
  while (left <= right) {
    if (disk[left] !== null) {
      left++;
    } else if (disk[right] === null) {
      right--;
    } else {
      disk[left] = disk[right];
      disk[right] = null;
      left++;
      right--;
    }
  }
  return disk.reduce((sum: number, num, i) => {
    if (num === null) return sum;
    return sum + num * i;
  }, 0);
};

console.log("Part 1:", exectime(part1, input));

function part2(input: string): number {
  const numbers = input.split('').map(Number);
  const blocks: (number | null)[] = [];
  let fileId = 0;
  const filePositions: Map<number, number[]> = new Map();
  let pos = 0;

  for (let i = 0; i < numbers.length; i++) {
    const length = numbers[i];
    if (i % 2 === 0) {
      const positions: number[] = [];
      for (let j = 0; j < length; j++) {
        blocks.push(fileId);
        positions.push(pos + j);
      }
      filePositions.set(fileId, positions);
      fileId++;
      pos += length;
    } else {
      for (let j = 0; j < length; j++) {
        blocks.push(null);
        pos++;
      }
    }
  }

  for (let id = fileId - 1; id >= 0; id--) {
    const positions = filePositions.get(id)!;
    const fileSize = positions.length;

    let targetStart = -1;
    let consecutiveFree = 0;

    for (let i = 0; i < positions[0]; i++) {
      if (blocks[i] === null) {
        consecutiveFree++;
        if (consecutiveFree === fileSize) {
          targetStart = i - fileSize + 1;
          break;
        }
      } else {
        consecutiveFree = 0;
      }
    }

    if (targetStart >= 0) {
      for (const pos of positions) {
        blocks[pos] = null;
      }
      for (let i = 0; i < fileSize; i++) {
        blocks[targetStart + i] = id;
      }
    }
  }

  return blocks.reduce((sum: number, block, index) => {
    if (block === null) return sum;
    return sum + (index * block);
  }, 0);
}

console.log("Part 2:", exectime(part2, input));
