import re

with open("2023/day1/input", "r") as f:
    lines = f.read().strip().split("\n")


def extract_numbers(line: str):
    first = [c for c in line if c.isdigit()][0]
    line = line[::-1]
    last = [c for c in line if c.isdigit()][0]
    return int(first + last)


print(sum(extract_numbers(line) for line in lines))


def extract_numbers(line: str):
    pattern = r"(?:\d|one|two|three|four|five|six|seven|eight|nine|eno|owt|eerht|ruof|evif|xis|neves|thgie|enin)"

    first = re.findall(pattern, line)[0]
    last = re.findall(pattern, line[::-1])[0]

    first = c2digit(first)
    last = c2digit(last)

    return int(first + last)


def c2digit(word: str):
    word_dict = {
        "one": "1",
        "two": "2",
        "three": "3",
        "four": "4",
        "five": "5",
        "six": "6",
        "seven": "7",
        "eight": "8",
        "nine": "9",
        "eno": "1",
        "owt": "2",
        "eerht": "3",
        "ruof": "4",
        "evif": "5",
        "xis": "6",
        "neves": "7",
        "thgie": "8",
        "enin": "9",
    }

    if word in word_dict:
        return word_dict[word]
    else:
        return word


print(sum(extract_numbers(line) for line in lines))
