import { Vector2 } from 'three';
/**
 * 2D镜像
 * @param points 
 * @param axis 轴向量
 * @param position 轴位置
 * @returns 
 */
export function mirrorVector2s(points: Vector2[], startPoint = new Vector2(), endPoint = new Vector2()) {
  const axis = endPoint.clone().sub(startPoint).normalize();
  const mirroredPoints = points.map(point => {
    const relativePoint = point.clone().sub(startPoint);
    // Vector2没有projectOnVector方法，需要自己实现
    const projectedPoint = projectOnVector2(relativePoint, axis);
    const mirroredPoint = projectedPoint.clone().sub(relativePoint).add(point);
    return mirroredPoint;
  });
  return mirroredPoints;
}

export function projectOnVector2(vector: Vector2, axis: Vector2) {
  const scalar = vector.dot(axis) / axis.lengthSq();
  return axis.clone().multiplyScalar(scalar);
}