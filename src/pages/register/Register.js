import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {withRouter, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {Alert, FormGroup, Label, Input} from 'reactstrap';
import Widget from '../../components/Widget';
import s from './Register.module.scss';
import logoIco from './../../assets/logo-ico.png';
import IntlTelInput from 'react-intl-tel-input';
import 'react-intl-tel-input/dist/main.css';
import Whatsapp from './../../components/Whatsapp';

const loadJSONP = (url, callback) => {
    const ref = window.document.getElementsByTagName('script')[0];
    const script = window.document.createElement('script');
    script.src = `${url + (url.indexOf('?') + 1 ? '&' : '?')}callback=${callback}`;
    ref.parentNode.insertBefore(script, ref);
    script.onload = () => {
        script.remove();
    };
};

const lookup = (callback) => {
    loadJSONP('http://ipinfo.io', 'sendBack');
    window.sendBack = (resp) => {
        const countryCode = (resp && resp.country) ? resp.country : '';
        callback(countryCode);
    }
};

class Register extends React.Component {
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);

        this.state = {
            login: '',
            password: '',
            company: '',
            position: '',
            errors: {
                title: '',
                list: []
            }
        };

        this.doLogin = this.doLogin.bind(this);
        this.changeLogin = this.changeLogin.bind(this);
        this.changePassword = this.changePassword.bind(this);
    }

    changeLogin(event) {
        this.setState({login: event.target.value});
    }

    changePassword(event) {
        this.setState({password: event.target.value});
    }

    doLogin(e) {
        console.log({login: this.state.login, password: this.state.password});
        e.preventDefault();
    }

    onSubmit = (evt) => {
        this.setState({
            errors: {
                title: '',
                list: []
            }
        });
        const {name, email, company, position, phoneNumber, password, check} = evt.target;

        evt.preventDefault();
    };

    render() {
        const {registerCreated} = this.props;
        return (
            <Widget className={`${s.widget} mx-auto ${s.removeShadow}`} title={''}>
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <img src={logoIco} width={50}/>
                </div>
                <h3 className="mt-0">New Deeep Account</h3>
                {registerCreated ?
                    <div style={{border: '1px solid gainsboro', padding: 10, textAlign: 'center', marginTop: 40}}>
                        <h5>Seu registro foi criado com sucesso!</h5>
                        <hr/>
                        <p style={{fontWeight: 'bold'}}>Estamos quase lá!</p>
                        <p>Nossos administradores irão aprovar seu cadastro e dentro de alguns instantes você receberá
                            um e-mail com as instruções de acesso!</p>
                        <p>Se precisar, fale conosco: <a
                            href="mailto:atendimento@deeep.marketing?subject=Novo Registro&body=Olá deeepers, preciso de ajuda">atendimento@deeep.marketing</a>
                        </p>
                        <p><Whatsapp/></p>
                    </div>
                    :
                    [<p key='f0' className={s.widgetLoginInfo}>
                        Preencha abaixo algumas informações importantes
                    </p>,
                        <form key='f1' className="mt" onSubmit={this.onSubmit}>
                            {
                                !!this.props.errorMessage.length && (
                                    <Alert className="alert-sm" bsStyle="danger">
                                        {this.props.errorMessage.map(e => <div>{e.message}</div>)}
                                    </Alert>
                                )
                            }
                            <div className="form-group">
                                <input className="form-control" type="text" required name="name"
                                       placeholder="Your name"/>
                            </div>
                            <div className="form-group">
                                <input className="form-control" type="text" required name="email"
                                       placeholder="Your e-mail"/>
                            </div>
                            <div className="form-group">
                                <input className="form-control" type="text" required name="company"
                                       placeholder="Company were you work"/>
                            </div>
                            <FormGroup>
                                <Input type="select" placeholder="oo" name="position" id="position">
                                    <option>What's your position?</option>
                                    <option>Owner</option>
                                    <option>Director</option>
                                    <option>Developer</option>
                                    <option>Marketing Analyst</option>
                                    <option>Product Owner</option>
                                    <option>Other</option>
                                </Input>
                            </FormGroup>
                            <div className="form-group">
                                <IntlTelInput
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    defaultCountry="auto"
                                    geoIpLookup={lookup}
                                    css={['intl-tel-input', 'form-control', 'width100']}
                                />
                            </div>
                            <div className="form-group">
                                <input className="form-control" type="password" required name="password"
                                       placeholder="Password"/>
                            </div>
                            <label style={{fontSize: 12}}>
                                <input type='checkbox' name='check' label='I agree to the Terms and Conditions'
                                       style={{marginRight: 10}}/>
                                I agree to the Terms and Conditions
                            </label>
                            {
                                !!this.state.errors.list.length && (
                                    <Alert className="alert-danger" bsStyle="danger">
                                        {this.state.errors.list.map(e => <div>{e}</div>)}
                                    </Alert>
                                )
                            }
                            <div className="clearfix">
                                <div className="btn-toolbar float-right">
                                    <button type="submit" href="/app"
                                            className="btn btn-inverse btn-sm">{this.props.isFetching ? 'Loading...' : "Let's go!"}</button>
                                </div>
                            </div>
                            <div className="row no-gutters mt-4">
                                <div className="col">
                                    Already account? <a className="mt-sm" href='login'>Log in here!</a>
                                </div>
                            </div>
                        </form>]}
            </Widget>
        );
    }
}

function mapStateToProps(state) {
    return {
        isFetching: state.auth.isFetching,
        isAuthenticated: state.auth.isAuthenticated,
        errorMessage: state.auth.errorMessage,
        registerCreated: state.auth.registerCreated
    };
}

export default withRouter(connect(mapStateToProps)(withStyles(s)(Register)));

