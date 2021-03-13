//   入口函数
$(function () {

    // 1.点击去注册账号，隐藏登录区域，显示注册区域
    $("#link_reg").on("click", function () {
        $(".login_box").hide();
        $(".reg_box").show();
    })

    // 2.点击去登陆，显示登录区域，隐藏注册区域
    $("#link_login").on("click", function () {
        $(".login_box").show();
        $(".reg_box").hide();
    })

    // 自定义验证规则
    let form = layui.form;
    form.verify({
        // 密码规则
        pwd: [
            /^[\S]{6,12}$/,
            '密码必须6到12位，且不能出现空格'
        ],
        // 确认密码规则
        repwd: function (value) {
            let pwd = $(".reg_box input[name=password]").val();
            // 比较
            if (value != pwd) {
                return "两次密码输入不一致";
            }
        }
    })

    // 3.注册功能
    let layer = layui.layer
    $("#form_reg").on("submit", function (e) {
        // 阻止表单提交
        e.preventDefault();
        $.ajax({
            url: '/api/reguser',
            type: 'post',
            data: {
                username: $(".reg_box input[name=username]").val(),
                password: $(".reg_box input[name=password]").val(),
            },
            success: (res) => {
                console.log(res);
                // 返回状态判断
                if (res.status != 0) {
                    // return alert(res.message);
                    return layer.msg(res.message, { icon: 5 });
                }
                //  // 提交成功后处理代码
                // alert("恭喜！注册成功");
                layer.msg("恭喜！注册成功", { icon: 6 });
                //   切换到登录表单
                $("#link_login").click();
                // 重置form表单
                $("#form_reg")[0].reset();

            }
        })
    })
    // 5.登录功能
    $("#form_login").on("submit", function (e) {
        // 阻止表单提交
        e.preventDefault();
        $.ajax({
            url: '/api/login',
            type: 'post',
            data: $(this).serialize(),
            success: (res) => {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                // 提示信息，保存token，跳转页面
                layer.msg("恭喜您，登录成功！", { icon: 6 })
                // 保存token，未来接口要用token
                localStorage.setItem("token", res.token)
                //跳转
                location.href = "/index.html"
            }
        })
    })



})