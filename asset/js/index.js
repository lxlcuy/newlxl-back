$(function () {

    getUserInfo();
    var layer = layui.layer
    $('#btnLogot').on('click', function () {
        // 提示用户是否退出
        layer.confirm('是否确定退出?', { icon: 3, title: '提示' }, function (index) {
            //do something
            // 1.清空本地储存
            localStorage.removeItem('token')
            //重新跳转页面
            location.href = '/login.html'
            layer.close(index);
        });
    })
})
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''

        // },
        success: function (res) {
            if (res.status !== 0) {
                layui.layer.msg('获取用户信息失败')
            }
            //调用renderAvatar 渲染用户头像
            renderAvatar(res.data)
        },
        // 无论成功与否都会执行这个函数
        complete: function (res) {
            // 在这个函数中，会使用res.responseJION拿到响应回来的数据
            // console.log(res.responseJSON.status)

            if (res.responseJSON.status === 1) {

                // 1.强制清空token
                localStorage.removeItem('token')
                // 并且强制跳转登录页面
                location.href = '/login.html'
                // location.href = '/login.html'
            }
            console.log(res, '123434');
            console.log(res.responseJSON);
        }
    })
}
function renderAvatar(user = {}) {
    // 获取用户的名称
    var name = user.nickname || user.username
    // 设置欢迎的文本
    $('.welcome').html('欢迎&nbsp;&nbsp;' + name)
    // 按需渲染用户头像
    if (user.user_pic !== null) {
        // 渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.text-avatar').hide();
    }
    else {
        // 渲染文本头像
        $('.layui-nav-img').hide();
        var first = name[0].toUpperCase();
        $('.text-avatar').html(first).show();
    }

}