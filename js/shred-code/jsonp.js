function jsonp() {
  return new Promise((resolve, reject) => {
    var fn = (data) => {
      if (data.code === 200) {
        resolve(data);
      } else {
        reject(data);
      }
    };
    var script = document.createElement("script");
    script.src = "url?callback=fn";
    document.body.append(script);
  });
}