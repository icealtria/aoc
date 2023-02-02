package main

import (
	"bufio"
	"fmt"
	"os"
	"sort"
	"strconv"
)

func main() {
	file, err := os.Open("input")
	if err != nil {
		fmt.Println("Error opening input file", err)
	}
	defer file.Close()

	scanner := bufio.NewScanner(file)

	var calories []int
	tmp := 0
	for scanner.Scan() {
		line := scanner.Text()
		if line != "" {
			if tmp2, err := strconv.Atoi(line); err == nil {
				tmp += tmp2
			}
		} else {
			calories = append(calories, tmp)
			tmp = 0
		}
	}

	sort.Ints(calories)
	// part1
	fmt.Println(max(calories))
	// part2
	length := len(calories)
	fmt.Println(sum(calories[length-3:]))
}

func max(x []int) int {
	max := 0
	for _, v := range x {
		if v > max {
			max = v
		}
	}
	return max
}

func sum(x []int) int {
	res := 0
	for _, v := range x {
		res += v
	}
	return res
}
