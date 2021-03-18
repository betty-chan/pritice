class TreeNode {
    constructor(val, left, right) {
        this.val = (val === undefined ? 0 : val)
        this.left = (left === undefined ? null : left)
        this.right = (right === undefined ? null : right)
    }
}
function isLeaf(node) {
    if (node.left == null && node.right == null) {
        return true;
    }
    return false
}
function arrayToTree(arr) {
    function toNode(item) {
        if (item === null || item === undefined) {
            return null
        } else {
            return new TreeNode(item)
        }
    }
    let queue = [];
    const tree = toNode(arr.shift());
    queue.push(tree);
    while (arr.length > 0) {
        let current = queue.shift();
        current.left = toNode(arr.shift());
        current.right = toNode(arr.shift());
        if (current.left) {
            queue.push(current.left)
        }
        if (current.right) {
            queue.push(current.right)
        }
    }
    return tree;
}
function treeToArray(root) {
    let queue = [];
    let list = [];
    queue.push(root);
    while (queue.length > 0) {
        let current = queue.shift();
        if (current.left) {
            list.push(current.left.val);
            queue.push(current.left);
        } else { list.push(null) }
        if (current.right) {
            list.push(current.right.val);
            queue.push(current.right)
        } else { list.push(null) }
    }
    let point = list.length - 1;
    while (list[point] === null) {
        list.pop();
        point--;
    }
    return [root.val].concat(list);
}
//最大层级
function heightOfTree(root) {
    if (!root) { return 0 }
    return Math.max(heightOfTree(root.left), heightOfTree(root.right)) + 1
}
//节点数
function sizeOfTree(root) {
    if (!root) { return 0 }
    return 1 + sizeOfTree(root.left) + sizeOfTree(root.right);
}
//叶子节点数
function numOfLeaf(root) {
    if (!root) { return 0 }
    if (!root.left && !root.right) { return 1 }
    return numOfLeaf(root.left) + numOfLeaf(root.right)
}
//比较树结构
function compareStruct(root1, root2) {
    if (root1 === null && root2 === null) { return true }
    if ((root1 !== null && root2 === null) || (root1 === null && root2 !== null)) { return false }
    return (compareStruct(root1.left, root2.left) && compareStruct(root1.right, root2.right))
}
//深度优先遍历-先序
function preOrderTraversal(root) {
    console.log(root.val);
    if (root.left) { preOrderTraversal(root.left) }
    if (root.right) { preOrderTraversal(root.right) }
}
//深度优先遍历-中序
function inOrderTraversal(root) {
    if (root.left) { inOrderTraversal(root.left) }
    console.log(root.val);
    if (root.right) { inOrderTraversal(root.right) }
}
//深度优先遍历-后序
function postOrderTraversal(root) {
    if (root.left) { postOrderTraversal(root.left) }
    if (root.right) { postOrderTraversal(root.right) }
    console.log(root.val);
}
//广度优先遍历
function BFS(root) {
    let queue = [];
    queue.push(root);
    while (queue.length > 0) {
        let current = queue.shift();
        console.log(current.val);
        if (current.left) { queue.push(current.left) }
        if (current.right) { queue.push(current.right) }
    }
}
//广度优先遍历-层级
function BFSAndLevel(root) {
    let level = 1;//存储当前层数
    let currentLevelCount = 1;//存储当前层数中剩余项
    let nextLevelCount = 0;//存储下一层数中剩余项
    let queue = [];
    queue.push(root);
    while (queue.length > 0) {
        let current = queue.shift();
        currentLevelCount--;
        console.log(current.val);
        if (current.left) {
            queue.push(current.left)
            nextLevelCount++;
        }
        if (current.right) {
            queue.push(current.right)
            nextLevelCount++;
        }
        if (currentLevelCount === 0) {//当前层的没了，就得换层了
            currentLevelCount = nextLevelCount;
            nextLevelCount = 0;
            level++;
        }
    }
}