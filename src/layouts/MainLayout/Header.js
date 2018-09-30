import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Breadcrumb, Layout } from 'antd';
const { Header } = Layout;
import { replace } from 'utils/historyUtil';
import { getCurrentBreadcrumb } from 'utils/commonUtils';
import { routes } from 'routes';

class RCHeader extends Component {
  static propTypes = {

  };
  constructor(props, context, updater) {
    super(props);
    this.state = {
      breadcrumb: []
    }
  }
  static getDerivedStateFromProps(props, state) {
    const tabArray = getCurrentBreadcrumb(routes, props.location.pathname);
    return {
      breadcrumb: tabArray
    }
  }
  
  render() {
    const { breadcrumb } = this.state;
    return <div>
      <Header style={{ background: '#fff', padding: 20, display: 'flex', justifyContent: 'space-between', boxShadow: '0px 1px 2px 1px #ccc' }}>
        <Breadcrumb>
          {
            breadcrumb.map((item, index) => <Breadcrumb.Item key={index}>{item.title || '...'}</Breadcrumb.Item>)
          }
        </Breadcrumb>
      </Header>
		</div>
  }
}

export default connect(state => state.auth, {})(RCHeader);