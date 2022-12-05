import re
import copy


def to_stacks(s):
    stacks = [[] for _ in range(9)]
    stacks_str = s.split('\n')
    stacks_str.reverse()
    for line in stacks_str:
        for i, s in enumerate(line):
            if s.isupper():
                stacks[i//4].append(s)
    return stacks


def split_command(s):
    pattern = r'\d+'
    return list(map(int, re.findall(pattern, s)))


def CrateMover_9000(command, stacks: list):
    n, s, d = split_command(command)
    for _ in range(n):
        stacks[d-1].append(stacks[s-1].pop())


def CrateMover_9001(command, stacks: list):
    n, s, d = split_command(command)
    stacks[d-1].extend(stacks[s-1][-n:])
    [stacks[s-1].pop() for _ in range(n)]


if __name__ == '__main__':
    content = open('input', 'r').read()
    stacks, procedures = content.split('\n\n')
    procedures = procedures.strip().split('\n')

    stacks = to_stacks(stacks)
    stacks_clone = copy.deepcopy(stacks)

    # part 1
    [CrateMover_9000(c, stacks) for c in procedures]
    print(''.join([i.pop() for i in stacks]))

    # part 2
    [CrateMover_9001(c, stacks_clone) for c in procedures]
    print(''.join([i.pop() for i in stacks_clone]))
