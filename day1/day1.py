f = open("input", "r")
result = max([sum(map(int, i.split('\n')))
             for i in f.read().strip().split('\n\n')])
print(result)
