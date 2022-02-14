export default function diff(oldDomTree, newDomTree) {
    // 用于记录差异
    let pathchs = {}
    // 一开始的索引为 0
    dfs(oldDomTree, newDomTree, 0, pathchs)
    return pathchs
}

function dfs(oldNode, newNode, index, patches) {
    // 用于保存子树的更改
    let curPatches = []
    // 需要判断三种情况
    // 1.没有新的节点，那么什么都不用做
    // 2.新的节点的 tagName 和 `key` 和旧的不同，就替换
    // 3.新的节点的 tagName 和 key（可能都没有） 和旧的相同，开始遍历子树
    if (!newNode) {
    } else if (newNode.tag === oldNode.tag && newNode.key === oldNode.key) {
        // 判断属性是否变更
        let props = diffProps(oldNode.props, newNode.props)
        if (props.length) curPatches.push({ type: StateEnums.ChangeProps, props })
        // 遍历子树
        diffChildren(oldNode.children, newNode.children, index, patches)
    } else {
        // 节点不同，需要替换
        curPatches.push({ type: StateEnums.Replace, node: newNode })
    }

    if (curPatches.length) {
        if (patches[index]) {
            patches[index] = patches[index].concat(curPatches)
        } else {
            patches[index] = curPatches
        }
    }
}

function diffProps(oldProps, newProps) {
    // 判断 Props 分以下三步骤
    // 先遍历 oldProps 查看是否存在删除的属性
    // 然后遍历 newProps 查看是否有属性值被修改
    // 最后查看是否有属性新增
    let change = []
    for (const key in oldProps) {
        if (oldProps.hasOwnProperty(key) && !newProps[key]) {
            change.push({
                prop: key
            })
        }
    }
    for (const key in newProps) {
        if (newProps.hasOwnProperty(key)) {
            const prop = newProps[key]
            if (oldProps[key] && oldProps[key] !== newProps[key]) {
                change.push({
                    prop: key,
                    value: newProps[key]
                })
            } else if (!oldProps[key]) {
                change.push({
                    prop: key,
                    value: newProps[key]
                })
            }
        }
    }
    return change
}