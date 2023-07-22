1. 根据position、rotation生成矩阵
```java
Matrix4d blockModelMatrix4 = SpaceGeometryUtil.compose(
        new Vector3d(blockPosition.getX(), blockPosition.getY(), blockPosition.getZ()),
        new Quaterniond().rotationXYZ(blockRotation.getX(), blockRotation.getY(), blockRotation.getZ())
);
```

2. 矩阵运算
```java
Matrix4d blockModelMatrix4 = SpaceGeometryUtil.compose(
        new Vector3d(blockPosition.getX(), blockPosition.getY(), blockPosition.getZ()),
        new Quaterniond().rotationXYZ(blockRotation.getX(), blockRotation.getY(), blockRotation.getZ())
);
Matrix4d rebarModelMatrix4 = SpaceGeometryUtil.compose(
        new Vector3d(position.getX(), position.getY(), position.getZ()),
        new Quaterniond().rotationXYZ(rotation.getX(), rotation.getY(), rotation.getZ())
);

// 需要明确矩阵的前后关系，mulLocal为前乘，mul为后乘

Matrix4d matrix4 = new Matrix4d().mulLocal(blockModelMatrix4).mulLocal(rebarModelMatrix4);
```

3. 点变换
```java
// 局部坐标变成世界坐标
SpaceGeometryUtil.applyMatrix4(pathSegmentItem.getStartPoint(), modelMatrix4);

// 世界坐标变成局部坐标,矩阵需进行一次逆运算
SpaceGeometryUtil.applyMatrix4(pathSegmentItem.getStartPoint(), modelMatrix4.invert(new Matrix4d()));
```

4. 从矩阵中读取position、rotation等信息
```java
SpaceGeometryUtil.decompose(
    matrix4,
    new Vector3d(),
    new Quaterniond()
);
```
