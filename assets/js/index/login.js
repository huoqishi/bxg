/**
 * 登陆页面的功能
 * 主要是将用户名和密码发送给后端
 */
define(['jquery', 'cookie'], function ($) {
  // 注册登陆按钮的点击事件
  $('.signin').on('click', function (e) {
    // 阻止默认事件, 因为不阻止的话，表单就会直接提交，页面会重新加载，后缀的js代码就无法执行了
    e.preventDefault()
    var name = $('#name').val() // 用户名
    var pass = $('#pass').val() // 密码
    // 判断 用户名 或者 密码 是否为空
    if (!name.trim() || !pass.trim()) {
      // 如果 用户名 或者 密码 为空的话，则给用户一个提示，并结束当前方法的执行
      return window.alert('请输入用户名或者密码!')
    }
    // 发ajax请求,要对着接口文档去发请求
    var options = { // jquery的ajax方法的参数
      url: '/api/login',
      type: 'post',
      data: {
        tc_name: name,
        tc_pass: pass
      },
      success: function (data) {
        // 判断是否登陆成功!
        if (data.code === 200) {
          // 把用户头像和名字保存到cookie中
          $.cookie('userinfo', JSON.stringify(data.result), {
            expires: 7,
            path: '/' // 赋值为/的目的,  是为了让当前网站的任何页面，都能够读取到这个cookie的值
          })
          // 跳转到首页
          window.location.href = '/views/index/dashboard.html'
        }
      },
      error: function () {
        // 状态码404,会进行error执行
        window.alert('登陆失败！')
      }
    }
    $.ajax(options)
  })
})
