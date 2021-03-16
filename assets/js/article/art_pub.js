// 入口函数
$(function () {
    //    初始化分类
    let form = layui.form;      //导入form
    let layer = layui.layer;      //导入layer
    initCate();      //调用函数
    function initCate() {
        $.ajax({
            url: '/my/article/cates',
            method: 'get',
            success: (res) => {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                //   赋值渲染
                let htmlStr = template("tpl-cate", { data: res.data })
                $("[name='cate_id']").html(htmlStr);
                form.render();
            }
        })
    }
    // 初始化富文本编辑器
    initEditor();

    // 3.1. 初始化图片裁剪器
    var $image = $('#image')

    // 3.2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3.3. 初始化裁剪区域
    $image.cropper(options);

    // 4点击按钮，选择图片
    $("#btnChooseImage").on("click", function () {
        $("#coverFile").click();
    })
    // 5设置图片
    $("#coverFile").change(function (e) {
        // 获取到文件的列表数组
        var files = e.target.files[0]
        // 判断用户是否选择了文件
        if (files.length === 0) {
            return
        }
        // 根据文件，创建对应的 URL 地址
        var newImgURL = URL.createObjectURL(files)
        // 为裁剪区域重新设置图片
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    })
    // 6设置状态
    let state = "已发布";
    $('#btnSave2').on('click', function () {
        state = '草稿'
    })

    //    7   添加文章
    $('#form-pub').on('submit', function (e) {
        // 1. 阻止表单的默认提交行为
        e.preventDefault()
        // 2. 基于 form 表单，快速创建一个 FormData 对象
        let fd = new FormData(this)
        // 3. 将文章的发布状态，存到 fd 中
        fd.append('state', state)
        //放入图片
        $image.cropper('getCroppedCanvas', {
            width: 400,
            height: 280,
        })
            .toBlob(function (blob) {
                // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                // 5. 将文件对象，存储到 fd 中
                fd.append('cover_img', blob)
                // console.log(...fd);
                // 6. 发起 ajax 数据请求    封装
                publishArticle(fd);
            })

    })
    //  封装，添加文章方法
    function publishArticle(fd) {
        $.ajax({
            method: 'POST',
            url: '/my/article/add',
            data: fd,
            // 注意：如果向服务器提交的是 FormData 格式的数据，
            // 必须添加以下两个配置项
            contentType: false,
            processData: false,
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('发布文章成功！')
                // 发布文章成功后，跳转到文章列表页面
                setTimeout(function () {
                    window.parent.document.getElementById("art_list").click();
                }, 1000)
            }
        })
    }

})
