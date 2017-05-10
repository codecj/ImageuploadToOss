//保留两位小数
var float2bits = exports.float2bits = (flt) =>{
	if(parseFloat(flt) == flt)
        return Math.round(flt * 100) / 100;
    // 到4位小数, return Math.round(flt * 10000) / 10000;
    else
        return 0;
}


//把小于10的数前面补0
var pad = exports.pad = function (n) {
    return n < 10 ? '0' + n.toString(10) : n.toString(10);
};



//把13位时间戳格式化位字符串，如2013-09-05 10:10:10
exports.formattimeFromTimestamp = (timestamp) =>{
	var d = new Date(timestamp);
    var time = [pad(d.getHours()),pad(d.getMinutes()), pad(d.getSeconds())].join(':');
    var date = [d.getFullYear(), pad(d.getMonth() + 1), pad(d.getDate())].join('-');
    return [date, time].join(' ');
}
