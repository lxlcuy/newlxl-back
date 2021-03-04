$(function () {
    var form = layui.form
    var layer = layui.layer
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                "请输入1-6之间的字符"
                return;
            }
        }
    })
    initUserInfo();
    // 初始化用户信息
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    layer.msg('获取用户信息失败!')
                    return;
                }
                console.log(res);

                form.val('formUserInfo', res.data)
            }

        })
    }
    //重置表单数据
    $('#btnReset').on('click', function (e) {
        // alert(1)
        // 阻止表单默认提交清空行为
        e.preventDefault();
        initUserInfo();

    })
    $('.layui-form').on('submit', function (e) {

        // 阻止表单默认提交行为
        e.preventDefault();
        // 发起ajax 数据提交
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    layer.msg('用户信息更新失败！')
                    return;
                }
                layer.msg('用户信息更新成功')
                // console.log(res);
                window.parent.getUserInfo();
            }
        })
    })
})