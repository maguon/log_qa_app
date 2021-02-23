export const ObjectToUrl = (obj) => {
    let url = '?'
    for (key in obj) {
        if (obj[key] || obj[key] == 0) {
            url = url === '?' ? url : `${url}&`
            url = `${url}${key}=${obj[key]}`
        }
    }
    return url
}