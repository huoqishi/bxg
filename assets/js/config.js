/**
 * RequireJS的配置文件
 */
require.config({
  baseUrl: '/node_modules',
  paths: {
    jquery: 'jquery/dist/jquery',
    cookie: 'jquery.cookie/jquery.cookie',
    nprogress: 'nprogress/nprogress',
    template: 'art-template/lib/template-web',
    bootstrap: 'bootstrap/dist/js/bootstrap',
    datepicker: 'bootstrap-datepicker/dist/js/bootstrap-datepicker',
    locales: 'bootstrap-datepicker/dist/locales/bootstrap-datepicker.zh-CN.min',
    validation: 'jquery-validation/dist/jquery.validate',
    form: 'jquery-form/dist/jquery.form.min',
    uploadify: '/assets/libs/uploadify/jquery.uploadify'
  },
  shim: {
    bootstrap: {
      deps: ['jquery']
    },
    locales: {
      deps: ['jquery', 'datepicker']
    },
    uploadify: {
      deps: ['jquery']
    }
  }
})
