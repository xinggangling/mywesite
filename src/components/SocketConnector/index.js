/* global io */
import { Component } from 'react';
import PropTypes from 'prop-types';
import logUtil from 'utils/logUtil';
import { getAPIHostPrefix } from 'utils/commonUtils';

const API_SERVER = getAPIHostPrefix();

export default class SocketConnector extends Component {
    static propTypes = {
        jwt: PropTypes.string.isRequired
    }
    componentDidMount() {
        /* To avoid didMount executed before io js is loaded*/
        setTimeout(() => this.connect(), 500);
    }
    componentWillUnmount() {
        if (this._socket) {
            this._socket.disconnect();
        }
    }
    connect() {
        this._socket = io(API_SERVER, {
            query: 'jwt=' + this.props.jwt,
            transports: ['websocket'],
            path: '/api/websocket'
        });
        this._socket.connect(); // without this, can't reconnect after disconnect is call, e.g. after logout

        this._socket.io.on('connect_error', (err) => {
            logUtil.info('##Socket Manager Connect Error## ', err);
        });

        this._socket.on('connect', () => {
      logUtil.info('##Socket Connected## ');
        });
        this._socket.on('disconnect', (resp) => {
            logUtil.info('##Socket Disconnected## ', resp);
        });

        this._socket.on('reconnect', (resp) => {
            logUtil.info('##Socket Reconnect## ', resp);
        });
        this._socket.on('error', (err) => {
            logUtil.info('##Socket Connect Error## ', err);
        });
    }

    render() {
        return null;
    }
}
