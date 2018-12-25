import React, { Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ContentBlock from 'components/ContentBlock';
import AsyncBlock from 'components/Async/AsyncBlock';
import { getNoteList } from 'reduxx/modules/dailyMiniNote';
import { push } from 'utils/historyUtil';
import { Button } from 'antd';

class NoteList extends Component {
	constructor(props) {
    super(props);
    this.state = {
      rqstToken: null
    }
  }
  componentDidMount() {
    const { actionPromise, rqstToken } = this.props.getNoteList();
    actionPromise.then(resp => {
      this.setState({
        rqstToken
      }, () => {
				this.ue = UE.getEditor('container', {
					autoHeight: false,
					autoHeightEnabled: true,
					autoFloatEnabled: true,
					isShow: true
				});
				this.ue.ready(() => {
					// document.getElementById('container').innerHTML = '<p>111</p><p><br/></p><p><span style="color: #9BBB59;">31 ilvae </span><br/></p>'
				});
			})
    })
	}
	getContent = () => {
		const value = this.ue.getContent();
		console.log('value: ', value)
	}
	render() {
		return (
			<ContentBlock>
				<AsyncBlock outerSpinner="block" rqstToken={this.state.rqstToken} loadingWhenNull>
					<div>
						<div id="container" style={{position: 'relative'}}>

						</div>
						<Button onClick={this.getContent}>获取内容</Button>
					</div>
				</AsyncBlock>
			</ContentBlock>
		)
	}
}

export default connect(state => {
	return {
		noteList: state.dailyMiniNote.list || []
	}
}, {
	getNoteList
})(NoteList)
