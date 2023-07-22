// 定义基本类型
type BaseType = {
  A: string; // A 属性是必填的
  B: number;
};

// 定义可选类型
type OptionalA = Omit<BaseType, 'A'> & {
  A?: string; // A 属性现在是可选的
};

// 你也可以根据条件来定义类型
type ConditionalType<T extends boolean> = T extends true ? BaseType : OptionalA;

/**
 * 定义一个对象的属性名是另外一个对象的值
 */
interface FieldNameProps {
  value: string;
  parentValue: string;
  children: string;
}
type OptionProps = {
  [K in FieldNameProps['value']]: string;
} & {
  [K in FieldNameProps['parentValue']]: string;
} & {
  [K in FieldNameProps['children']]: OptionProps[];
} & {
  checked: boolean;
};