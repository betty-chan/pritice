/**
 * 跳表节点类
 */
class SkipListNode<T> {
  value: T;
  next: SkipListNode<T>[] = [];
  
  constructor(value: T, level: number) {
    this.value = value;
    this.next = new Array(level).fill(null);
  }
}

/**
 * 跳表实现类
 */
class SkipList<T> {
    private head: SkipListNode<T>;
    private level: number;
    private maxLevel: number;
    private size: number;
    
    constructor(maxLevel: number = 16) {
        this.maxLevel = maxLevel;
        this.level = 1;
        this.size = 0;
        this.head = new SkipListNode<T>(null as T, maxLevel);
    }

    /**
     * 随机生成层数
     */
    private randomLevel(): number {
        let level = 1;
        while (Math.random() < 0.5 && level < this.maxLevel) {
            level++;
        }
        return level;
    }

    /**
     * 插入元素
     */
    insert(value: T): void {
        const update: SkipListNode<T>[] = new Array(this.maxLevel).fill(this.head);
        let current = this.head;

        // 从最高层开始查找插入位置
        for (let i = this.level - 1; i >= 0; i--) {
            while (current.next[i] && current.next[i].value < value) {
                current = current.next[i];
            }
            update[i] = current;
        }

        // 随机生成新节点的层数
        const newLevel = this.randomLevel();
        if (newLevel > this.level) {
            for (let i = this.level; i < newLevel; i++) {
                update[i] = this.head;
            }
            this.level = newLevel;
        }

        // 创建新节点
        const newNode = new SkipListNode(value, newLevel);
        
        // 更新每层的指针
        for (let i = 0; i < newLevel; i++) {
            newNode.next[i] = update[i].next[i];
            update[i].next[i] = newNode;
        }

        this.size++;
    }

    /**
     * 删除元素
     */
    delete(value: T): boolean {
        const update: SkipListNode<T>[] = new Array(this.maxLevel).fill(null);
        let current = this.head;

        // 从最高层开始查找要删除的节点
        for (let i = this.level - 1; i >= 0; i--) {
            while (current.next[i] && current.next[i].value < value) {
                current = current.next[i];
            }
            update[i] = current;
        }

        current = current.next[0];

        // 如果找到要删除的节点
        if (current && current.value === value) {
            for (let i = 0; i < this.level; i++) {
                if (update[i].next[i] !== current) {
                    break;
                }
                update[i].next[i] = current.next[i];
            }

            // 更新跳表的层数
            while (this.level > 1 && !this.head.next[this.level - 1]) {
                this.level--;
            }

            this.size--;
            return true;
        }

        return false;
    }

    /**
     * 查找元素
     */
    search(value: T): boolean {
        let current = this.head;

        // 从最高层开始查找
        for (let i = this.level - 1; i >= 0; i--) {
            while (current.next[i] && current.next[i].value < value) {
                current = current.next[i];
            }
        }

        current = current.next[0];
        return current !== null && current.value === value;
    }

    /**
     * 获取跳表大小
     */
    getSize(): number {
        return this.size;
    }
}
