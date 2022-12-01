
elves = []
with open("input.txt") as f:
    lines = f.readlines()
    currentCount = 0
    currentElf = 0
    for line in lines:
        if line.strip() == '':
            elves.append(currentCount)
            currentCount = 0
            currentElf = currentElf + 1
        else:
            currentCount = currentCount + int(line.strip())
print("Max single elf:", max(elves))
elves.sort(reverse=True)
print("Top 3 elves:", sum(elves[0:3]))
