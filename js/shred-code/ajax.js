const handler = function () {
    if (this.readyState !== 4) {
        return;
    }
    if (this.status === 200) {
        resolve(this.response);
    } else {
        reject(new Error(this.statusText));
    }
};
const ajax = function (url) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.onreadystatechange = handler;
    xhr.responseType = "json";
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    xhr.send(null);
}
const axios = function (url) {
    const promise = new Promise(function (resolve, reject) {
        const client = new XMLHttpRequest();
        client.open("GET", url);
        client.onreadystatechange = handler;
        client.responseType = "json";
        client.setRequestHeader("Accept", "application/json");
        client.send(null);
    });
    return promise;
};