import { PixelRatio,Dimensions } from 'react-native'

export const fontSizeCoeff = Dimensions.get('window').width/360/ PixelRatio.getFontScale()

export const sleep = (time) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve()
        }, time)
    })
}
export const moneyFormat = (s, n) => {
    n = n > 0 && n <= 20 ? n : 2;
    s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
    var l = s.split(".")[0].split("").reverse(),
        r = s.split(".")[1];
    t = "";
    for (i = 0; i < l.length; i++) {
        t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
    }
    return t.split("").reverse().join("") + "." + r;
} 


export const objectExceptNull = (param) => {
    let obj = { ...param }
    for (key in obj) {
        if (!obj[key] && obj[key] != 0 && obj[key] != '') {
            delete obj[key]
        }
    }
    return obj
}
