export default {
  'baseVar': {
    'fobjectType': [{
      'v': 'ACCOUNT',
      'm': '账户'
    }, {
      'v': 'BANKID',
      'm': '银行卡'
    }, {
      'v': 'DEVICE',
      'm': '设备'
    }, {
      'v': 'IDCARD',
      'm': '自然人'
    }, {
      'v': 'TRANS',
      'm': '交易'
    }]
  },
  'blackInfo': {
    'fblackType': [{
      'v': 'ACCOUNT',
      'm': '账号'
    }, {
      'v': 'BANKID',
      'm': '银行卡号'
    }, {
      'v': 'DEVICE_ID',
      'm': '设备ID'
    }, {
      'v': 'IDCARD',
      'm': '身份证号'
    }, {
      'v': 'OPENID',
      'm': '微信OpenID'
    }, {
      'v': 'PHONE',
      'm': '通讯号码'
    }, {
      'v': 'QQ',
      'm': 'QQ号码'
    }]
  },
  'cloudOperation': {
    'ffunctionType': [{
      'v': 'BANKID_BIND_VERIFY',
      'm': '银行卡2,3,4要素验证'
    }, {
      'v': 'IDCARD_NAME_VERIFY',
      'm': '身份证-姓名验证'
    }, {
      'v': 'MERCHANT',
      'm': '商户号列表'
    }, {
      'v': 'SEND_SMS',
      'm': '发短信'
    }, {
      'v': 'STORE_ONE_CENT',
      'm': '打一分钱'
    }],
    'fstate': [{
      'v': 'COMMITED',
      'm': '已提交'
    }, {
      'v': 'READY',
      'm': '待提交'
    }, {
      'v': 'RETURNED',
      'm': '已返回'
    }]
  },
  'deal': {
    'fdealAction': [{
      'v': 'FREEZE_BALANCE',
      'm': '余额止付'
    }, {
      'v': 'LOCK_ACCOUNT',
      'm': '冻结账号'
    }],
    'fdealType': [{
      'v': 'ADD_BLACK',
      'm': '添加黑信息'
    }, {
      'v': 'RISK_REVIEW',
      'm': '风险确认'
    }]
  },
  'eventField': {
    'fformat': [{
      'v': 'ADDRESS',
      'm': '地址'
    }, {
      'v': 'AMOUNT',
      'm': '金额'
    }, {
      'v': 'BANKID',
      'm': '银行卡号'
    }, {
      'v': 'CURRENCY',
      'm': '币种'
    }, {
      'v': 'DATE',
      'm': '日期'
    }, {
      'v': 'DEVICE_GROUP',
      'm': '设备组ID'
    }, {
      'v': 'DEVICE_ID',
      'm': '设备ID'
    }, {
      'v': 'EVENT_ID',
      'm': '事件ID'
    }, {
      'v': 'IDCARD',
      'm': '证件号码'
    }, {
      'v': 'IP',
      'm': 'IP地址'
    }, {
      'v': 'LOCATION',
      'm': '地理位置(国家,省,市)'
    }, {
      'v': 'NAME',
      'm': '姓名'
    }, {
      'v': 'OPENID',
      'm': '微信openid'
    }, {
      'v': 'ORGANIZATION',
      'm': '工作单位'
    }, {
      'v': 'OTHER_BOOL',
      'm': '其他布尔值'
    }, {
      'v': 'OTHER_FLOAT',
      'm': '其他小数'
    }, {
      'v': 'OTHER_INT',
      'm': '其他整数'
    }, {
      'v': 'OTHER_STRING',
      'm': '其也字符串'
    }, {
      'v': 'PHONE',
      'm': '通讯号码'
    }, {
      'v': 'TIME',
      'm': '时间'
    }, {
      'v': 'TRANSID',
      'm': '交易单'
    }]
  },
  'operation': {
    'ftype': [{
      'v': 'ACTION',
      'm': '页面上的一项操作'
    }, {
      'v': 'PAGE',
      'm': '一个页面'
    }]
  },
  'rule': {
    'fdevState': [{
      'v': 'DEVELOP',
      'm': '开发中'
    }, {
      'v': 'READY',
      'm': '待开发'
    }, {
      'v': 'RELEASE',
      'm': '已上线'
    }, {
      'v': 'TEST',
      'm': '测试中'
    }],
    'friskType': [{
      'v': 'AGENCY',
      'm': '机构代办'
    }, {
      'v': 'BLACK',
      'm': '坏人欺诈'
    }, {
      'v': 'LIMIT',
      'm': '一般业务限制'
    }, {
      'v': 'REPUDIATE',
      'm': '失信借款'
    }, {
      'v': 'SCALPER',
      'm': '黄牛党'
    }, {
      'v': 'SPAM',
      'm': '垃圾注册'
    }, {
      'v': 'WOOL_PARTY',
      'm': '羊毛党'
    }]
  },
  'vectorConfig': {
    'ftype': [{
      'v': ' "GOODS_WORD“',
      'm': '商品关键词列表'
    }, {
      'v': 'LOCATION',
      'm': '地区列表'
    }, {
      'v': 'MERCHANT',
      'm': '商户号列表'
    }]
  }
};
