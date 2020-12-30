$(function(){


    $('#link_reg').on('click', function() {
        $('.login-box').hide()
        $('.reg-box').show()
      })
    
      // 点击“去登录”的链接
      $('#link_login').on('click', function() {
        $('.login-box').show()
        $('.reg-box').hide()
      })
//验证
let form = layui.form
form.verify({
  pwd:[/^[\S]{6,12}$/,'密码必须6到12位;不含空格'],
  repwd: function(value){
    var pwd = $('.reg-box [name=password]').val()
    if(pwd !== value){
      return "两次密码不一样"
    }
  }
})
//监听表单的提交时间
$("#form_reg").on("submit",function(e){
  e.preventDefault()
  var layer = layui.layer
  let data = {
    username: $("#form_reg  [name=username]").val(),
    password: $('#form_reg [name=password]').val()
  }
  $.post('/api/reguser', data, function(res) {
    console.log(res);
    if (res.status !== 0) {
      return layer.msg(res.message)
    }
       layer.msg("注册成功")
       $('#link_login').click()
  })
})

//登录请求
$("#form_login").on("submit",function(){
e.preventDefault()
let data = $(this).serialize()

$.ajax({
  url: 'http://ajax.frontend.itheima.net/api/login',
  method: 'POST',
  // 快速获取表单中的数据
  data,
  success: function(res) {
    if (res.status !== 0) {
      return layer.msg('登录失败！')
    }
    layer.msg('登录成功！')
    // 将登录成功得到的 token 字符串，保存到 localStorage 中
    localStorage.setItem('token', res.token)
    // 跳转到后台主页
    location.href = '/index.html'
  }
})




























    //入口
})