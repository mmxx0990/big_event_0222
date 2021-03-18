$(function () {
    $("#link-reg").on("click", function () {
        $(".login-box").hide();
        $(".reg-box").show();
    })
    $("#link-login").on("click", function () {
        $(".login-box").show();
        $(".reg-box").hide();
    })
    // 3
    let form = layui.form;
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        repwd: function (value) {
            // console.log(value);
            let pwd = $(".reg-box input[name=repassword]").val()
            if (value !== pwd) {
                return "两次密码不一致！"
            }
        }
    })
    layer = layui.layer
    $("#form_reg").on("submit", function (e) {
        e.preventDefault()
        $.ajax({
            url: '/api/reguser',
            method: 'post',
            data: {
                username: $(".reg-box input[name=username]").val(),
                password: $(".reg-box input[name=password]").val()
            },
            success: (res) => {
                // console.log(res);
                if (res.status != 0) {
                    return layer.msg(res.message, { icon: 5 });
                }
                layer.msg(res.message, { icon: 6 });
                $("#link-login").click()
                $("#form_reg")[0].reset()
            }
        })
    })

    $("#form_login").on("submit", function (e) {
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            method: 'post',
            data: $(this).serialize(),
            success: (res) => {
                // console.log(res);
                if (res.status != 0) {
                    return layer.msg(res.message, { icon: 5 });
                }
                layer.msg(res.message, { icon: 6 });
                localStorage.setItem("token", res.token)
                location.href = "/index.html"
            }
        })
    })
})