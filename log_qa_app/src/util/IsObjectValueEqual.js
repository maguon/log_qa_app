export const isEqualKeys = (a, b) => {//比较两个object中的各个可枚举属性的值是否相等,相等返回true
    const aProps = Object.keys(a)
    const bProps = Object.keys(b)
    return (aProps.length === bProps.length) ? !aProps.some((item, index) => {
        return !isEqualDispatch(a[item], b[item])
    }) : false
}

export const isEqualArr = (a, b) => {//比较两个array中的各个元素可枚举属性的值是否相等,相等返回true
    return (a.length === b.length) ? !a.some((item, index) => !isEqualDispatch(item, b[index])) : false
}

export const isEqualDispatch = (a, b) => {
    if (a === b) return true
    // else if (a instanceof Map) {
    //     if (b instanceof Map) return isEqualMap(a, b)
    //     else if (Array.isArray(b)) return isEqualArr([...a.values()], b)
    //     else return false
    // }
    // else if (Array.isArray(a)) {
    //     if (Array.isArray(b)) return isEqualArr(a, b)
    //     else if(b instanceof Map) return isEqualArr(a, [...b.values()])
    //     else return false
    // } 
    else if (Array.isArray(a)) return Array.isArray(b) ? isEqualArr(a, b) : false
    else if (a === null || a === undefined || b === null || b === undefined) return false
    else if (typeof a === "object") return (typeof b === "object") ? isEqualKeys(a, b) : false
    else return false
}


export const isEqualMap = (a, b) => {//比较两个Map中的各个元素可枚举属性的值是否相等,相等返回true
    return (a.size === b.size) ? !a.keys().some((key, index) => !isEqualDispatch(a.get(key), b.get(key))) : false
}

export const isEqualOwnPropertys = (a, b) => {//比较两个object中的各个可枚举属性与不可枚举属性的值是否相等,相等返回true
    const aProps = Object.getOwnPropertyNames(a)
    const bProps = Object.getOwnPropertyNames(b)
    if (aProps.length != bProps.length) {
        return false
    }
    for (let i = 0; i < aProps.length; i++) {
        let propName = aProps[i]

        if (typeof (a[propName]) == "object" && typeof (b[propName]) == "object") {
            return isEqualOwnPropertys(a[propName], b[propName])
        }
        if (a[propName] !== b[propName]) {
            return false
        }
    }
    return true
}