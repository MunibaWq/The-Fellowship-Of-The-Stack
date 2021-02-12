let n = [1, 2, 3, 4, 5];
let m = [...n];
m[1] = 0;
n = m;
console.log(n);
