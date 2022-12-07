def find_distinct(s: str, n: int):
    for i in range(len(s)):
        if len(set(s[i:i+n])) == n:
            return (i+n)


if __name__ == '__main__':
    datastream = open('input', 'r').read().strip()
    print(find_distinct(datastream, 4))
    print(find_distinct(datastream, 14))
