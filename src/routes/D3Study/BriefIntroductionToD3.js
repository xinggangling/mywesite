import React, { Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AsyncBlock from 'components/Async/AsyncBlock';
import { push } from 'utils/historyUtil';

class BriefIntroductionToD3 extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div>BriefIntroductionToD3</div>
		)
	}
}

export default connect(state => {
	return {
		
	}
}, {
	
})(BriefIntroductionToD3)
