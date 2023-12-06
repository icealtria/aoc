def parse_input(text):
    seed, *other = text.strip().split("\n\n")
    _, seed = seed.split(":")
    seed = [int(n) for n in seed.split()]
    other = [o.split("\n")[1:] for o in other]
    return seed, other


def part1(x, other):
    for line in other:
        d, s, r = map(int, line.split())
        if s <= x < s + r:
            return d + x - s
    return x


def main():
    with open("input", "r") as f:
        seed, other = parse_input(f.read())

    part1_result = []
    for s in seed:
        for o in other:
            s = part1(s, o)
        part1_result.append(s)

    print(min(part1_result))


if __name__ == "__main__":
    main()
