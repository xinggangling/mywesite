import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AsyncBlock from 'components/Async/AsyncBlock';
import ContentBlock from 'components/ContentBlock';
import { push } from 'utils/historyUtil';
import { getProfile } from 'reduxx/modules/auth';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rqstToken: null
    }
  }
  componentDidMount() {
    const { actionPromise, rqstToken } = this.props.getProfile();
    actionPromise.then(resp => {
      this.setState({
        rqstToken
      })
    })
  }
  render() {
    const { rqstToken } = this.state;
    const { user } = this.props;
    return (
      <ContentBlock>
				<AsyncBlock outerSpinner="block" rqstToken={rqstToken} loadingWhenNull>
					<div>
						<div>
							姓名：{user.username}
						</div>
						<br />
						<div>
							邮箱：{user.email}
						</div>
					</div>
				</AsyncBlock>
			</ContentBlock>
    )
  }
}

export default connect(state => {
  return {
    user: state.auth.user || {},
  }
}, {
  getProfile
})(Profile)