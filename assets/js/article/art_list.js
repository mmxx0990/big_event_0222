// 入口函数
$(function () {
    // 为 art-template 定义时间过滤器

    template.defaults.imports.dateFormat = function (dtStr) {
        let dt = new Date(dtStr)

        var y = dt.getFullYear()
        var m = padZero(dt.getMonth() + 1)
        var d = padZero(dt.getDate())

        var hh = padZero(dt.getHours())
        var mm = padZero(dt.getMinutes())
        var ss = padZero(dt.getSeconds())

        return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
    }


    //  在个位数的左侧填充0
    function padZero(n) {
        return n > 9 ? n : '0' + n
    }


    // 定义查询参数
    let q = {
        pagenum: 1,      // 页码值，默认请求第一页的数据
        pagesize: 3,     // 每页显示几条数据，默认每页显示2条
        cate_id: '',     // 文章分类的 Id
        state: ''        // 文章的发布状态
    }

    // 2 初始化文章列表
    let layer = layui.layer;
    initTable();
    // 封装函数初始化文章列表函数
    function initTable() {
        //  发送ajax
        $.ajax({
            url: '/my/article/list',
            method: 'get',
            data: q,
            success: (res) => {
                // console.log(res);
                // 判断是否成功返回数据
                if (res.status !== 0) {
                    return layer.msg("获取文章列表失败！")
                }
                // 获取成功，渲染数据
                let htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)

                // 调用分页
                renderPage(res.total);
            }
        })
    }

    //   3初始化分类
    let form = layui.form;        //导入form
    //  封装函数
    initCate();
    function initCate() {
        $.ajax({
            url: '/my/article/cates',
            method: 'get',
            success: (res) => {
                // console.log(res);
                // 效验
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                // 赋值
                let htmlStr = template("tpl-cate", { data: res.data });
                $("[name=cate_id]").html(htmlStr);
                form.render();
            }
        })
    }

    // 4筛选功能
    $("#form-search").on("submit", function (e) {
        e.preventDefault();
        // 获取
        let state = $("[name=state]").val()
        let cate_id = $("[name='cate_id']").val()
        // 赋值
        q.state = state;
        q.cate_id = cate_id;
        // 初始化文章列表
        initTable();

    })

    //   5分页
    let laypage = layui.laypage;
    function renderPage(total) {
        //   执行一个laypage实例
        laypage.render({
            elem: 'pageBox',     //注意，这里的 test1 是 ID，不用加 # 号
            count: total,       //数据总数，从服务端得到
            limit: q.pagesize,    //每页几条
            curr: q.pagenum,       //第几页
            theme: '#02fc00',
            //  分页模块设置，显示那些模块
            layout: ["count", "limit", "prev", "page", "next", "skip", "refresh"],
            // 每页显示多少条数据的选择器
            limits: [3, 5, 8, 10, 13, 15, 20],
            // 页码切换触发这个方法
            jump: function (obj, first) {
                //obj包含了当前分页的所有参数，比如：
                // console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
                // console.log(obj.limit); //得到每页显示的条数
                //首次不执行
                // 判断，不是第一次初始化分页，才能重新调用初始化文章列表
                if (!first) {
                    //do something
                    // 改变当前页
                    q.pagenum = obj.curr;
                    // 把最新的条目数，赋值到 q 这个查询参数对象的 pagesize 属性中
                    q.pagesize = obj.limit;
                    //    重新渲染页面
                    initTable();
                }
            }

        });
    }
    // 6删除
    // let layer = layui.layer;
    $("tbody").on("click", ".btn-delete", function () {
        //  先获取id 进入到函数this代指就改变了
        let Id = $(this).attr("data-id");
        //   显示对话框
        layer.confirm('是否确认删除', { icon: 3, title: '提示' }, function (index) {
            $.ajax({
                url: '/my/article/delete/' + Id,
                method: 'get',
                success: (res) => {
                    // console.log(res);
                    if (res.status !== 0) {
                        return layer.msg(res.message)
                    }
                    // 页面汇总删除按钮个数等于1，页码大于1
                    if ($(".btn-delete").length == 1 && q.pagenum > 1) {
                        q.pagenum--;
                    }
                    //   提示
                    layer.msg("害！，文章类别删除成功!", { icon: 5 });
                    //    关闭弹窗
                    layer.close(index);
                    // 添加成功渲染页面
                    initTable();
                }
            })
        })
    })



})