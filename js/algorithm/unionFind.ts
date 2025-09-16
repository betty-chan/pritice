/**
 * 集合群
 */
class UnionFind {
    // 存储节点的父节点
    private parent: Map<number, number>;
    // 存储以该节点为根的集合的大小
    private size: Map<number, number>;
    // 连通分量的数量
    private count: number;

    constructor() {
        this.parent = new Map();
        this.size = new Map();
        this.count = 0;
    }

    // 添加新节点到并查集
    add(x: number): void {
        if (!this.parent.has(x)) {
            this.parent.set(x, x);
            this.size.set(x, 1);
            this.count++;
        }
    }

    // 查找节点x的根节点
    find(x: number): number {
        if (!this.parent.has(x)) {
            this.add(x);
        }
        
        while (this.parent.get(x) !== x) {
            // 路径压缩
            const parent = this.parent.get(x)!;
            this.parent.set(x, this.parent.get(parent)!);
            x = this.parent.get(x)!;
        }
        return x;
    }

    // 连接两个节点
    union(x: number, y: number): void {
        if (!this.parent.has(x)) this.add(x);
        if (!this.parent.has(y)) this.add(y);

        let rootX = this.find(x);
        let rootY = this.find(y);
        if (rootX === rootY) return;

        // 将小树接到大树下面
        if (this.size.get(rootX)! < this.size.get(rootY)!) {
            [rootX, rootY] = [rootY, rootX];
        }
        this.parent.set(rootY, rootX);
        this.size.set(rootX, this.size.get(rootX)! + this.size.get(rootY)!);
        this.count--;
    }

    // 判断两个节点是否连通
    connected(x: number, y: number): boolean {
        if (!this.parent.has(x) || !this.parent.has(y)) return false;
        return this.find(x) === this.find(y);
    }

    // 获取连通分量的数量
    getCount(): number {
        return this.count;
    }
}
