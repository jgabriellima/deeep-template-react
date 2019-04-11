import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route,Router, Redirect, withRouter } from 'react-router';
import { connect, Provider as ReduxProvider } from 'react-redux';
/* eslint-disable */
import ErrorPage from './../pages/error/ErrorPage';
/* eslint-enable */
import LayoutComponent from '../components/Layout';
import AuthLayoutComponent from '../components/AuthLayout';
import LoginComponent from '../pages/login';


const ContextType = {
  insertCss: PropTypes.func.isRequired,
  fetch: PropTypes.func.isRequired,
  ...ReduxProvider.childContextTypes,
};

const PrivateRoute = ({ component, isAuthenticated, ...rest }) => ( // eslint-disable-line
  <Route
    {...rest} render={props => (
    isAuthenticated ? (
      React.createElement(component, props)
    ) : (
      <Redirect
        to={{
          pathname: '/auth/login',
          state: { from: props.location }, // eslint-disable-line
        }}
      />
    )
  )}
  />
);

class App extends React.PureComponent {

  static propTypes = {
    context: PropTypes.shape(ContextType),
    store: PropTypes.any,
    isAuthenticated: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    context: null,
  };


  static contextTypes = {
    router: PropTypes.any,
    store: PropTypes.any,
  };

  static childContextTypes = ContextType;

  getChildContext() {
    return this.props.context || this.context.router.staticContext;
  }

  isAuthenticated() {
      return this.props.isAuthenticated || localStorage.getItem('deeep.public.token') !== null;
  }

  render() {
    return (
      <Switch>
        <Route path="/" exact render={() => <Redirect to="/app/main" />} />
        <Route path="/app" exact render={() => <Redirect to="/app/main" />} />
        <Route path="/share/:processId" component={LayoutComponent} />
        <PrivateRoute isAuthenticated={this.isAuthenticated()} path="/app" component={LayoutComponent} />
        <PrivateRoute isAuthenticated={true} path="/auth" component={AuthLayoutComponent} />
        <Route component={ErrorPage} />
      </Switch>
    );
  }
}

function mapStateToProps(store) {
  return {
    isAuthenticated: store.auth.isAuthenticated,
    user: store.auth.user
  };
}

export default withRouter(connect(mapStateToProps)(App));
