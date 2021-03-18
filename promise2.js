/*
# Promise使用
1.基本使用
new Promise(function(resolve, reject) {
  if (){
    resolve(value);
  } else {
    reject(error);
  }
});
2.then使用
Promise.then((data)=>{},(error)=>{})//参数可选

# 思路
1. 设定三种状态pending\resolved\rejected

*/
// 三种状态
const PENDING = "pending";
const RESOLVED = "resolved";
const REJECTED = "rejected";
class MyPromise{
  constructor(fn){
    this.currentState = PENDING;
    this.value = undefined;
    this.resolvedCallbacks = [];
    this.rejectedCallbacks = [];
    try {
      fn(this.resolve, this.reject);
    } catch (error) {
      this.reject(error);
    }
  }
  resolve(value){
    // 如果 value 是个 Promise，递归执行
    if (value instanceof MyPromise) {
      return value.then(this.resolve, this.reject)
    }
    // 异步执行，保证执行顺序
    setTimeout(() => {
      if (this.currentState === PENDING) {
          this.currentState = RESOLVED;
          this.value = value;
          this.resolvedCallbacks.forEach((item) =>{ return item()});
      }
    })
  }
  reject(error) {
    // 异步执行，保证执行顺序
    setTimeout(() => {
      if (this.currentState === PENDING) {
        this.currentState = REJECTED;
        this.value = error;
        this.rejectedCallbacks.forEach((item) => {return item()});
      }
    })
  }
  then(onResolved, onRejected){
    var self = this;
    var promise2;
    onResolved = typeof onResolved === 'function' ? onResolved : (v) => {return v};
    onRejected = typeof onRejected === 'function' ? onRejected : (r) => {throw r};
    if (self.currentState === RESOLVED) {
      return (promise2 = new MyPromise(function (resolve, reject) {
        setTimeout(function () {
          try {
            var x = onResolved(self.value);
            resolutionProcedure(promise2, x, resolve, reject);
          } catch (reason) {
            reject(reason);
          }
        });
      }));
    }
    if (self.currentState === REJECTED) {
      return (promise2 = new MyPromise(function (resolve, reject) {
        setTimeout(function () {
          try {
            var x = onRejected(self.value);
            resolutionProcedure(promise2, x, resolve, reject);
          } catch (reason) {
            reject(reason);
          }
        });
      }));
    }
    if (self.currentState === PENDING) {
      return (promise2 = new MyPromise(function (resolve, reject) {
        self.resolvedCallbacks.push(function () {
          try {
            var x = onResolved(self.value);
            resolutionProcedure(promise2, x, resolve, reject);
          } catch (r) {
            reject(r);
          }
        });
        self.rejectedCallbacks.push(function () {
          try {
            var x = onRejected(self.value);
            resolutionProcedure(promise2, x, resolve, reject);
          } catch (r) {
            reject(r);
          }
        });
      }));
    }
  }
}
function resolutionProcedure(promise2, x, resolve, reject) {
  if (promise2 === x) {
    return reject(new TypeError("Error"));
  }
  if (x instanceof MyPromise) {
    if (x.currentState === PENDING) {
      x.then(function (value) {
        // 再次调用该函数是为了确认 x resolve 的
        // 参数是什么类型，如果是基本类型就再次 resolve
        // 把值传给下个 then
        resolutionProcedure(promise2, value, resolve, reject);
      }, reject);
    } else {
      x.then(resolve, reject);
    }
    return;
  }
  // 规范 2.3.3.3.3: reject 或者 resolve 其中一个执行过得话，忽略其他的
  let called = false;
  // 规范 2.3.3:判断 x 是否为对象或者函数
  if (x !== null && (typeof x === "object" || typeof x === "function")) {
    // 规范 2.3.3.2:如果不能取出 then，就 reject
    try {
      let then = x.then;
      // 如果 then 是函数，调用 x.then
      if (typeof then === "function") {
        then.call(
          x,
          y => {
            if (called) return;
            called = true;
            resolutionProcedure(promise2, y, resolve, reject);
          },
          e => {
            if (called) return;
            called = true;
            reject(e);
          }
        );
      } else {
        resolve(x);
      }
    } catch (e) {
      if (called) return;
      called = true;
      reject(e);
    }
  } else {
    // 规范 2.3.4，x 为基本类型
    resolve(x);
  }
}


const axios = function(url) {
  const promise = new MyPromise(function(resolve, reject){
      const handler = function() {
          if (this.readyState !== 4) {
              return;
          }
          if (this.status === 200) {
              resolve(this.response);
          } else {
              reject(new Error(this.statusText));
          }
      };
      const client = new XMLHttpRequest();
      client.open("GET", url);
      client.onreadystatechange = handler;
      client.responseType = "json";
      client.setRequestHeader("Accept", "application/json");
      client.send(null);
  });
  return promise;
};
axios("https://ipinfo.io").then(function(json) {
  console.log('Contents: ' + json);
}, function(error) {
  console.error('出错了', error);
});