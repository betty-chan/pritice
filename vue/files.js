// 使用webpack的require.context()遍历所有组装文件
let componentsAll = {};
const files = require.context('./assembly', true, /\.vue$/);
files.keys().forEach(key => {
  const element = files(key).default;
  componentsAll[element.name] = element;
});

// 组件名
export const componentNames = Object.keys(componentsAll);
// 组件值
export const componentsFiles = componentsAll;