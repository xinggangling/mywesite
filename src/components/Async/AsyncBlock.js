import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Spin } from 'antd';
import './index.less';

class AsyncBlock extends Component {
  static propTypes = {
    // rqstToken: PropTypes.number,
    children: PropTypes.element,
    outerSpinner: PropTypes.oneOf(['inline', 'block']),
    size: PropTypes.oneOf(['small', 'default', 'large']),
    loading: PropTypes.bool.isRequired,
    loadingWhenNull: PropTypes.bool.isRequired // Indicate whether mark loading=ture while token is null
  }
  static defaultProps = {
    loadingWhenNull: false
  }
  render() {
    const oriElement = this.props.children ? React.Children.only(this.props.children) : <div/>;
    const { outerSpinner, size, loading } = this.props;
    const oriClassname = oriElement.props.className ? oriElement.props.className + ' ' : '';
    let resultElement = oriElement;

    if (loading) {
      if (!outerSpinner) {
        const iconSize = size || 'default';
        const spinningElement = React.cloneElement(oriElement, {
          className: oriClassname + 'spinning inner ' + iconSize,
          disabled: true,
          icon: <Spin size={iconSize}/>,
          label: null
        });
        resultElement = spinningElement;
      } else {
        const iconSize = size || 'default';
        resultElement = (<div className={ 'spinning ' + outerSpinner + ' ' + iconSize}>
                            <Spin size={iconSize}/>
                         </div>);
      }
    }
    return resultElement;
  }
}

export default connect((state, ownProps) => {
  const request = state.request.requests[ownProps.rqstToken];
  const loading = !!(ownProps.loadingWhenNull && !ownProps.rqstToken || request && request.status === 'RQST_START');
  return {
    loading
  };
})(AsyncBlock);
