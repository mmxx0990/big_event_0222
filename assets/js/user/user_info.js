$(function () {
    //   自定义检测规则
    let form = layui.form
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return "昵称长度为1~6位之间！"
            }
        }
    })

    // 用户渲染
    initUserInfo();
    //   导出layer
    let layer = layui.layer;
    // 封装函数
    function initUserInfo() {
        $.ajax({
            url: '/my/userinfo',
            method: 'get',
            success: (res) => {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                // 成功后渲染
                form.val('formUserInfo', res.data)
            }
        })
    }
    // 重置
    $("#btnReset").on("click", function (e) {
        e.preventDefault();
        // 用上面的用户渲染方法实现
        initUserInfo();

    })

    // 修改用户信息
    $(".layui-form").on("submit", function (e) {
        // 阻止默认行为
        e.preventDefault();
        $.ajax({
            url: '/my/userinfo',
            type: 'post',
            data: $(this).serialize(),
            success: (res) => {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg("用户信息修改失败！")
                }
                layer.msg("恭喜您，用户信息修改成功！")
                //    调用父页面中的更新用户信息和头像方法
                window.parent.getUserInfo();
            }
        })
    })
})