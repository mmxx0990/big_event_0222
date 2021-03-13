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
})