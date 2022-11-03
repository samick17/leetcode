pub fn compress(chars: &mut Vec<char>) -> i32 {
    let mut ref_ch = ' ';
    let mut count = 0;
    let mut seq_count = 0;
    let mut vec = vec![];
    for ch in chars.iter() {
        if ref_ch == ' ' {
            seq_count += 1;
        } else if ref_ch == *ch {
            seq_count += 1;
        } else if ref_ch != *ch {
            if seq_count == 1 {
                count += 1;
                vec.push(ref_ch);
            } else {
                count += 1 + (seq_count.to_string().len() as i32);
                vec.push(ref_ch);
                let chrs: Vec<char> = seq_count.to_string().chars().collect();
                for cc in chrs {
                    vec.push(cc);
                }
            }
            seq_count = 1;
        }
        ref_ch = *ch;
    }
    if seq_count == 1 {
        count += 1;
        vec.push(ref_ch);
    } else {
        count += 1 + (seq_count.to_string().len() as i32);
        vec.push(ref_ch);
        let chrs: Vec<char> = seq_count.to_string().chars().collect();
        for cc in chrs {
            vec.push(cc);
        }
    }
    chars.clear();
    for cc in vec {
        chars.push(cc);
    }
    count
}

fn main() {
    // let v = vec![0, 2, 4, 6];
    let mut v: Vec<char> = vec!['a','a','b','b','c','c','c'];
    // let mut v: Vec<char> = vec!['a'];
    // let mut v: Vec<char> = vec!['a','b','b','b','b','b','b','b','b','b','b','b','b'];
    let count = compress(&mut v);
    // let vv: Vec<char> = v.collect();
    // println!("Output::{:?}", v);
    println!("{:?}", v);
    println!("Count::{}", count);
}
