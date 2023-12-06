import math


def win_ways(race_dur, rec_dist):
    win_count = 0

    for hold in range(1, race_dur):
        travel = race_dur - hold
        spd = hold
        dist = spd * travel

        if dist > rec_dist:
            win_count += 1

    return win_count


def math_way(total_time, current_record):
    delta = (total_time**2) - (4 * current_record)
    root1 = math.ceil((total_time - math.sqrt(delta)) / 2)
    root2 = math.floor((total_time + math.sqrt(delta)) / 2)
    return int(root2 - root1 + 1)


dur = [52, 94, 75, 94]
dist = [426, 1374, 1279, 1216]

part1 = math.prod(math_way(race_dur, rec_dist) for race_dur, rec_dist in zip(dur, dist))
print(part1)

dur = int("".join(map(str, dur)))
dist = int("".join(map(str, dist)))

part2 = math_way(dur, dist)
print(part2)
