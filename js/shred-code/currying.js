function curryingAdd() {
    //定义数组存储所有的参数
    var args = Array.prototype.slice.call(arguments);
    //利用闭包特性保存所有的参数
    var adder = function () {
        args.push(...arguments);
        return adder;
    }
    //利用toString隐形转化的特性，执行是转化并计算最终结果
    adder.toString = function () {
        return args.reduce((a, b) => {
            return a + b;
        })
    }
    return adder;
}

console.log(curryingAdd(1)(2)(3).toString())