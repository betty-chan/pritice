## 变化矩阵

``` javascript
var matrix = new THREE.Matrix4();

/**
  Column-Major
  [
      11, 21, 31, 41, 
      12, 22, 32, 42, 
      13, 23, 33, 43, 
      14, 24, 34, 44, 
    ]
 */
const elements = [
      // 有效部分
      11, 21, 31, 41, 
      12, 22, 32, 42, 
      13, 23, 33, 43, 
      // 无效部分
      0, 0, 0, 0, 
    ]

public static Matrix4d makeBasis(Point xAxis,Point yAxis,Point zAxis) {
    Matrix4d matrix = new Matrix4d();
    matrix.setColumn(0, new Vector4d(xAxis.getX(), xAxis.getY(), xAxis.getZ(), 0 ));
    matrix.setColumn(1, new Vector4d(yAxis.getX(), yAxis.getY(), yAxis.getZ(), 0 ));
    matrix.setColumn(2, new Vector4d(zAxis.getX(), zAxis.getY(), zAxis.getZ(), 0 ));
    return matrix;
}
```
