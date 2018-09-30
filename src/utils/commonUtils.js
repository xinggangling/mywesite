import config from '../../config';

export const getDateMinute = () => {
  const date = new Date();
  const minutes = date.getHours() * 60 + date.getMinutes();
  return minutes;
};

export const getDateString = (date, separator) => {
  // const date = new Date(fullDateStr);
  if (!date) {
    return ''
  }
  const month = _.padStart(date.getMonth() + 1, 2, '0');
  const day = _.padStart(date.getDate(), 2, '0');
  return `${date.getFullYear()}${separator || ''}${month}${separator || ''}${day}`;
};

export const getNewFullDateString = (date, separator, timeSeparator) => {
  const hour = _.padStart(date.getHours(), 2, '0');
  const minute = _.padStart(date.getMinutes(), 2, '0');
  const second = _.padStart(date.getSeconds(), 2, '0');
  return `${getDateString(date, separator)}${' '}${hour}${timeSeparator || ''}${minute}${timeSeparator || ''}${second}`;
};

export const getDateStringFormFullDate = (fullDateStr, separator) => {
  if (!fullDateStr) {
    return ''
  }
  const date = new Date(fullDateStr);
  const month = _.padStart(date.getMonth() + 1, 2, '0');
  const day = _.padStart(date.getDate(), 2, '0');
  return `${date.getFullYear()}${separator || ''}${month}${separator || ''}${day}`;
};

export const getDateStringFormDateStamp = (dateStamp, separator) => {
  if (!dateStamp) {
    return ''
  }
  const date = new Date(dateStamp);
  const month = _.padStart(date.getMonth() + 1, 2, '0');
  const day = _.padStart(date.getDate(), 2, '0');
  return `${date.getFullYear()}${separator || ''}${month}${separator || ''}${day}`;
};

export const getFullDateString = (date, separator) => {
  const hour = _.padStart(date.getHours(), 2, '0');
  const minute = _.padStart(date.getMinutes(), 2, '0');
  const second = _.padStart(date.getSeconds(), 2, '0');
  return `${getDateString(date, separator)}${separator || ''}${hour}${separator || ''}${minute}${separator || ''}${second}`;
};

export const formatDate = (date, timeOnly = false) => {
  if (!date) {
    return '';
  }

  const timeStr = date.toLocaleTimeString('en', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });
  if (timeOnly) {
    return `${timeStr}`;
  } else {
    // Use 'en' can force the format to mm/dd/yyyy
    const dateStr = date.toLocaleDateString('en', {
      month: '2-digit',
      year: 'numeric',
      day: '2-digit'
    });
    const dateParts = dateStr.split('/');
    return `${dateParts[2]}-${dateParts[0]}-${dateParts[1]} ${timeStr}`;
  }
};
export const formatDateSecond = (date, timeOnly = false) => {
  if (!date) {
    return '';
  }

  const timeStr = date.toLocaleTimeString('en', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });
  if (timeOnly) {
    return `${timeStr}`;
  } else {
    // Use 'en' can force the format to mm/dd/yyyy
    const dateStr = date.toLocaleDateString('en', {
      month: '2-digit',
      year: 'numeric',
      day: '2-digit'
    });
    const dateParts = dateStr.split('/');
    return `${dateParts[2]}-${dateParts[0]}-${dateParts[1]} ${timeStr}`;
  }
};
/**
 * Format date from a date str(which can be coverted to js date object)
 * @param  {String}  fullDateStr A date string which can be converted to date object
 * @param  {Boolean} timeOnly    Only keep the time part, i.e. hh:mm
 * @return {String}              yyyy-MM-dd hh:mm
 */
export const formatDateString = (fullDateStr, timeOnly = false) => {
  if (!fullDateStr || typeof fullDateStr !== 'string' && typeof fullDateStr !== 'number') {
    return '';
  }
  const date = new Date(fullDateStr);

  return formatDate(date, timeOnly);
};

/**
 * Format  e: 2018-09-10T09:54:12.000Z
 * @param  {String} 2018-09-10T09:54:12.000Z
 * @param  {String} '-'
 * @param  {String} ':'
 * @return {string} yyyy-MM-dd hh:mm:ss
 */
export const formatTimeString = (fullDateStr, separator, timeSeparator) => {
  if (!fullDateStr || typeof fullDateStr !== 'string' && typeof fullDateStr !== 'number') {
    return '';
  }
  const date = new Date(fullDateStr);

  const hour = _.padStart(date.getHours(), 2, '0');
  const minute = _.padStart(date.getMinutes(), 2, '0');
  const second = _.padStart(date.getSeconds(), 2, '0');
  return `${getDateString(date, separator)}${' '}${hour}${timeSeparator || ''}${minute}${timeSeparator || ''}${second}`;
};

export const formatDateStringSecond = (fullDateStr, timeOnly = false) => {
  if (!fullDateStr || typeof fullDateStr !== 'string' && typeof fullDateStr !== 'number') {
    return '';
  }
  const date = new Date(fullDateStr);

  return formatDateSecond(date, timeOnly);
};

export const formatDateSplice = (date) => {
  const dateStr = formatDateString(date).slice(0, formatDateString(date).indexOf(' ')).replace(/-/g, "");
  return dateStr;
}

export const formatTime = (hr, min, sec) => {
  return `${hr ? _.padStart(hr, 2, '0') : ''}${min ? ':' + _.padStart(min, 2, '0') : ''}${sec ? ':' + _.padStart(sec, 2, '0') : ''}`;
};

export const percentage = (numerator, denominator) => {
  const result = Math.round(numerator * 10000 / denominator) / 100;
  if (!isNaN(result) && isFinite(result)) {
    return result + '%';
  }
  return '';
};

/* Extract time from mongo id string */
export const extractCreateTime = (objectId) => {
  return formatDateString(parseInt(objectId.substring(0, 8), 16) * 1000);
};

export const getAPIHostPrefix = () => {
  const port = (config.apiPort || location.port);
  return `${config.protocol || location.protocol}//${config.apiHost || location.hostname}${port !== 80 && port !== 443 ? ':' + port : ''}`;
};

export const getAPIHostPrefixForDev = () => {
  const port = (config.apiPort || location.port);
  return `${config.protocol}//${config.apiHost || location.hostname}${port !== 80 && port !== 443 ? ':' + port : ''}`;
};

export const safeJSONParse = (str) => {
  if (typeof str === 'string') {
    try {
      return JSON.parse(str);
    } catch (err) {
      return null;
    }
  }
  return null;
};

/**
 * [generateUUID 返回一串序列码]
 * @return {String} [uuid]
 */
export const generateUUID = () => {
  var d = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
  return uuid;
}
export const randomWord = (randomFlag, min, max) => {
  var str = "",
    range = min,
    arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
      'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
      'u', 'v', 'w', 'x', 'y', 'z',
      'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
      'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
      'U', 'V', 'W', 'X', 'Y', 'Z'
    ];
  if (randomFlag) {
    range = Math.round(Math.random() * (max - min)) + min;
  }
  for (var i = 0; i < range; i++) {
    let pos = Math.round(Math.random() * (arr.length - 1));
    str += arr[pos];
  }
  return str;
};

export const getCurrentBreadcrumb = (routes, path) => {
  let tabArray = [];
  const getCurrentTab = (routes, path, levelArray) => {
    routes.map(item => {
      if (item.key === path) {
        tabArray = [...levelArray, item];
      } else {
        if (item.routes && item.routes.length) {
          getCurrentTab(item.routes, path, [...levelArray, item])
        } else {
          // todo
        }
      }
    })
  }
  getCurrentTab(routes, path, []);
  return tabArray;
}
