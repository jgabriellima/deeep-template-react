import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {Switch, Route, withRouter, Redirect} from 'react-router';
import {Container} from 'reactstrap';
import s from './AuthLayout.module.scss';
import {Row, Col} from 'reactstrap';
import {LazyLoadImage} from 'react-lazy-load-image-component';
import logo from './../../assets/logo.png';
import bg1 from './../../assets/login-bg/1.jpg';
import bg2 from './../../assets/login-bg/2.jpg';

import Login from './../../pages/login/Login';
import Register from './../../pages/register/Register';
import Slider from './../../components/Slider/Slider';

import img1 from './../../assets/processes/1.png';
import img2 from './../../assets/processes/2.png';
import img3 from './../../assets/processes/3.png';
import img4 from './../../assets/processes/4.png';
import img5 from './../../assets/processes/5.png';

class AuthLayout extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={s.root}>
                <Row className={s.rowResponsive} style={{height: '100%', padding:0, margin:0, backgroundColor: 'white'}}>
                    <Col xs="12" sm="8" md="8" className={s.columnOne} style={{padding: 0}}>
                        <LazyLoadImage
                            alt={''}
                            effect="blur"
                            height={'100%'}
                            src={Math.random() > .5 ? bg1 : bg2}
                            width={'100%'}/>
                        <div className={s.columnOneContent}>
                            <LazyLoadImage
                                alt={''}
                                effect="blur"
                                width={200}
                                src={logo}/>
                            <div className={s.divider}/>
                            <h1 className={s.mainTitle}>Transforming your Marketing Digital Business with Artificial
                                Intelligence</h1>
                            <h1 className={s.mainText}>...</h1>
                        </div>
                        <footer style={{display: 'none'}} className={`${s.footer} footerResponsive`}>
                            Deeep Box - Powered by <a href="http://deeep.marketing"
                                                                        rel="nofollow noopener noreferrer"
                                                                        target="_blank">Deeep Marketing</a>
                        </footer>
                    </Col>
                    <Col xs="12" sm="4" md="4" className={s.columnTwo} style={{
                        display: 'flex',
                        justifyItems: 'center',
                        alignItems: 'center', flexDirection: 'column', justifyContent: 'center'
                    }}>
                        <Container>
                            <main className={s.content}>
                                <Switch>
                                    <Route path="/auth" exact render={() => <Redirect to="/auth/login"/>}/>
                                    <Route path="/auth/login" exact component={Login}/>
                                    <Route path="/auth/register" exact component={Register}/>
                                </Switch>
                            </main>
                        </Container>
                        <footer className={s.footer}>
                            Powered by <a href="http://deeep.marketing" rel="nofollow noopener noreferrer"
                                          style={{color: 'black'}} target="_blank">Deeep Marketing</a>
                        </footer>
                    </Col>
                </Row>
            </div>
        );
    }
}


export default withRouter(withStyles(s)(AuthLayout));
