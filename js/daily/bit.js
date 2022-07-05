let number = 123.273691;
// 固定2位小数
number.toFixed(2);

// 最多2位小数
let bit = Math.pow(10, 2);
Math.round(number * bit) / bit;