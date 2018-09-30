import React from 'react';
import Loadable from 'react-loadable';
import AsyncBlock from '../Async/AsyncBlock';

const Loading = ({ error, pastDelay }) => {
  if (error) {
  	console.log('error: ', error)
    return <div>error</div>;
  } else if (pastDelay) {
    return <AsyncBlock outerSpinner="block" loading={true} loadingWhenNull>
      <div />
    </AsyncBlock>;
  } else {
    return null;
  }
}

export default (pathGetter) => {
	return Loadable({
	  loader: pathGetter,
	  loading: Loading,
	  delay: 300
	})
}
