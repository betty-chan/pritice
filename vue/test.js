function Dep() {
    this.subs = [];
    this.addSub = function (watcher) {
        this.subs.push(watcher);
    }
    this.notify = function () {
        this.subs.forEach(function (watcher) {
            watcher.update();
        });
    }
}
function Observer(obj, key, value) {
    var dep = new Dep();
    if (Object.prototype.toString.call(value) == '[object Object]') {
        Object.keys(value).forEach(function (key) {
            new Observer(value, key, value[key])
        })
    };
    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: function () {
            if (Dep.target) {
                dep.addSub(Dep.target);
            };
            return value;
        },
        set: function (newVal) {
            value = newVal;
            dep.notify();
        }
    })
}
function Watcher(fn) {
    this.update = function () {
        Dep.target = this;
        fn();
        Dep.target = null;
    }
    this.update();
}

//一个全局变量
Dep.target = null;