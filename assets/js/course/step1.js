/**
 * 课程基本信息模块
 */
// define(['jquery', 'template', 'ckeditor', 'form'], function ($, utils, template, ckeditor) {
define(['jquery', 'template', 'form'], function ($, utils, template, ckeditor) {
  var $form = $('form')
  showBasicInfo()

  // 获取地址栏中的参数,返回值是地址参数的对象形式
  function getArg () {
    // 获取地址栏中的参数字符串
    var query = window.location.search  // ?a=1&b=2&c
    var arrTmp = query.split('?')  // ['','a=1&b=2&c']
    var str = ''
    str = arrTmp[1] // a=1&b=2
    var arrQuery = str.split('&') // ['a=1', 'b=2','c']
    var obj = {} // 参数都放到这个对象中
    // 遍历数组
    for (var i = 0; i < arrQuery.length; i++) {
      var item = arrQuery[i]
      var tmp = item.split('=') // [a,'1']
      // 为什么要判断 >1 ，因为如果数组中的数据长度为1的话，是获取不到arr[1]的
      obj[ tmp[0] ] = tmp[1]
    }
    return obj
  }

  // 获取课程基本信息并展示
  function showBasicInfo () {
    $.ajax({
      url: '/api/course/basic',
      type: 'get',
      data: {cs_id: getArg().cs_id},
      success: function (info) {
        if (info.code === 200) {
          // 模板引擎
          var result = template('tpl', info.result)
          $form.html(result)
          // ckeditor.replace('ckEditor')
        }
      }
    })
  }

    // 课程基本信息
  $form.on('submit', 'form', function (e) {
    e.preventDefault()
    var _this = $(this)
    _this.ajaxSubmit({
      url: '/api/course/update/basic',
      type: 'post',
      success: function (data) {
        if (data.code === 200) {
          window.location.href = '/views/course/step2.html?cs_id=' + data.result.cs_id
        }
      }
    })
  })

  // 获取子分类
  $form.on('change', '#top', function () {
    var child = this.next('select')
    var cgId = this.val()
    $.ajax({
      url: '/api/category/child',
      data: {cg_id: cgId},
      success: function (data) {
        if (data.code === 200) {
          // 模板引擎
          var tpl = `{{ each list }}
                      <option value="{{ $value.cg_id }}">{{ $value.cg_name }}</option>
                      {{ /each }}`
          var render = template.compile(tpl)
          var result = render({list: data.result})
          child.html(result)
        }
      }
    })
  })
})
