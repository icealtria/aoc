import numpy as np
import contextlib


def calc_visibility(grid):
    rows, cols = grid.shape
    mark = np.empty_like(grid, dtype=bool)
    for _ in range(4):
        for i in range(rows):
            highest = -1
            for j in range(cols):
                if grid[i][j] > highest:
                    highest = grid[i][j]
                    mark[i][j] = True
                else:
                    continue
        grid = np.rot90(grid)
        mark = np.rot90(mark)
    return mark.sum()


def calc_score(grid):
    rows, cols = grid.shape
    score = 0
    for i in range(rows):
        for j in range(cols):
            score = max(
                get_treeline_visibility(np.flip(grid[:i+1, j]))
                * get_treeline_visibility(grid[i:, j])
                * get_treeline_visibility(np.flip(grid[i, :j+1]))
                * get_treeline_visibility(grid[i, j:]), score)
    return score


def get_treeline_visibility(tree_line):
    visibility = np.logical_and.accumulate(
        (tree_line < np.maximum.accumulate(tree_line))[1:]
    )
    with contextlib.suppress(IndexError):
        visibility[np.where(~visibility)[0][0]] = True
    return visibility.sum()


if __name__ == '__main__':
    grid = open('input', 'r').read().splitlines()
    grid = [[int(c) for c in r] for r in grid]
    grid = np.array(grid, int)
    print(calc_visibility(grid))
    print(calc_score(grid))
