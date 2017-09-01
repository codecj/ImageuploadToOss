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

exports.subStringMax8 = (valuse) =>{
    if (valuse.length > 8) {
        return valuse.substring(0,8);
    }else{
        return valuse;
    }
}
/*
* num 最大显示位数 必填
* ellipsis 是否显示‘...’ true显示 false不显示 默认不显示 非必填
* 说明：截取已半角占位为计算单位，即一个中文字为2个字符
* */
exports.subStringMaxnum = (valuse,num,ellipsis) =>{
    var lenCount=0;
    var cutString='';
    var strLen=valuse.length;
    for (var i = 0; i < strLen ; i++ ) {
        if (isFull(valuse.charAt(i))) {
            lenCount += 2;
        } else {
            lenCount += 1;
        }
        if(lenCount>num){
            cutString=valuse.substring(0, i);
            break;
        }else if(lenCount==num){
            cutString=valuse.substring(0, i+1);
            break;
        }
        if((strLen-1)==i){
            cutString=valuse;
        }
    }
    if(ellipsis){
        cutString+='...';
    }
    return cutString;
    function isFull (pChar) {
        for (var i = 0; i < pChar.strLen ; i++ ) {
            if ((pChar.charCodeAt(i) > 128)) {
                return true;
            } else {
                return false;
            }
        }
    }
}

