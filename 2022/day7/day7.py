def cd(folders: dict, path: str, curr: list):
    if path == '..':
        if curr:
            curr.pop()
    elif path == '/':
        curr.clear()
    else:
        curr.extend(path.split('/'))
    folders[pwd(curr)] = None


def pwd(curr: str):
    return '/'.join(curr)


def calc_size(folders: dict, files: list):
    for folder in folders:
        fsize = 0
        for file in files:
            if file.startswith(folder):
                fsize += files[file]
        folders[folder] = fsize


if __name__ == '__main__':
    s = open('input', 'r').read().strip()
    files = {}
    folders = {}
    curr = []

    for cmd in s.splitlines():
        if cmd.startswith("$"):
            cmd = cmd.split()
            if cmd[1] == 'cd':
                cd(folders, cmd[2], curr)
            else:
                continue
        elif cmd.startswith("dir"):
            continue
        else:
            size, name = cmd.split(' ')
            files[pwd(curr+[name])] = int(size)

    calc_size(folders, files)
    # part 1
    print(sum([v for v in folders.values() if v <= 100000]))
    # part 2
    unused = 70000000 - folders['']
    print(min([v for v in folders.values() if unused + v > 30000000]))
