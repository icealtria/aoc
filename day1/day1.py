f = open("input", "r")
# part 1
calories = [sum(map(int, i.split('\n')))
             for i in f.read().strip().split('\n\n')]
print(max(calories))

# part 2

print(sum(sorted(calories)[-3:]))