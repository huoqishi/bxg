/**
 * 创建课程模块
 */
define(['jquery', 'form'], function ($) {
  // 创建课程
  $('#createForm').on('submit', function (e) {
    e.preventDefault()
    $(this).ajaxSubmit({
      url: '/api/course/create',
      type: 'post',
      success: function (data) {
        if (data.code === 200) {
          window.location.href = '/views/course/step1.html?cs_id=' + data.result.cs_id
        }
      }
    })
  })
})
