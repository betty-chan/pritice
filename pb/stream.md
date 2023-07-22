# 进制（binary）
- 0b：二进制
- 00：十进制
- 0x: 十六进制

# 传输
| machine | JavaScript |     |
| ------- | ---------- | --- |
| bit     |            |     |
| bytes  | ArrayBuffer、Unit8Array |     |
| bytesStr|||
| base64 |||

# 编码相关
- 规则
  - base64：binary-to-text的编码规则
- 操作：编码、解码



```javascript
function base64ToArrayBuffer(base64) {
  let binary_string = atob(base64); //解码使用base64编码的字符串
  let len = binary_string.length; //获取长度
  let bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binary_string.charCodeAt(i);
  }
  console.log(bytes); //打印解析出来的byte
  return bytes;
}
```