Shape = ('rock', 'paper', 'scissor')
D = {Shape: i+1 for i, Shape in enumerate(Shape)}
win_case = [['rock', 'scissor'], ['scissor', 'paper'], ['paper', 'rock']]


def scoring(oppo: str, me: str) -> int:
    oppo, me = CharToShap(oppo), CharToShap(me)
    if [me, oppo] in win_case:
        score = 6
    elif oppo == me:
        score = 3
    else:
        score = 0
    return D[me] + score


def CharToShap(char):
    """
    >>> CharToShap('A')
    'Rock'
    >>> CharToShap('B')
    'Paper'
    >>> CharToShap('C')
    'Scissors'
    """
    match char:
        case 'X':
            return Shape[0]
        case 'A':
            return Shape[0]
        case 'Y':
            return Shape[1]
        case 'B':
            return Shape[1]
        case 'Z':
            return Shape[2]
        case 'C':
            return Shape[2]


def main():
    f = open("input", "r")
    game = [r.split(' ') for r in f.read().strip().split('\n')]
    print(sum(scoring(x, y) for x, y in game))


if __name__ == "__main__":
    main()
