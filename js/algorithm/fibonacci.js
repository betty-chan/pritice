//暴力递归
var fib = function (n) {
    if (n == 0) return 0;
    if (n == 1 || n == 2) return 1;
    return fib(n - 1) + fib(n - 1);
};
//动态规划:F(n)=F(n−1)+F(n−2)
var fib = function (n) {
    let dp = new Array(n + 1).fill(0);
    dp[0] = 0;
    dp[1] = dp[2] = 1;
    for (let i = 3; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    return dp[n];
};