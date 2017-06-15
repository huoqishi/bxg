/**
 * 添加讲师功能:
 * 1.对象表单控件进行验证
 * 2.使用日期插件对日期框进行初始化
 * 3.将验证通过后的表单数据发给后端
 * 4.发送成功后，重置表单
 */
define(['jquery', 'validation', 'form', 'locales'], function ($) {
  initDate()
  validForm()

  // 对日期框进行初始化
  function initDate () {
    var options = {
      format: 'yyyy/mm/dd',
      todayHight: true,
      language: 'zh-CN'
    }
    $('input[name="tc_join_date"]').datepicker(options)
  }

  // 对表单进行验证
  function validForm () {
    var options = {
      submitHandler: function (form) {
        formSubmit()
      },
      rules: {
        tc_name: {
          required: true,
          rangelength: [4, 8]
        },
        tc_pass: {
          required: true,
          rangelength: [4, 8]
        },
        tc_join_date: {
          required: true,
          date: true
        }
      },
      messages: {
        tc_name: {
          required: '用户名不能为空',
          rangelength: '用户名长度必须为4-8位数'
        },
        tc_pass: {
          required: '密码不能为空',
          rangelength: '密码必须为4-8位数'
        },
        tc_join_date: {
          required: '日期不能为空',
          date: '日期格式不对，例: 1998/2/23'
        }
      }
    }
    $('form').validate(options)
    // .on('submit')
  }

  // 表单提交
  function formSubmit () {
    var options = {
      url: '/api/teacher/add',
      type: 'post',
      // data: {xxxxx: 'hello'}, 可以使用data, 添加的data中的数据也会被发给后端
      success: function (data) {
        if (data.code === 200) {
          $('form')[0].reset()
          window.alert('添加成功!')
        }
      }
    }
    $('form').ajaxSubmit(options)
  }
})
