with open("input", "r") as f:
    lines = f.read().strip().split("\n")

card_wins = []

for line in lines:
    card_num, numbers = line.split(":")
    winning_nums, all_nums = [nums.split() for nums in numbers.split("|")]
    card_wins.append(len(set(winning_nums) & set(all_nums)))

print(sum(pow(2, win - 1) if win > 0 else 0 for win in card_wins))

cards = [1] * len(card_wins)
for i, n in enumerate(card_wins):
    for j in range(n):
        cards[i + j + 1] += cards[i]

print(sum(cards))
