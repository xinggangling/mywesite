import React, { Component } from 'react';
import PropTypes from 'prop-types';
require('./index.less');

export default class LandingLayout extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired
  };
  render() {
    return (
      <div className="layout landing">
        <div className="app-body">
          {this.props.children}
        </div>
      </div>
    );
  }
}
