class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class MinBoundingRect {
    /**
     * 算法说明：
     * 首先使用Graham扫描法计算点集的凸包
     * 然后使用旋转卡壳算法在凸包上寻找最小外接矩形
     * 对于少于3个点的情况，直接计算轴对齐的包围盒
     * 计算点集的最小外接矩形
     * @param {Point[]} points - 点集数组
     * @returns {Object} 包含最小外接矩形的信息
     */
    static getMinBoundingRect(points) {
        if (points.length < 3) {
            return this.getSimpleBoundingRect(points);
        }

        // 1. 首先计算凸包
        const convexHull = this.grahamScan(points);
        
        // 2. 使用旋转卡壳算法计算最小外接矩形
        return this.rotatingCalipers(convexHull);
    }

    /**
     * Graham扫描法计算凸包
     */
    static grahamScan(points) {
        if (points.length < 3) return points;

        // 找到最下方的点作为起始点
        let start = points.reduce((min, p) => 
            p.y < min.y || (p.y === min.y && p.x < min.x) ? p : min
        , points[0]);

        // 按极角排序
        let sorted = points
            .filter(p => p !== start)
            .sort((a, b) => {
                let angleA = Math.atan2(a.y - start.y, a.x - start.x);
                let angleB = Math.atan2(b.y - start.y, b.x - start.x);
                if (angleA === angleB) {
                    return this.distance(start, a) - this.distance(start, b);
                }
                return angleA - angleB;
            });

        // Graham扫描
        let stack = [start];
        for (let point of sorted) {
            while (stack.length >= 2 && 
                   this.crossProduct(
                       stack[stack.length-2], 
                       stack[stack.length-1], 
                       point
                   ) <= 0) {
                stack.pop();
            }
            stack.push(point);
        }

        return stack;
    }

    /**
     * 旋转卡壳算法计算最小外接矩形
     */
    static rotatingCalipers(hull) {
        if (hull.length < 3) return this.getSimpleBoundingRect(hull);

        let minArea = Infinity;
        let bestRect = null;

        for (let i = 0; i < hull.length; i++) {
            let p1 = hull[i];
            let p2 = hull[(i + 1) % hull.length];
            
            // 计算边的方向向量
            let edge = {
                x: p2.x - p1.x,
                y: p2.y - p1.y
            };
            
            // 归一化
            let length = Math.sqrt(edge.x * edge.x + edge.y * edge.y);
            edge.x /= length;
            edge.y /= length;

            // 计算垂直方向
            let normal = {
                x: -edge.y,
                y: edge.x
            };

            // 计算投影
            let minProj1 = Infinity, maxProj1 = -Infinity;
            let minProj2 = Infinity, maxProj2 = -Infinity;

            hull.forEach(p => {
                let proj1 = p.x * edge.x + p.y * edge.y;
                let proj2 = p.x * normal.x + p.y * normal.y;
                
                minProj1 = Math.min(minProj1, proj1);
                maxProj1 = Math.max(maxProj1, proj1);
                minProj2 = Math.min(minProj2, proj2);
                maxProj2 = Math.max(maxProj2, proj2);
            });

            let area = (maxProj1 - minProj1) * (maxProj2 - minProj2);
            
            if (area < minArea) {
                minArea = area;
                bestRect = {
                    width: maxProj1 - minProj1,
                    height: maxProj2 - minProj2,
                    angle: Math.atan2(edge.y, edge.x),
                    center: {
                        x: (minProj1 + maxProj1) / 2 * edge.x + 
                           (minProj2 + maxProj2) / 2 * normal.x,
                        y: (minProj1 + maxProj1) / 2 * edge.y + 
                           (minProj2 + maxProj2) / 2 * normal.y
                    }
                };
            }
        }

        return bestRect;
    }

    /**
     * 计算简单的轴对齐包围盒（点少于3个时使用）
     */
    static getSimpleBoundingRect(points) {
        if (points.length === 0) return null;
        
        let minX = Infinity, maxX = -Infinity;
        let minY = Infinity, maxY = -Infinity;

        points.forEach(p => {
            minX = Math.min(minX, p.x);
            maxX = Math.max(maxX, p.x);
            minY = Math.min(minY, p.y);
            maxY = Math.max(maxY, p.y);
        });

        return {
            width: maxX - minX,
            height: maxY - minY,
            angle: 0,
            center: {
                x: (minX + maxX) / 2,
                y: (minY + maxY) / 2
            }
        };
    }

    /**
     * 计算叉积
     */
    static crossProduct(p1, p2, p3) {
        return (p2.x - p1.x) * (p3.y - p1.y) - 
               (p2.y - p1.y) * (p3.x - p1.x);
    }

    /**
     * 计算两点间距离
     */
    static distance(p1, p2) {
        return Math.sqrt(
            (p2.x - p1.x) * (p2.x - p1.x) + 
            (p2.y - p1.y) * (p2.y - p1.y)
        );
    }
}

// 使用示例
const points = [
    new Point(0, 0),
    new Point(1, 1),
    new Point(2, 0),
    new Point(2, 2),
    new Point(0, 2),
    new Point(1, 0.5)
];

const result = MinBoundingRect.getMinBoundingRect(points);
console.log('最小外接矩形:', result);