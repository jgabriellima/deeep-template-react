import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Alert } from 'reactstrap';
import Widget from '../../components/Widget';
import s from './Login.module.scss';
import { loginUser } from '../../actions/user';
import logoIco from './../../assets/logo-ico.png';

class Login extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      login: '',
      password: '',
    };

    this.doLogin = this.doLogin.bind(this);
    this.changeLogin = this.changeLogin.bind(this);
    this.changePassword = this.changePassword.bind(this);
  }

  changeLogin(event) {
    this.setState({ login: event.target.value });
  }

  changePassword(event) {
    this.setState({ password: event.target.value });
  }

  doLogin(e) {
    this.props.dispatch(loginUser({ login: this.state.login, password: this.state.password }));
    e.preventDefault();
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/app' } }; // eslint-disable-line
    if (this.props.isAuthenticated) {
      return (
        <Redirect to={from} />
      );
    }
    return (
        <Widget className={`${s.widget} mx-auto ${s.removeShadow}`} title={''}>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <img src={logoIco} width={50}/>
            </div>
            <h4 className="mt-0">Welcome to the Deeep Digital</h4>
            <div style={{height: 10}}/>
            <p className={s.widgetLoginInfo}>
                Coloque seu e-mail e senha cadastrados, caso ainda não tenha, faça seu registro. {this.props.errorMessage}
            </p>
            <div style={{height: 10}}/>
            <form className="mt" onSubmit={this.doLogin}>

                {
                    !!this.props.errorMessage.length && ( // eslint-disable-line
                        <Alert className="alert-sm">
                            {this.props.errorMessage}
                        </Alert>
                    )
                }
                <div className="form-group">
                    <input className="form-control no-border" value={this.state.login} onChange={this.changeLogin} type="text" required name="username" placeholder="Username" />
                </div>
                <div className="form-group">
                    <input className="form-control no-border" value={this.state.password} onChange={this.changePassword} type="password" required name="password" placeholder="Password" />
                </div>
                <div className="clearfix">
                    <div className="btn-toolbar float-right">
                        {/*<button type="reset" className="btn btn-secondary btn-sm">Create an Account</button>*/}
                        <button type="submit" href="/app" className="btn btn-inverse btn-sm">{this.props.isFetching ? 'Loading...' : 'Login'}</button>
                    </div>
                </div>
                <div className="row no-gutters mt-4">
                    <div className="col" style={{fontSize: 12, textAlign: 'center'  }}>
                        New to us?  <a className="mt-sm" href='register'>Create your new account here!</a>
                    </div>
                </div>
            </form>
        </Widget>
    );
  }
}

function mapStateToProps(state) {
  return {
    isFetching: state.auth.isFetching,
    isAuthenticated: state.auth.isAuthenticated,
    errorMessage: state.auth.errorMessage,
    user: state.auth.user
  };
}

export default withRouter(connect(mapStateToProps)(withStyles(s)(Login)));

