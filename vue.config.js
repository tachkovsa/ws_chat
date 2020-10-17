module.exports = {
  lintOnSave: false,
  devServer: {
    proxy: {
      '/images/': {
        target: 'https://tsa.websoft.ru/',
      },
      '/services/': {
        target: 'https://tsa.websoft.ru/',
        ws: true,
      },
      '/default.html': {
        target: 'https://tsa.websoft.ru/',
      },
      '/conversation_api.html': {
        target: 'https://tsa.websoft.ru/',
      },
      '/person_icon.html': {
        target: 'https://tsa.websoft.ru/',
      },
      'download_file.html': {
        target: 'https://tsa.websoft.ru/',
      },
      '/view_doc.html': {
        target: 'https://tsa.websoft.ru/',
      },
    },
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "~@/styles/base.scss";',
      },
    },
  },
  assetsDir: '@/assets/',
};
