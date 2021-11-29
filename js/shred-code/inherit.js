//组合寄生
function inherit(child, parent) {
    // 创建对象
    let prototype = Object.create(parent.prototype);
    // 增强对象
    prototype.constructor = child;
    // 指定对象
    child.prototype = prototype;
}