1. 根据position、rotation、Axes生成矩阵

```javascript
const matrix = new Matrix4().compose(position, new Quaternion().setFromEuler(rotation),new Vector3(1, 1, 1))
const matrix = new Matrix4().makeBasis(xAxis, yAxis, zAxis);
```

2. 矩阵运算

```javascript
const matrix1 = new Matrix4();
const matrix2 = new Matrix4().invert();
const matrix = matrix1.clone().premultiply(matrix2);
```

3. 点变换

```javascript
const point = new Vector3(x, y, z);
point.applyMatrix4(matrix);
```

4. 从矩阵中读取position、rotation等信息

```javascript
matrix.decompose(position, quaternion, scale)
```
