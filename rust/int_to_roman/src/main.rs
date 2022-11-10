struct Solution {}

impl Solution {
    fn int_to_roman(num: i32) -> String {
        if num >= 1000 {
            return format!("{}{}", "M", &Solution::int_to_roman(num - 1000));
        } else if num >= 900 {
            return format!("{}{}", "CM", &Solution::int_to_roman(num - 900));
        } else if num >= 500 {
            return format!("{}{}", "D", &Solution::int_to_roman(num - 500));
        } else if num >= 400 {
            return format!("{}{}", "CD", &Solution::int_to_roman(num - 400));
        } else if num >= 100 {
            return format!("{}{}", "C", &Solution::int_to_roman(num - 100));
        } else if num >= 90 {
            return format!("{}{}", "XC", &Solution::int_to_roman(num - 90));
        } else if num >= 50 {
            return format!("{}{}", "L", &Solution::int_to_roman(num - 50));
        } else if num >= 40 {
            return format!("{}{}", "XL", &Solution::int_to_roman(num - 40));
        } else if num >= 10 {
            return format!("{}{}", "X", &Solution::int_to_roman(num - 10));
        } else if num >= 9 {
            return format!("{}{}", "IX", &Solution::int_to_roman(num - 9));
        } else if num >= 5 {
            return format!("{}{}", "V", &Solution::int_to_roman(num - 5));
        } else if num >= 4 {
            return format!("{}{}", "IV", &Solution::int_to_roman(num - 4));
        } else if num >= 1 {
            return format!("{}{}", "I", &Solution::int_to_roman(num - 1));
        } else {
            return String::from("");
        }
    }
}

fn main() {
    println!("{}", Solution::int_to_roman(3));
    println!("{}", Solution::int_to_roman(58));
    println!("{}", Solution::int_to_roman(1994));
}
