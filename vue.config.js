const serverUrl = 'https://tsa.websoft.ru/';

module.exports = {
  lintOnSave: false,
  devServer: {
    proxy: {
      '/images/': { target: serverUrl, },
      '/services/': { target: serverUrl, ws: true, },
      '/default.html': { target: serverUrl, },
      '/conversation_api.html': { target: serverUrl, },
      '/person_icon.html': { target: serverUrl, },
      'download_file.html': { target: serverUrl, },
      '/view_doc.html': { target: serverUrl, },
      '/vclass/': { target: serverUrl, },
      '/scripts/': { target: serverUrl, }
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
