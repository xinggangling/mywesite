import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;
import { getCurrentBreadcrumb } from 'utils/commonUtils';
import { replace } from 'utils/historyUtil';
import { routes } from 'routes';

class SideBar extends Component {
  static propTypes = {
    setBreadcrumb: PropTypes.func
  }
  constructor(props) {
    super(props);
    this.state = {
      selectedKeys: [],
      openKeys: []
    }
  }
  static getDerivedStateFromProps(props, state) {
    const tabArray = getCurrentBreadcrumb(routes, props.location.pathname);
    if (!state.selectedKeys.length) {
      return {
        selectedKeys: tabArray.map(i => i.key),
        openKeys: tabArray.map(i => i.key)
      }
    } else {
      return null;
    }
  }
  componentDidMount() {

  }
  selectKeys = ({ item, key, selectedKeys }) => {
    this.setState({
      selectedKeys
    })
  }
  openMenuItem = (openKeys) => {
    this.setState({
      openKeys
    })
  }
  onMenuItemClick = (route) => {
    replace(route, '?rt=' + Date.now())
  }
  createMenu = (menu) => {
    return menu.reduce((pre, item, index) => {
      if (item.routes) {
        return [
          ...pre,
          <SubMenu key={item.key}
            className={item.depth == 1 ? "sub" : ""}
            title={
              item.icontype ?
              <div style={{display: 'flex'}}>
                <i className={`icon iconfont icon-${item.icontype}`} />
                <span>
                  {item.title}
                </span>
              </div>
              :
              item.title
            }>
            {this.createMenu(item.routes)}
          </SubMenu>
        ]
      } else {
        return [
          ...pre,
          <Menu.Item key={item.key} className={item.depth == 2 ? "subitem" : ""}>
            <div onClick={this.onMenuItemClick.bind(null, (item.route ? item.route : '/'))}>
              {
                item.icontype ?
                <div style={{display: 'flex'}}>
                  <i className={`icon iconfont icon-${item.icontype}`} />
                  <span>
                    {item.title}
                  </span>
                </div>
                :
                item.title
              }
            </div>
          </Menu.Item>
        ]
      }
    }, [])
  }
  render() {
    return (
      <Menu theme="dark"
            selectedKeys={this.state.selectedKeys}
            openKeys={this.state.openKeys}
            mode="inline"
            onOpenChange={this.openMenuItem}
            onSelect={this.selectKeys}>
        {this.createMenu(routes)}
      </Menu>
    )
  }
}

export default connect((state) => {
  const user = state.auth.user;
  const roles = user && user.roles && user.roles.map(role => role.fname) || [];
  const permissions = user && user.permissions || [];
  return {
    roles,
    permissions
  };
})(SideBar);
