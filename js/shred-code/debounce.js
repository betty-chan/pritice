function debounce(fn, wait) {
    let timer; // 计时器
    return function () {
        // 重置计时器
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(this, arguments);
        }, wait);
    };
}