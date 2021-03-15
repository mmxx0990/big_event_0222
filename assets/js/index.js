// 入口函数
$(function () {
    // 需求1：ajax获取用户信息，渲染到页面
    //这个功能，后面其他页面/模块要用，所以必须设置为全局函数
    getUserInof();

    //  二 退出
    let layer = layui.layer;
    $("#btnLogout").on("click", function () {
        layer.confirm('是否确认退出？', { icon: 3, title: '提示' }, function (index) {
            // 清空本地token
            localStorage.removeItem("token")
            // 页面跳转
            location.href = "/login.html"
            // 关闭询问框
            layer.close(index);
        });

    })

})

// 必须是全局函数
function getUserInof() {
    $.ajax({
        url: '/my/userinfo',
        // // 配置头信息，设置token,身份识别认证
        // headers: {
        //     Authorization: localStorage.getItem("token") || ""
        // },
        success: (res) => {
            // console.log(res);
            if (res.status != 0) {
                return layui.layer.msg(res.message)
            }
            // 请求成功，渲染头像
            renderAvatar(res.data);
        }
    })
}

function renderAvatar(user) {
    //    1渲染名称（nickname优先，如果没有，就用username）
    let name = user.nickname || user.username;
    $("#welcome").html("欢迎&nbsp;&nbsp;&nbsp;" + name)
    // 2渲染头像
    if (user.user_pic != null) {
        // 有头像
        $(".layui-nav-img").show().attr("src", user.user_pic);
        $(".text-avatar").hide();
    } else {
        // 没有头像
        $(".layui-nav-img").hide();
        let text = name[0].toUpperCase();
        $(".text-avatar").show().html(text);
    }

}