// 注意：每次调用$.get 或者post ajax的时候
//会先调用ajaxPrefilter()
// 在这个函数中，可以拿到我们给Ajax提供的配置对象
$.ajaxPrefilter(function (options) {

    // 在真正发起Ajax请求之前，统一请求拼接根路径
    options.url = 'http://ajax.frontend.itheima.net' + options.url
    console.log(options.url);
})

