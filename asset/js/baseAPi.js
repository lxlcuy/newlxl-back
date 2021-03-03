// 注意：每次调用$.get 或者post ajax的时候
//会先调用ajaxPrefilter()
// 在这个函数中，可以拿到我们给Ajax提供的配置对象
$.ajaxPrefilter(function (options) {

    // 在真正发起Ajax请求之前，统一请求拼接根路径
    options.url = 'http://ajax.frontend.itheima.net' + options.url
    // console.log(options.url);
    if (options.url.indexOf('/my/' !== -1)) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    options.complete = function (res) {
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

