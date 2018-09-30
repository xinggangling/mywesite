module.exports = {
  env: 'unit',
  host: 'localhost',
  port: 1234,
  protocol: 'http:', // 协议
  apiHost: '192.168.3.115', // 后台接口 域名
  apiPort: 80, // 后台接口 端口
  crossOrigin: true, // 跨域远程联调或者云端版本设置为 true 
  imagesFromLocal: true, // 图片是否来自于本地
  logo: '0xg.png', // 不展示公司相关logo图片时 noLogo.png
  loginHeader: 'noLoginHeader.png' // noLoginHeader.png
};
