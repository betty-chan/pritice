
new _instanceof(obj, type){
    const baseType = ['string', 'number', 'boolean', 'undefined', 'symbol'];
    //基础类型返回false
    if (baseType.includes(typeof (obj)) || obj === null) { return false };
    let objP = obj.__proto__;
    let typeP = type.prototype;
    //判断obj的原型链是否和type原型相等
    while (true) {
        if (objP === null) {
            return false
        }
        if (objP === typeP) {
            return true
        }
        objP = objP.__proto__
    }
}