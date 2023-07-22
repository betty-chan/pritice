/**
 * Implement a string template data replacement function
 * @param templateString 例如：'[${min},${max}]'
 * @param data
 * @returns
 */
export function replaceDataInString(templateString: string, data: any) {
  return templateString.replace(/\${(.*?)}/g, (match, key) => data[key.trim()]);
}

// 单词按字典排序，数字按小到大排序
export function compareString(a: string, b: string) {
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

export function getObjValue(obj: any, name: string) {
  let keys = name.split('.');
  let value = obj;
  keys.forEach(key => {
    value = value[key];
  });
  return value;
}