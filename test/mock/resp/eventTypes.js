export default {
  'eventTypes': [{
    'feventType': 'login_notify',
    'fisNotify': 1,
    'fname': '登陆通知',
    'fmemo': '每次登陆验证后通知，成功失败都通知',
    'fcreateBy': 'jessie_test',
    'fcreateTime': '2016-06-01T03:23:28.000Z'
  }, {
    'feventType': 'order_notify',
    'fisNotify': 1,
    'fname': '下单后通知',
    'fmemo': '下单以后，尚未走到支付前，用于提前获取一些信息',
    'fcreateBy': 'jessie_test',
    'fcreateTime': '2016-06-01T11:29:00.000Z'
  }, {
    'feventType': 'pay_notify',
    'fisNotify': 1,
    'fname': '支付后通知',
    'fmemo': '支付成功后通知',
    'fcreateBy': 'jessie_test',
    'fcreateTime': '2016-06-01T11:30:35.000Z'
  }, {
    'feventType': 'pay_verify',
    'fisNotify': 0,
    'fname': '支付前验证',
    'fmemo': '支付前风控校验',
    'fcreateBy': 'jessie_test',
    'fcreateTime': '2016-06-01T11:29:54.000Z'
  }, {
    'feventType': 'register_notify',
    'fisNotify': 1,
    'fname': '注册后通知',
    'fmemo': '注册成功后通知',
    'fcreateBy': 'jessie_test',
    'fcreateTime': '2016-06-01T11:28:04.000Z'
  }]
};
