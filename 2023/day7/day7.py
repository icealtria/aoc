from functools import cmp_to_key
from collections import Counter


def translate_cards(hand):
    return hand.translate(str.maketrans("TJQKA", "ABCDE"))


def hand_type(hand):
    counter = Counter(hand)
    jokers = counter.pop("*", 0)

    counts = [0] if jokers == 5 else sorted(counter.values())
    counts[-1] += jokers

    match counts:
        case *_, 5:
            return 7
        case *_, 4:
            return 6
        case *_, 2, 3:
            return 5
        case *_, 3:
            return 4
        case *_, 2, 2:
            return 3
        case *_, 2:
            return 2
    return 1


def compare_hands(hand1, hand2):
    type1, type2 = hand_type(hand1[0]), hand_type(hand2[0])
    return (type1 > type2) - (type1 < type2) or (hand1 > hand2) - (hand1 < hand2)


def process_hands(hands):
    hands.sort(key=cmp_to_key(compare_hands))
    return sum(bid * rank for rank, (_, bid) in enumerate(hands, start=1))


def main():
    with open("input") as file:
        lines = file.read().strip().split("\n")

    hands = [(translate_cards(line.split()[0]), int(line.split()[1])) for line in lines]

    part1 = process_hands(hands)
    part2 = process_hands([(hand.replace("B", "*"), bid) for hand, bid in hands])

    print(part1, part2)


if __name__ == "__main__":
    main()
