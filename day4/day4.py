import re



def is_subset(a, b, x, y):
    i = a - x
    j = b - y
    return (i >= 0 and j <= 0) or (i <= 0 and j >= 0)


def overlap_count(a, b, x, y):
    i = set(range(a, b+1))
    j = set(range(x, y+1))
    return any(i & j)


if __name__ == '__main__':
    content = open('input', 'r').read().strip()
    pattern = r'\d+'
    lst = list(map(int, re.findall(pattern, content)))
    assignments = [list(g) for g in zip(*[iter(lst)]*4)]
    print(sum([is_subset(a, b, x, y) for a, b, x, y in assignments]))
    print(sum([overlap_count(a, b, x, y) for a, b, x, y in assignments]))