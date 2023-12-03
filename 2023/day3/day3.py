from collections import defaultdict
import itertools
import math
import re

with open("input") as f:
    lines = f.read()

lines = lines.strip().split("\n")

box = list(itertools.product((-1, 0, 1), (-1, 0, 1)))

board = {(i, j): lines[i][j] for i in range(len(lines)) for j in range(len(lines[0]))}

symbols = {x for x in board if board[x] != "." and not board[x].isdigit()}

part_sum = 0
parts_by_symbol = defaultdict(list)

for i, l in enumerate(lines):
    for match in re.finditer(r"\d+", l):
        n = int(match.group(0))
        boundary = {
            (i + di, j + dj)
            for di, dj in box
            for j in range(match.start(), match.end())
        }

        if symbols & boundary:
            part_sum += n
        for symbol in symbols & boundary:
            parts_by_symbol[symbol].append(n)

print(part_sum)
print(sum(math.prod(v) for v in parts_by_symbol.values() if len(v) == 2))
