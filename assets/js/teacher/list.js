/**
 * 讲师列表页面需要完成的功能:
 * 1.展示讲师列表
 * 2.点击查看按钮，弹出模态框,并显示讲师详细信息
 * 3.点击添加讲师跳转到添加讲师的页面
 * 4.点击编辑跳转到编辑页面
 * 5.点击注销，或者启用，将注销或者启用讲师
 */
define(['jquery', 'template', 'bootstrap'], function ($, template) {
  // 定义一个过滤器getAge,根据生日计算出年龄
  template.defaults.imports.getAge = getAge
  showTecList()
  showDetail()
  outTeacher()

  // 展示讲师列表
  function showTecList () {
    var options = {
      url: '/api/teacher',
      type: 'get',
      success: function (data) {
        if (data.code === 200) {
          var result = template('tmpl-list', {list: data.result})
          $('#tec-list').html(result)
        }
      }
    }
    $.ajax(options)
  }

  // 点击查看按钮，弹出模态框,并显示讲师详细信息
  function showDetail () {
    $('#tec-list').on('click', '.showmodal', function () {
      $('#teacherModal').modal()
      var tcId = $(this).parent('td').attr('data-id')
      var options = {
        url: '/api/teacher/view',
        type: 'get',
        data: {
          tc_id: tcId
        },
        success: function (data) {
          if (data.code === 200) {
            // 这将不用模板引擎，尝试一个新技术，es6的模板字符串
            var obj = data.result
            var str = ` 
            <tr>
                  <th>姓名:</th>
                                <td>${obj.tc_name}</td>
                                <th>职位:</th>
                                <td colspan="3">讲师</td>
                                <td rowspan="4" width="128">
                                    <div class="avatar">
                                        <img src="${obj.tc_avatar}" alt="">
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th>花名:</th>
                                <td>${obj.tc_roster}</td>
                                <th>出生日期:</th>
                                <td colspan="3">${getAge(obj.tc_birthday)}</td>
                            </tr>
                            <tr>
                                <th>性别:</th>
                                <td>${obj.tc_gender === '1' ? '女' : '男'}</td>
                                <th>入职日期:</th>
                                <td colspan="3">${obj.tc_join_date}</td>
                            </tr>
                            <tr>
                                <th>手机号码:</th>
                                <td colspan="2">${obj.tc_cellphone}</td>
                                <th>邮箱:</th>
                                <td colspan="2">${obj.tc_email}</td>
                            </tr>
                            <tr>
                                <th>籍贯:</th>
                                <td colspan="6">${obj.tc_tc_hometown}</td>
                            </tr>
                            <tr>
                                <td colspan="7">
                                    <div class="introduce">
                                    ${obj.tc_introduce}
                                        </div>
                                </td>
            </tr>`
            // 把str插入到dom中
            $('#modal-list').html(str)
          }
        }
      }
      $.ajax(options)
    })
  }

  // 点击注销，将注销用户
  function outTeacher () {
    $('#tec-list').on('click', '.start-stop', function () {
      var $this = $(this)
      var $td = $this.parent() // 获取保存了id和status的td元素
      var tcId = $td.attr('data-id') // 获取讲师的id
      var tcStatus = $td.attr('data-status') // 讲师的状态
      var zxOptions = {
        url: '/api/teacher/handle',
        type: 'post',
        data: {
          tc_id: tcId,
          tc_status: tcStatus
        },
        success: function (data) {
          if (data.code === 200) {
            var str = data.result.tc_status === 1 ? '启用' : '注销'
            $this.html(str)
            // 要把data-status这个属性值修改下
            $td.attr('data-status', data.result.tc_status)
          }
        }
      }
      $.ajax(zxOptions)
    })
  }

  // 用于根据生日计算出年龄
  function getAge (value) {
    var birthYear = new Date(value).getFullYear()
    var nowYear = new Date().getFullYear()
    return nowYear - birthYear
  }
})
