// 字典排序 
function sortString(a, b) {
  return a.name.localeCompare(b.name)
}

// 单词按字典排序，数字按小到大排序
function compareString(a, b) {
  const aName = a.match(/(\D+)|(\d+)/g);
  const bName = b.match(/(\D+)|(\d+)/g);
  const len = Math.min(aName.length, bName.length);
  for (let i = 0; i < len; i++) {
    const aChar = aName[i];
    const bChar = bName[i];
    if (aChar === bChar) {
      continue;
    }
    const aNum = parseInt(aChar);
    const bNum = parseInt(bChar);
    if (!isNaN(aNum) && !isNaN(bNum)) {
      return aNum - bNum;
    }
    return aChar.localeCompare(bChar);
  }
  return a.length - b.length;
}