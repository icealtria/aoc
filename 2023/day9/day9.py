def calc_next(values):
    if not values:
        return 0
    diff = [b - a for a, b in zip(values[:-1], values[1:])]
    return values[-1] + calc_next(diff)


def calc_pre(values):
    if not values:
        return 0
    diff = [b - a for a, b in zip(values[:-1], values[1:])]
    return values[0] - calc_pre(diff)


def main():
    with open("input") as file:
        lines = [list(map(int, line.split())) for line in file.readlines()]

    part1 = sum(map(calc_next, lines))
    part2 = sum(map(calc_pre, lines))

    print(f"Part 1: {part1}")
    print(f"Part 2: {part2}")


if __name__ == "__main__":
    main()
