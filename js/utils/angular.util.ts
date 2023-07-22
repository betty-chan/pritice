export enum QuadrantType {
    first = 1,
    second,
    third,
    fourth,
}
/**
 * 对应象限弧度值 + Math.PI
 * @param radians
 * @param quadrants
 * @returns
 */
export function convertQuadrant(radians: number, quadrants: QuadrantType[] = [], threshold = 0) {
    radians = convertTo0And2PI(radians);

    // Check if the angle is in corresponding quadrant
    if (
        quadrants.includes(QuadrantType.first) && radians >= (0 + threshold) && radians < (Math.PI / 2 + threshold) ||
        quadrants.includes(QuadrantType.second) && radians >= (Math.PI / 2 + threshold) && radians < (Math.PI + threshold) ||
        quadrants.includes(QuadrantType.third) && radians >= (Math.PI + threshold) && radians < (Math.PI * 3 / 2 + threshold) ||
        quadrants.includes(QuadrantType.fourth) && radians >= (Math.PI * 3 / 2 + threshold) && radians < (Math.PI * 2 + threshold)
    ) {
        // Convert the angle to be in quadrant 1 or 2
        radians += Math.PI;
    }
    radians = convertTo0And2PI(radians);

    return radians;
}

/**
 * Convert the angle to be between 0 and 2 * Math.PI
 * @param radians
 * @returns
 */
export function convertTo0And2PI(radians: number) {
    // 保证axisRadian大于0
    while (radians < 0) {
        radians += (Math.PI * 2);
    }
    radians %= (Math.PI * 2);
    return radians;
}

/**
 * 角度转弧度
 * @param val 需要转换的角度
 * @param precision 精度值，保留小数后几位
 * @returns 弧度
 */
export function convertAngleToRadian(val: number, precision: number = 4) {
    return Number(((Math.PI / 180) * val).toFixed(precision));
}

/**
 * 弧度转角度
 * @param val 需要转换的弧度
 * @param precision 精度值，保留小数后几位
 * @returns 角度
 */
export function convertRadianToAngle(val: number, precision: number = 2) {
    return Number(((180 / Math.PI) * val).toFixed(precision));
}
