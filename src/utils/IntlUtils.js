import config from '../../config';
import en_US from 'locales/en_US';
import zh_CN from 'locales/zh_CN';

export default class IntlUtils {
  constructor() {
  	window.getCurrentIntl = this.getCurrentIntl
  }

  getCurrentIntl = (key) => {
  	if (localStorage.getItem('languageType')) {
  		if (localStorage.getItem('languageType') === 'zhCN') {
	    	return zh_CN[key];
	    } else {
	    	return en_US[key];
	    }
  	} else {
  		if (config.languageType === 'zhCN') {
	    	return zh_CN[key];
	    } else {
	    	return en_US[key];
	    }
  	}
  }
}
