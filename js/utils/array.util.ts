/**
 * 从数组中删除满足条件的元素，并返回更新后的索引值
 * @param arr 要操作的数组
 * @param predicate 判断条件函数
 * @param currentIndex 当前索引
 * @returns 更新后的索引值
 */
export function getCurrentIndex<T>(arr: T[], predicate: (item: T) => boolean, currentIndex: number): number {
  const targetIndex = arr.findIndex(predicate);
  
  // 如果没找到匹配项，直接返回当前索引
  if (targetIndex === -1) {
    return currentIndex;
  }

  // 如果删除的元素位置在当前索引之前或相等，需要将当前索引减1
  arr.splice(targetIndex, 1);
  return targetIndex <= currentIndex ? currentIndex - 1 : currentIndex;
}

/**
 * 将布尔数组转换为位掩码
 * @param boolArray 布尔值数组
 * @returns 生成的位掩码数值
 */
export function createMask(boolArray: boolean[]): number {
  return boolArray.reduce((mask, value, index) => 
    value ? mask | (1 << index) : mask, 0);
}