use std::env;
use std::fs;

fn main() {
    let content = fs::read_to_string("input").expect("Should have been able to read the file");

    let v: Vec<&str> = content.split("\n\n").collect();
    println!("{:?}", v);
}
