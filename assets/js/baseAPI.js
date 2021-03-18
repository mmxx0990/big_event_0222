let qq = "http://api-breakingnews-web.itheima.net"
$.ajaxPrefilter(function (params) {
    // console.log(params);
    // console.log(params.url);
    params.url = qq + params.url
})