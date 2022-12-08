/**
 * @param {number[]} arr
 * @return {number}
 */
var minSetSize = function(arr) {
    let sets = {};
    for(let i = 0; i < arr.length; i++) {
        let e = arr[i];
        sets[e] = sets[e] || 0;
        sets[e] += 1;
    }
    let nums = [];
    for(let i in sets) {
        nums.push(sets[i]);
    }
    nums.sort();
    let count = arr.length;
    let goal = count / 2;
    let result = 0;
    let flag = true;
    while(count > goal) {
        if(flag) {
            count -= nums.splice(nums.length - 1, 1)[0];
            result += 1;
        }
    }
    return result;
};
