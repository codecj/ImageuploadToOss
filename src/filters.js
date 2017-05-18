//保留两位小数
var float2bits = exports.float2bits = (value) => {
    var value = Math.round(parseFloat(value) * 100) / 100;
    var xsd = value.toString().split(".");
    if (xsd.length == 1) {
        value = value.toString() + ".00";
        return value;
    }
    if (xsd.length > 1) {
        if (xsd[1].length < 2) {
            value = value.toString() + "0";
        }
        return value;
    }
}


//把小于10的数前面补0
var pad = exports.pad = function(n) {
    return n < 10 ? '0' + n.toString(10) : n.toString(10);
};



//把13位时间戳格式化位字符串，如2013-09-05 10:10:10
exports.formattimeFromTimestamp = (timestamp) => {
    var d = new Date(timestamp);
    var time = [pad(d.getHours()), pad(d.getMinutes()), pad(d.getSeconds())].join(':');
    var date = [d.getFullYear(), pad(d.getMonth() + 1), pad(d.getDate())].join('-');
    return [date, time].join(' ');
}
