/**
 * 提取字段设为可选，返回pick的字段组成的类型
 * @example
 * PartialPick<{ a: number; b: string; }, 'a'>
 * return {a?: number}
 */
declare type PartialPick<T, K extends keyof T> = Partial<Pick<T, K>>;

/**
 * 将T的一部分字段设置为可选，其余字段不做处理。K为需要设置为可选的T的字段集合。如果未提供K，则等同于普通的Partial<T>
 * @example
 * Partial2<{ a: number; b: string; }, 'a'>
 * return {a?: number; b: string;}
 */
declare type Partial2<T, K extends keyof T = keyof T> = PartialPick<T, K> & Omit<T, K>;