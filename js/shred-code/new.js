function Person() { }
function _new() {
    //1.取出第一个传入参数并删除,仅在这个案例中需要
    var constructor = Array.prototype.shift.call(arguments);
    //2.创建新对象，并将其原型链指向构造函数的原型
    var obj = Object.create(constructor.prototype);
    //3.传入参数、执行构造函数，并将this指向创建的新对象
    var res = constructor.apply(obj, arguments);
    //4.如果返回值是对象，则直接返回，否则返回创建的新对象obj
    return res instanceof Object ? res : obj;
}
var p1 = _new(Person, 'zhangsan', 'male');
var p2 = new Person('zhangsan', 'male');
console.log(p1);
console.log(p2);