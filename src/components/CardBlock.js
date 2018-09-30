import React, { Component} from 'react';
import PropTypes from 'prop-types';
export default class CardBlock extends Component {
  static propTypes = {
    highlight: PropTypes.bool.isRequired,
    className: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
    title: PropTypes.string
  }
  static defaultProps = {
    highlight: false
  }
  state = {
  }
  renderTitle = (title) => {
    return title
            ?
              <div className="card-block-header">
                {title}
              </div>
            :
              null;
  }
  render() {
    const { highlight, children, className, title, ...others } = this.props;
    const updatedClsName = className ? className + ' card-block' : 'card-block';
    return <div className={updatedClsName} {...others}>
            {this.renderTitle(title)}
            <div className="card-block-body">
              { children }
            </div>
          </div>
  }
}
