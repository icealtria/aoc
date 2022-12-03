Shape = ('rock', 'paper', 'scissor')
D = {Shape: i+1 for i, Shape in enumerate(Shape)}
lose_case = [['rock', 'scissor'], ['scissor', 'paper'], ['paper', 'rock']]
win_case = [[x,lose_case[(i+1)%3][1]] for i, (x, y) in enumerate(lose_case)]

CTS = {
    'X': Shape[0],
    'A': Shape[0],
    'Y': Shape[1],
    'B': Shape[1],
    'Z': Shape[2],
    'C': Shape[2]
}

def ScoreRound(oppo: str, me: str) -> int:
    if [oppo, me] in win_case:
        score = 6
    elif oppo == me:
        score = 3
    else:
        score = 0
    return D[me] + score

def ScoreRound2(oppo:str, y) -> int:
    if y == 'X':
        return D[dict(lose_case)[oppo]]
    elif y == 'Y':
        return D[oppo] + 3
    else:
        return D[dict(win_case)[oppo]] + 6 

f = open("input", "r")
game = [r.split(' ') for r in f.read().strip().split('\n')]
print(sum(ScoreRound(CTS[x], CTS[y]) for x, y in game))
print(sum(ScoreRound2(CTS[x], y) for x, y in game))
