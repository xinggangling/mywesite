//覆盖react-route4版本中的browserhistory.
import createHistory from 'history/createBrowserHistory';

export const browserHistory = createHistory();


export const push = (path, search) => {
	// const unlisten = browserHistory.listen((location, action) => {
	//   // location is an object like window.location
	//   console.log(action, location.pathname, location.state)
	// })
	let pathDealing = '';
	let searchDealing = '';
	if (search) {
		pathDealing = path;
		searchDealing = search;
	} else {
		if (path.indexOf('?') > -1) {
			pathDealing = path.substr(0, path.indexOf('?'));
			searchDealing = path.substr(path.indexOf('?'));
		} else {
			pathDealing = path;
		}
	}
  browserHistory.push({
    pathname: pathDealing,
    search: searchDealing || ''
	});
  // unlisten()
};

export const replace = (path, search) => {
	let pathDealing = '';
	let searchDealing = '';
	if (search) {
		pathDealing = path;
		searchDealing = search;
	} else {
		if (path.indexOf('?') > -1) {
			pathDealing = path.substr(0, path.indexOf('?'));
			searchDealing = path.substr(path.indexOf('?'));
		} else {
			pathDealing = path;
		}
	}
	browserHistory.replace({
    pathname: pathDealing,
    search: searchDealing || ''
	});
}

