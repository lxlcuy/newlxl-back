$(function () {
    $('#link-reg').on('click', function () {
        $('.reg-box').show().siblings('.login-box').hide();
    })

    $('#link-login').on('click', function () {
        $('.login-box').show().siblings('.reg-box').hide();
    })
    // $('#link-reg').on('click', function () {
    //     $('.reg-box').show()
    //     $('.login-box').hide()


    // })
    // $('#link-login').on('click', function () {
    //     $('.reg-box').hide()
    //     $('.login-box').show()

    // })

    // form表单验证
    var form = layui.form
    var layer = layui.layer
    form.verify({
        pass: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        // 校验两次密码是否一致
        repwd: function (value) {
            // 通过形参拿到密码框中的内容
            // // 也需要拿到密码框中的内容
            // //然后进行判断两次密码是否一致
            var pass = $('.reg-box [name=password]').val();//jquery属性获取方式，中括号获取属性
            if (pass !== value) {
                return '您的密码两次输入不一致';

            }

        }
    })
    // 监听表单注册事件
    $('#form_reg').on('submit', function (e) {

        //发起Ajax请求，并且拿到文本框里面的值提交，并且再判断是否注册成功的条件
        e.preventDefault()
        var data = { username: $('#form_reg [name=username]').val(), password: $('#form_reg [name=password]').val() }
        $.post('http://ajax.frontend.itheima.net/api/reguser', data, function (res) {
            if (res.status !== 0) {
                layer.msg(res.message)
                return;
            }
            layer.msg('注册成功，请登录')
            // 模拟人的行为
            $('#link-login').click();
        })
    })

    // 监听表单登录事件
    $('#form_login').submit(function (e) {
        e.preventDefault();
        $.ajax({
            url: 'http://ajax.frontend.itheima.net/api/login',
            method: 'POST',
            // 快速获取表单里面的数据
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    layer.msg('登录失败')
                    return;
                }
                layer.msg('登录成功')
                localStorage.setItem('token', res.token)
                //跳到后台主页
                location.href = '/index.html'
            }
        })
    })
})
