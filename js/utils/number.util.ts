/** 取整处理 */

// // 四舍五入取整
// Math.round()

// // 小于等于一个给定数字的最大整数
// Math.floor()

// // 大于等于给定数字的最小整数
// Math.ceil()

// // 示例用法
// console.log(numberToChineseCapital(123456789)); // 输出：壹亿贰仟叁佰肆拾伍万陆仟柒佰捌拾玖
// console.log(numberToChineseCapital(100000001)); // 输出：壹亿零壹
// console.log(numberToChineseCapital(0.123));     // 输出：零点壹贰
// console.log(numberToChineseCapital(-100.56));   // 输出：负壹佰点伍陆
// console.log(numberToChineseCapital(10000));     // 输出：壹万

/**
 * 将数字转换为中文大写金额
 * @param num 要转换的数字
 * @returns 转换后的中文大写字符串
 */
export function numberToChineseCapital (num) {
  // 检查输入是否为合法数字
  if (isNaN(num) || num === null) {
    return '无效数字'
  }

  // 处理负数
  let negativePart = ''
  if (num < 0) {
    negativePart = '负'
    num = Math.abs(num)
  }

  // 中文数字字符
  const digits = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖']
  const units = [
    ['', '拾', '佰', '仟'],
    ['', '万', '亿', '兆']
  ]

  // 处理小数部分
  let decimalPart = ''
  if (num.toString().includes('.')) {
    const parts = num.toString().split('.')
    num = parseInt(parts[0])
    const decimal = parts[1]
    if (decimal) {
      decimalPart = '点'
      for (let i = 0; i < decimal.length; i++) {
        decimalPart += digits[parseInt(decimal[i])]
      }
    }
  }

  // 处理整数部分
  let result = num === 0 ? '零' : ''
  let numStr = num.toString()
  const groupCount = Math.ceil(numStr.length / 4)
  numStr = numStr.padStart(groupCount * 4, '0')

  let hasNonZero = false
  for (let i = 0; i < groupCount; i++) {
    const group = numStr.substr(i * 4, 4)
    let groupResult = ''
    let lastNonZero = -1

    for (let j = 0; j < 4; j++) {
      const digit = parseInt(group[j])
      if (digit !== 0) {
        groupResult += digits[digit] + units[0][3 - j]
        hasNonZero = true
        lastNonZero = j
      } else {
        // 处理零的情况
        if (hasNonZero && j < lastNonZero + 2) {
          groupResult += digits[0]
        }
      }
    }

    // 移除末尾的零
    groupResult = groupResult.replace(/零+$/, '')

    if (groupResult) {
      result += groupResult + units[1][groupCount - 1 - i]
    }
  }

  // 处理可能多余的零
  result = result.replace(/零+/g, '零')

  // 添加负号和小数部分
  return negativePart + result + decimalPart
}