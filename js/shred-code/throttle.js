//定时器
function throttle(fn, wait) {
    var timer;
    return function () {
        if (!timer) {
            timer = setTimeout(function () {
                timer = null;
                fn.apply(this, arguments)
            }, wait)
        }
    }
}
//时间戳
function throttle(fn, wait) {
    var previous = 0;
    return function () {
        var now = Date.now();
        if (now - previous > wait) {
            fn.apply(this, arguments);
            previous = now;
        }
    }
}