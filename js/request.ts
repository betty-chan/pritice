function fetchWithTimeout(url, options = {}, timeout = 5000) {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchPromise = fetch(url, { ...options, signal });

    const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => {
            controller.abort(); // 取消请求
            reject(new Error('请求超时'));
        }, timeout)
    );

    return Promise.race([fetchPromise, timeoutPromise]);
}