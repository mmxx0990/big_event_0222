// 环境服务地址
// 1
let baseURL = "http://api-breakingnews-web.itheima.net";

// 2
// let baseURL = "http://api-breakingnews-web.itheima.net";

// 3
// let baseURL = "http://api-breakingnews-web.itheima.net";

// 拦截所有ajax请求 git  post  ajax
// 处理参数
$.ajaxPrefilter(function (params) {
    // 打印
    // console.log(params);
    // 拼接对应环境的服务地址
    params.url = baseURL + params.url;

    //   2身份认证
    if (params.url.indexOf("/my/") != -1) {
        params.headers = {
            Authorization: localStorage.getItem("token") || ""
        }
    }

    // 3.拦截所有响应，判断身份认证
    params.complete = function (res) {
        // console.log(res.responseJSON);
        let obj = res.responseJSON;
        if (obj.status == 1 && obj.message == "身份认证失败！") {
            // 清空本地token
            localStorage.removeItem("token")
            // 页面跳转
            location.href = "login.html"
        }
    }

})