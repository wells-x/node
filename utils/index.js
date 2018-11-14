var output = function (isOk, errMsg, errCode) {
    return {
        isOk: isOk,
        errCode: typeof errCode == "undefined" ? "" : errCode,
        errMsg: errMsg || ""
    }
};

function urlParse (url) {
    if (!url) url = window.decodeURI(window.location.search);
    let reg = /(([^?&=]+)(?:=([^?&=]*))*)/g;
    let result = {};
    url.replace(reg, function () {
        let key = arguments[2];
        let val = arguments[3] || "";
        val = val.split("#")[0];
        result[key] = val;
    });
    return result;
}

/**
 * Author: huangzhiyang
 * Date: 2016/7/27 17:00
 * Description: ""
 * Change: wells_xiaoqiang
 */
let ots = Object.prototype.toString;

/**
 * 判断是否数组
 *
 * @name isArray
 * @function
 * @param {Object} o 判断对象
 * @return {boolean} 是否数组
 */
function isArray (o) {
    return o && (o.constructor === Array || ots.call(o) === "[object Array]" || Array.isArray(o));
}

/**
 * 判断是否Object
 *
 * @name isObject
 * @function
 * @param {Object} o 判断对象
 * @return {boolean} 是否Object
 */
function isObject (o) {
    return o && (o.constructor === Object || ots.call(o) === "[object Object]");
}

/**
 * 判断是否布尔类型
 *
 * @name isBoolean
 * @function
 * @param {Object} o 判断对象
 * @return {boolean} 是否布尔类型
 */
function isBoolean (o) {
    return (o === false || o) && (o.constructor === Boolean);
}

/**
 * 判断是否数值类型
 *
 * @name isNumber
 * @function
 * @param {Object} o 判断对象
 * @return {boolean} 是否数值类型
 */
function isNumber (o) {
    return (o === 0 || o) && o.constructor === Number;
}

/**
 * 判断是否undefined
 *
 * @name isUndefined
 * @function
 * @param {Object} o 判断对象
 * @return {boolean} 是否undefined
 */
function isUndefined (o) {
    return typeof (o) === "undefined";
}

/**
 * 判断是否Null
 *
 * @name isNull
 * @function
 * @param {Object} o 判断对象
 * @return {boolean} 是否Null
 */
function isNull (o) {
    return o === null;
}

/**
 * 判断是否function
 *
 * @name isFunction
 * @function
 * @param {Object} o 判断对象
 * @return {boolean} 是否function
 */
function isFunction (o) {
    return o && (o.constructor === Function);
}

/**
 * 判断是否字符串
 *
 * @name isString
 * @function
 * @param {Object} o 判断对象
 * @return {boolean} 是否字符串
 */
function isString (o) {
    return (o === "" || o) && (o.constructor === String);
}

function idcard (code) {

    if (!code || typeof code !== "string") return output(false, "身份证为空或不是string", -1);

    var city = {
        11: "北京",
        12: "天津",
        13: "河北",
        14: "山西",
        15: "内蒙古",
        21: "辽宁",
        22: "吉林",
        23: "黑龙江 ",
        31: "上海",
        32: "江苏",
        33: "浙江",
        34: "安徽",
        35: "福建",
        36: "江西",
        37: "山东",
        41: "河南",
        42: "湖北 ",
        43: "湖南",
        44: "广东",
        45: "广西",
        46: "海南",
        50: "重庆",
        51: "四川",
        52: "贵州",
        53: "云南",
        54: "西藏 ",
        61: "陕西",
        62: "甘肃",
        63: "青海",
        64: "宁夏",
        65: "新疆",
        71: "台湾",
        81: "香港",
        82: "澳门",
        91: "国外 "
    };
    var tip = "";
    var pass = true;
    var errCode = "";

    code = code.toLocaleUpperCase();

    if (!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)) {
        tip = "身份证号格式错误";
        errCode = 1;
        pass = false;
    } else if (!city[code.substr(0, 2)]) {
        tip = "地址编码错误";
        errCode = 2;
        pass = false;
    } else {
        //18位身份证需要验证最后一位校验位
        if (code.length == 18) {
            code = code.split('');
            //∑(ai×Wi)(mod 11)
            //加权因子
            var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
            //校验位
            var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
            var sum = 0;
            var ai = 0;
            var wi = 0;
            for (var i = 0; i < 17; i++) {
                ai = code[i];
                wi = factor[i];
                sum += ai * wi;
            }
            // var last = parity[sum % 11];
            if (parity[sum % 11] != code[17]) {
                tip = "校验位错误";
                errCode = 3;
                pass = false;
            }
        }
    }
    return output(pass, tip, errCode);
}

function isMobile (val) {
    var reg = /^1[0-9]{10}$/;
    var isOk, errMsg, errCode;
    if (!val) {
        isOk = false;
        errCode = 0;
        errMsg = "手机号不能为空";
    } else if (val.length !== 11) {
        isOk = false;
        errCode = 1;
        errMsg = "请输入11位数手机号";
    } else if (!reg.test(val)) {
        isOk = false;
        errCode = 2;
        errMsg = "手机号格式错误";
    } else {
        isOk = true;
        errCode = "";
        errMsg = "";
    }
    return output(isOk, errMsg, errCode);
}

function cloneDeep (obj) {
    if (isObject(obj) || isArray(obj)) {
        return JSON.parse(JSON.stringify(obj))
    }
    return obj;
}

/**
 *
 * @param url
 * @param [max_width]
 * @param [max_height]
 * @param [quality]
 * @param [type]
 * @return {Promise} await
 */
function resizeMe ({url, max_width = 1000, max_height = 1000, quality, type,} = {}) {
    const ToDataUrlType = "image/jpeg",
        isDefaultType = (type || ToDataUrlType) === ToDataUrlType;
    if (!isDefaultType && quality) console.warn(`resizeMe: params quality must use type is 'image/jpeg'`);
    return new Promise((resolve, reject) => {
        if (!url) return reject(new Error('url 不能为空'));
        let img = new Image();
        img.src = url;

        let canvas = document.createElement('canvas');
        let ctx = canvas.getContext("2d");
        img.onload = () => {
            let width = img.width;
            let height = img.height;

            if (width > height) {
                if (width > max_width) {
                    height = Math.round(height * max_width / width);
                    width = max_width;
                }
            } else {
                if (height > max_height) {
                    width = Math.round(width * max_height / height);
                    height = max_height;
                }
            }

            canvas.width = width;
            canvas.height = height;
            ctx.drawImage(img, 0, 0, width, height);
            let base64 = canvas.toDataURL(type || ToDataUrlType, quality);
            resolve(base64);

        };
    })

}

module.exports = {isArray, isObject, isString}
