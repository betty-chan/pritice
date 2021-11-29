function deepCopy(obj) {
    var objClone = Array.isArray(obj) ? [] : {};
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (obj[key] && typeof obj === 'object') {
                objClone[key] = deepCopy(obj[key]);
            } else {
                objClone[key] = obj[key]
            }
        }
    }
    return objClone;
}