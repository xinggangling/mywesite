const config = require('../config/development');
const apiHost = config.apiHost || '';
const apiPort = config.apiPort || 0;
const protocol = config.protocol || 'http:'
const host = config.host || 'localhost';
const port = config.port || 80;

module.exports = { // proxy URLs to backend development server
  '/api/**': {
    target: protocol + '//' + apiHost + (apiPort === 80 || apiPort === 443 ? ':' + apiPort : '5000') + '/api/',
    changeOrigin: true,
  },
  '/admin/**': {
    target: protocol + '//' + apiHost + (apiPort === 80 || apiPort === 443 ? ':' + apiPort : '7006') + '/admin/',
    changeOrigin: true
  },
  '/business/**': {
    target: protocol + '//' + apiHost + (apiPort === 80 || apiPort === 443 ? ':' + apiPort : '6013') + '/business/',
    changeOrigin: true
  },
  '/public/**': {
    target: protocol + '//' + apiHost + (apiPort === 80 || apiPort === 443 ? ':' + apiPort : '6014') + '/public/',
    changeOrigin: true
  },
  '/dict/**': {
    target: protocol + '//' + apiHost + (apiPort === 80 || apiPort === 443 ? ':' + apiPort : '6011') + '/dict/',
    changeOrigin: true
  },
  '/model/**': {
    target: protocol + '//' + apiHost + (apiPort === 80 || apiPort === 443 ? ':' + apiPort : '6120') + '/model/',
    changeOrigin: true
  },
  '/collection/**': {
    target: protocol + '//' + apiHost + (apiPort === 80 || apiPort === 443 ? ':' + apiPort : '7200') + '/collection/',
    changeOrigin: true
  },
  '/customer/**': {
    target: protocol + '//' + apiHost + (apiPort === 80 || apiPort === 443 ? ':' + apiPort : '6012') + '/customer/',
    changeOrigin: true
  },
  '/statis/**': {
    target: protocol + '//' + apiHost + (apiPort === 80 || apiPort === 443 ? ':' + apiPort : '7109') + '/statis/',
    changeOrigin: true
  },
  '/loan/**': {
    target: protocol + '//' + apiHost + (apiPort === 80 || apiPort === 443 ? ':' + apiPort : '7201') + '/loan/',
    changeOrigin: true
  }
}
