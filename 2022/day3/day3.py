# set will return the unique characters in your string.
# set.intersection method will return the characters which are common in both the sets.

from functools import reduce


def split_into_two(s: str):
    """
    >>> Split_into_two('abcd')
    ['ab', 'cd']
    """
    i = len(s)//2
    return [s[:i], s[i:]]


def find_same(*bag):
    return reduce(lambda a, b: set(a) & set(b), bag).pop()


content = open('input', 'r').read().strip()

char_to_number = {chr(c): i+1 for i, c in enumerate(range(97, 123))}
char_to_number.update({chr(c): i+27 for i, c in enumerate(range(65, 91))})
rucksacks = [i for i in content.split('\n')]

# part 1
rucksacks1 = [split_into_two(i) for i in rucksacks]
same_char = [find_same(a, b) for a, b in rucksacks1]
print(sum([char_to_number[c] for c in same_char]))

# part 2
x = iter(rucksacks)
same_char = [find_same(x, y, z) for x, y, z in zip(*[x, x, x])]
print(sum([char_to_number[c] for c in same_char]))