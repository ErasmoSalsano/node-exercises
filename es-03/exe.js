const {sum} = require('./fun.js')

const first = 10;
const second = 15;
const third = [2, 5, 7];

console.log(sum(first, second, ...third))
