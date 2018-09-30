import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ContentBlock extends Component {
  static propTypes = {
    highlight: PropTypes.bool.isRequired,
    className: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
    title: PropTypes.string
  }
  static defaultProps = {
    highlight: false
  }
  renderTitle = (title) => {
    return title
            ?
              <div className="content-block-header">
                {title}
              </div>
            :
              null;
  }
  render() {
    const { highlight, children, className, title, ...others } = this.props;
    const updatedClsName = className ? className + ' content-block' : 'content-block';
    return highlight
            ?
              <div className={updatedClsName} style={{ fontFamily: null }}>
                {this.renderTitle(title)}
                <div className="content-block-body" onFocus={this.onFocus} onBlur={this.onBlur} >
                  { children }
                </div>
              </div>
            :
              <div className={updatedClsName} {...others}>
                {this.renderTitle(title)}
                <div className="content-block-body">
                  { children }
                </div>
              </div>;
  }
}
