$(function () {
    //    文章类别列表展示
    initArtCatelist();
    // 封装函数
    function initArtCatelist() {
        $.ajax({
            url: '/my/article/cates',
            success: (res) => {
                // console.log(res);
                let str = template("tpl-art-cate", { data: res.data })
                $("tbody").html(str);
            }
        })
    }
    //    2 显示添加文章分类列表
    let indexAdd = null;
    $("#btnAdd").on("click", function () {
        indexAdd = layer.open({
            type: 1,
            title: '添加文章分类',
            area: ['500px', '300px'],
            content: $("#dialog-add").html(),
        });
    })
    //  3提交文章分类添加   事件委托
    $("body").on("submit", "#form-add", function (e) {
        e.preventDefault();
        $.ajax({
            url: '/my/article/addcates',
            method: 'post',
            data: $(this).serialize(),
            success: (res) => {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                // 添加成功渲染页面
                initArtCatelist();
                //   提示
                layer.msg("恭喜您，添加成功!");
                //    关闭弹窗
                layer.close(indexAdd);
            }
        })
    })
    // 4修改 -展示表单
    let indexEdit = null;
    let form = layui.form;
    $("tbody").on("click", ".btn-edit", function () {
        indexEdit = layer.open({
            type: 1,
            title: '修改文章分类',
            area: ['500px', '300px'],
            content: $("#dialog-edit").html(),
        });
        //  4.2获取id  ，发送ajax获取数据，渲染页面
        let Id = $(this).attr("data-id");
        // alert(Id)
        $.ajax({
            url: '/my/article/cates/' + Id,
            method: 'get',
            success: (res) => {
                // console.log(res);
                form.val("form-edit", res.data)
            }
        })

    })

    // 4-4修改提交
    $("body").on("submit", "#form-edit", function (e) {
        e.preventDefault();
        $.ajax({
            url: '/my/article/updatecate',
            method: 'post',
            data: $(this).serialize(),
            success: (res) => {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                // 添加成功渲染页面
                initArtCatelist();
                //   提示
                layer.msg("恭喜您，文章类别更新成功!");
                //    关闭弹窗
                layer.close(indexEdit);
            }
        })
    })

    // 5删除
    $("tbody").on("click", ".btn-delete", function () {
        //  先获取id 进入到函数this代指就改变了
        let Id = $(this).attr("data-id");
        //   显示对话框
        layer.confirm('是否确认删除', { icon: 3, title: '提示' }, function (index) {
            $.ajax({
                url: '/my/article/deletecate/' + Id,
                method: 'get',
                success: (res) => {
                    // console.log(res);
                    if (res.status != 0) {
                        return layer.msg(res.message)
                    }
                    // 添加成功渲染页面
                    initArtCatelist();
                    //   提示
                    layer.msg("恭喜您，文章类别删除成功!");
                    //    关闭弹窗
                    layer.close(index);
                }
            })
        })
    })
})

