import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Layout, Menu } from 'antd';
const { Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;
import SideBar from './SideBar';
import RCHeader from './Header';
import { withRouter } from 'react-router-dom';
import config from '../../../config';
import './index.less';

class MainLayout extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
    children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired
  };
  state = {
    collapsed: false,
    error: null,
    errorInfo: null
  };
  onCollapse = (collapsed) => {
    this.setState({ collapsed });
  }
  componentDidMount() {
  }
  // componentDidCatch(error, errorInfo) {
  //   // Catch errors in any components below and re-render with error message
  //   this.setState({
  //     error: error,
  //     errorInfo: errorInfo
  //   })
  //   // You can also log error messages to an error reporting service here
  // }
  render() {
    const { location } = this.props;
    const logoFromLocal = config.imagesFromLocal;
    const logo = config.logo;
    return (
      <Layout className="sider-bar">
        <Sider collapsible
               collapsed={this.state.collapsed}
               onCollapse={this.onCollapse} >
          <div className="logo">
            <img src={logoFromLocal ? require(`assets/images/${logo}`) : logo}/> 
          </div>
          <SideBar location={location}/>
        </Sider>
        <Layout style={{background:'#f3f5f6'}}>
          <RCHeader location={location}/>
          <Content style={{ margin: '16px 16px' }}>
            <div style={{ minHeight: 360 }} key={location && location.search}>
              {this.props.children}
            </div>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default withRouter(connect((state) => ({auth: state.auth}), {
  
})(MainLayout));
