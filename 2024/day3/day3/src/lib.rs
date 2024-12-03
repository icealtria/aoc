use regex::Regex;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn solve_part1(input: String) -> u32 {
    let mul_regex = Regex::new(r"mul\((\d{1,3}),(\d{1,3})\)").unwrap();
    mul_regex
        .captures_iter(&input)
        .filter(|captures| captures.len() >= 3)
        .map(|captures| {
            let x = captures[1].parse::<u32>().unwrap_or(0);
            let y = captures[2].parse::<u32>().unwrap_or(0);
            x * y
        })
        .sum()
}

#[wasm_bindgen]
pub fn solve_part2(input: String) -> u32 {
    let regex = Regex::new(r"(?:do\(\)|don't\(\)|mul\((\d{1,3}),(\d{1,3})\))").unwrap();

    regex
        .captures_iter(&input)
        .fold((true, 0), |(enabled, sum), cap| {
            match (cap.get(1), cap.get(2)) {
                (Some(x), Some(y)) if enabled => (
                    enabled,
                    sum + x.as_str().parse::<u32>().unwrap() * y.as_str().parse::<u32>().unwrap(),
                ),
                (None, None) => (
                    match cap.get(0).unwrap().as_str() {
                        "do()" => true,
                        "don't()" => false,
                        _ => enabled,
                    },
                    sum,
                ),
                _ => (enabled, sum),
            }
        })
        .1
}
