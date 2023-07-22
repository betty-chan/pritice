async function loadWebAssembly(filePath = 'closedSpace.wasm') {
    // const myHeaders = new Headers();
    // myHeaders.append('Content-Type', 'application/wasm');
    // myHeaders.values();
    isFileURI(filePath)
    const scripth = getCurrentScriptPath(); // 获取当前脚本路径
    const request = new Request(`${filePath}`);
    request.headers.append('Accept', 'application/wasm');
    const response = await fetch(request);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const importObject = { imports: { imported_func: (arg) => console.log(arg) } };
  
    WebAssembly.instantiateStreaming(response, importObject).then(
      (obj) => obj.module,
    );
  }
  function getCurrentScriptPath() {
    if (typeof document !== 'undefined' && document.currentScript) {
        return document.currentScript.src; // 浏览器环境
    } else if (typeof __filename !== 'undefined') {
        return __filename; // Node.js 环境
    }
    return null; // 无法获取路径
  }
  
  function isFileURI(filename){ return filename.startsWith("file://") };