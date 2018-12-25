import { hot, setConfig } from 'react-hot-loader';
import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
setConfig({ logLevel: 'debug' });
import { browserHistory } from 'utils/historyUtil';
import { routes } from 'routes';
import { LandingLayout, MainLayout } from 'layouts';
import { push } from 'utils/historyUtil';
require('./app.less');

class App extends Component {
  constructor(props) {
    super(props);
  }
  renderChildren = (route) => {
    return (
      <div>
        {route.map((item, index) => <Route key={index} path={item.path} component={item.component}/>)}
      </div>
    )
  }
  createRoutes = (routes) => {
    return routes.reduce((preRoutes, route, i) => {
      if (route.routes && route.routes.length) {
        return [
          ...preRoutes,
          <Route key={i} path={route.path} exact={route.exact} component={this.renderChildren.bind(null, route.routes)} />
        ]
      } else {
        return [
          ...preRoutes,
          <Route key={i} path={route.path} exact={route.exact} render={props => (<route.component {...props} />)} />
        ];
      }
    }, [])
  }
  tomain = () => {
    push('/profile')
  }
  // render() {
  //   return (
  //     <div>0xg && dajuzi</div>
  //   )
  // }
  render() {
    return (
      <Router history={browserHistory}>
        <Switch>
        	<Route exact path="/" component={() => (
            <LandingLayout>
              <div onClick={this.tomain}>0xg & dajuzi1</div>
            </LandingLayout>
          )}/>
          <MainLayout>
           {this.createRoutes(routes)}
          </MainLayout>
        </Switch>
		  </Router>
    )
  }
}

// export default App;
export default hot(module)(App);
