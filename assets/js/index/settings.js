/**
 * 个人中心功能
 */
define(['jquery', 'template', 'validation', 'form', 'uploadify', 'datepicker', 'locales'], function ($, template) {
  showInfos()

  // 获取个人信息并展示
  function showInfos () {
    var options = {
      url: '/api/teacher/profile',
      type: 'get',
      success: function (data) {
        if (data.code === 200) {
          // 用模板引擎把数据呈现到dom中
          var result = template('tmpl-center', data.result)
          $('form').html(result)
          uploadAvatar()
          initDatePicker()
          initValidation()
        }
      }
    }
    $.ajax(options)
  }

  // 完成上传头像功能
  function uploadAvatar () {
    var options = {
      width: 120,
      height: 120,
      buttonText: '',
      swf: '/assets/libs/uploadify/uploadify.swf',
      uploader: '/api/uploader/avatar',
      fileObjName: 'tc_avatar',
      onUploadSuccess: function (file, data) {
        var obj = JSON.parse(data)
        $('#upfileimg').attr('src', obj.result.path)
      }
    }
    $('#upfile').uploadify(options)
  }

  // 对日期插件的初始化
  function initDatePicker () {
    var options = {
      format: 'yyyy/mm/dd',
      langulage: 'zh-CN'
    }
    $('input[name="tc_birthday"]').datepicker(options)
    $('input[name="tc_join_date"]').datepicker(options)
  }

  // 对表单验证插件的初始化
  function initValidation () {
    var options = {
      submitHandler: function (form) {
        submitForm()
      },
      rules: {
        tc_roster: {
          required: true
        },
        tc_birthday: {
          required: true
        },
        tc_cellphone: {
          required: true
        },
        tc_email: {
          required: true,
          eamil: true
        },
        tc_join_date: {
          required: true,
          date: true
        },
        tc_introduce: {
          require: true
        }
      },
      messages: {
        tc_roster: {
          required: '用户昵称不能为空!'
        },
        tc_birthday: {
          required: '用户生日不能为空!'
        },
        tc_cellphone: {
          required: '用户手机不能为空!'
        },
        tc_email: {
          required: '用户邮箱不能为空!',
          eamil: '邮箱格式不正确!'
        },
        tc_join_date: {
          required: '入职日期不能为空!',
          date: '日期格式不正确!'
        },
        tc_introduce: {
          require: '个人介绍不能为空!'
        }
      }
    }
    $('form').validate(options)
  }

  // 将表单中的数据提交给后端
  function submitForm () {
    var options = {
      url: '/api/teacher/modify',
      type: 'post',
      success: function (data) {
        if (data.code === 200) {
          window.alert('修改成功!')
        }
      }
    }
    $('form').ajaxSubmit(options)
  }
})
