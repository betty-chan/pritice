function Observer(obj, key, value) {
    var terrace = new Terrace();
    if (Object.prototype.toString.call(value) == '[object Object]') {
        Object.keys(value).forEach(function (key) {
            new Observer(value, key, value[key])
        })
    };
    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: function () {
            if (Terrace.target) {
                terrace.addSub(Terrace.target);
            };
            return value;
        },
        set: function (newVal) {
            value = newVal;
            terrace.notify();
        }
    })
}
function Watcher(fn) {
    this.update = function () {
        Terrace.target = this;
        fn();
        Terrace.target = null;
    }
    this.update();
}
function Terrace() {
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