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
    bootstrap: 'bootstrap/dist/js/bootstrap'
  },
  shim: {
    bootstrap: {
      deps: ['jquery']
    }
  }
})
