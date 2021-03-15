$(function () {
    // 定义效验规则
    let form = layui.form;
    form.verify({
        //    密码
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        //    新旧不重复
        samePwd: function (value) {
            // value是新密码，旧密码需要获取
            if (value == $("[name=oldPwd]").val()) {
                return "原密码和旧密码不能相同！"
            }
        },
        // 两次新密码必须相同
        rePwd: function (value) {
            // value是再次输入的新密码，需要获取新输入的密码
            if (value !== $("[name=newPwd]").val()) {
                return "两次新密码输入不一致"
            }
        }
    })

    //   表单提交
    $(".layui-form").on("submit", function (e) {
        // 阻止默认行为
        e.preventDefault();
        $.ajax({
            url: '/my/updatepwd',
            method: 'post',
            data: $(this).serialize(),
            success: (res) => {
                // console.log(res);
                if (res.status !== 0) {
                    return layui.layer.msg(res.message);
                }
                layui.layer.msg("修改密码成功！")
                $(".layui-form")[0].reset();
            }
        })

    })

})