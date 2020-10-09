function ajax(options) {
    options = options || {};
    options.type = (options.type || "GET").toUpperCase();
    options.dataType = options.dataType || "json";
    var params = formatParams(options.data);
    //创建xhr对象 - 非IE6
    if (window.XMLHttpRequest) {
        var xhr = new XMLHttpRequest();
    } else { //IE6及其以下版本浏览器
        var xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }
    //GET POST 两种请求方式
    if (options.type == "GET") {
        // console.log(params);
        xhr.open("GET", options.url + "?" + params, true);
        xhr.send(null);
    } else if (options.type == "POST") {
        xhr.open("POST", options.url, true);
        //设置表单提交时的内容类型
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(params);
    }
    //接收
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            var status = xhr.status;
            if (status >= 200 && status < 300) {
                options.success && options.success(xhr.responseText);
            } else {
                options.fail && options.fail(status);
            }
        }
    }
}
//格式化参数
function formatParams(data) {
    var arr = [];
    for (var name in data) {
        arr.push(name + "=" + data[name]);
    }
    return arr.join("&");
}
const sendAjax= function(val){
    console.log("发送请求:"+val);
    ajax({
        url: 'http://106.14.24.32/activation/activation.php',
        type: "GET",
        data: {
            bundle: "CocosGame",
            value: val
        }
    })
}

module.exports = {sendAjax};