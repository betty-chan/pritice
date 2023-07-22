interface IPoint {
  x: number;
  y: number;
}
interface ILine {
  startPoint: IPoint;
  endPoint: IPoint;
}
/**
   * 获取线段与x轴正方向夹角的弧度
   * @param {*} line            线段
   * @param {*} startPoint      起始点（用于判断方向）
   */
function getLineRadian(line: ILine, startPoint: PointType): number {
  let fromPoint;
  let toPoint;
  if (PointJudge.isEqualBetween(startPoint, line.startPoint, 1)) {
    fromPoint = line.startPoint;
    toPoint = line.endPoint;
  } else {
    fromPoint = line.endPoint;
    toPoint = line.startPoint;
  }
  let v1 = { x: toPoint.x - fromPoint.x, y: toPoint.y - fromPoint.y };
  let v2 = { x: 1, y: 0 };

  let radian = ((v1.x * v2.x) + (v1.y * v2.y)) /
    Math.sqrt(((v1.x ** 2) + (v1.y ** 2)) * ((v2.x ** 2) + (v2.y ** 2)));

  radian = Math.acos(radian);
  if (v1.y < 0) {
    radian = (2 * Math.PI) - radian;
  }
  return radian;
}

function getPointsOfArc(
  center: IPoint,
  radius: number,
  startRadian: number,
  endRadian: number,
  isClockwise: boolean = false,
) {
  let deltaRadian = isClockwise ? startRadian - endRadian : endRadian - startRadian;
  while (deltaRadian <= 0) deltaRadian += Math.PI * 2;
  while (deltaRadian > Math.PI * 2) deltaRadian -= Math.PI * 2;
  const radian = isClockwise ? startRadian - deltaRadian : startRadian + deltaRadian;
  const x = center.x + radius * Math.cos(radian);
  const y = center.y + radius * Math.sin(radian);
  return {
    x,
    y,
  };
}