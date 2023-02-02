use std::fs;

fn main() {
    let content = fs::read_to_string("input").expect("Should have been able to read the file");

    let calories: Vec<&str> = content.trim().split("\n\n").collect();

    // part1
    let mut calories: Vec<i32> = calories
        .iter()
        .map(|s| s.split('\n').map(|line| line.parse::<i32>().unwrap()).sum())
        .collect();
    let part1 = calories.iter().max().unwrap();
    println!("part1 result: {part1}");

    // part2
    let len = calories.len();
    calories.sort();
    let part2: i32 = calories[len - 3..].iter().sum();
    println!("part2 result: {part2}");
}
