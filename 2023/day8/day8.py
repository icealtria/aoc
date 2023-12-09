def parse_input(file_path):
    with open(file_path) as f:
        direction_str, node_lines = f.read().split("\n\n")

    nodes = {}
    for line in node_lines.splitlines():
        left, right = line.split(" = ")
        left = left.split(" ")[0]
        right = tuple(right.replace("(", "").replace(")", "").split(", "))
        nodes[left] = right

    return direction_str, nodes


def part1(start, nodes, directions):
    steps = 0
    curr = start

    dir_index = 0
    while curr != "ZZZ":
        steps += 1
        direction = directions[dir_index]
        dir_index = (dir_index + 1) % len(directions)
        curr = nodes[curr][1 if direction == "R" else 0]

    return steps


def part2(start_nodes, nodes, directions):
    paths = start_nodes.copy()
    path_steps = [0] * len(paths)

    for i in range(len(paths)):
        path_steps[i] += 1

        dir_index = 0
        direction = directions[dir_index]
        dir_index = (dir_index + 1) % len(directions)
        paths[i] = nodes[paths[i]][1 if direction == "R" else 0]

        while not paths[i].endswith("Z"):
            path_steps[i] += 1
            direction = directions[dir_index]
            dir_index = (dir_index + 1) % len(directions)
            paths[i] = nodes[paths[i]][1 if direction == "R" else 0]

    return path_steps


def find_lcm(numbers):
    from functools import reduce
    import math

    return reduce(lambda x, y: math.lcm(x, y), numbers, 1)


def main(file_path):
    directions, nodes = parse_input(file_path)

    start = "AAA"
    steps = part1(start, nodes, directions)
    print(steps)

    start_nodes = [n for n in nodes.keys() if n.endswith("A")]
    path_steps = part2(start_nodes, nodes, directions)

    lcm = find_lcm(path_steps)
    print(lcm)


if __name__ == "__main__":
    main("input")
