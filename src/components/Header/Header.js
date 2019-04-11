import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {
    Navbar,
    Nav,
    NavDropdown,
    NavItem,
    NavLink,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    UncontrolledTooltip,
    Form,
    FormGroup,
} from 'reactstrap';
import $ from 'jquery';
import {logoutUser} from '../../actions/user';
import {toggleSidebar, openSidebar, closeSidebar, changeActiveSidebarItem} from '../../actions/navigation';
import a5 from '../../images/people/a5.jpg';
import s from './Header.module.scss';
import pt from './../../assets/flags/brazil.png';
import es from './../../assets/flags/spain.png';
import en from './../../assets/flags/unitedstates.png';
import i18n from './../../i18n';

class Header extends React.Component {
    static propTypes = {
        sidebarOpened: PropTypes.bool.isRequired,
        sidebarStatic: PropTypes.bool.isRequired,
        chatToggle: PropTypes.func.isRequired,
        dispatch: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);

        this.toggleMenu = this.toggleMenu.bind(this);
        this.toggleMenuTranslate = this.toggleMenuTranslate.bind(this);
        this.switchSidebar = this.switchSidebar.bind(this);
        this.toggleSidebar = this.toggleSidebar.bind(this);
        this.doLogout = this.doLogout.bind(this);
        this.changeLang = this.changeLang.bind(this);

        this.state = {
            menuOpen: false,
            menuOpenTranslate: false,
            notificationsOpen: false,
            notificationsTabSelected: 1,
            refreshing: '',
            currentLng: pt
        };
    }

    changeLang(currentLng, lng) {
        this.setState({currentLng});
        i18n.changeLanguage(lng);
    }

    refresh() {
        this.setState({refreshing: 'fa-spin'});
        setTimeout(() => {
            this.setState({refreshing: ''});
        }, 3000);
    }

    componentDidMount() {
        $('#search-input').on('blur focus', (e) => {
            $('#search-input').parents('.input-group')[e.type === 'focus' ? 'addClass' : 'removeClass']('focus');
        });
    }

    doLogout() {
        this.props.dispatch(logoutUser());
        window.location = './login';
        document.location.reload(true);

    }

    // collapse/uncolappse
    switchSidebar() {
        if (this.props.sidebarOpened) {
            this.props.dispatch(closeSidebar());
            this.props.dispatch(changeActiveSidebarItem(null));
        } else {
            const paths = this.props.location.pathname.split('/');
            paths.pop();
            this.props.dispatch(openSidebar());
            this.props.dispatch(changeActiveSidebarItem(paths.join('/')));
        }
    }

    // static/non-static
    toggleSidebar() {
        this.props.dispatch(toggleSidebar());
        if (this.props.sidebarStatic) {
            localStorage.setItem('staticSidebar', 'false');
            this.props.dispatch(changeActiveSidebarItem(null));
        } else {
            localStorage.setItem('staticSidebar', 'true');
            const paths = this.props.location.pathname.split('/');
            paths.pop();
            this.props.dispatch(changeActiveSidebarItem(paths.join('/')));
        }
    }

    toggleMenu() {
        this.setState({
            menuOpen: !this.state.menuOpen,
        });
    }

    toggleMenuTranslate() {
        this.setState({
            menuOpenTranslate: !this.state.menuOpenTranslate,
        });
    }

    render() {
        const user = JSON.parse(window.localStorage.getItem('deeep.user'));
        if (user) {
            return (
                <Navbar color={'white'} className={`${s.root} d-print-none`}>
                    <Nav>
                        <NavItem>
                            <NavLink className="d-md-down-none ml-3" style={{backgroundColor: '#DC004D!important'}}
                                     href="#"
                                     id="toggleSidebar" onClick={this.toggleSidebar}>
                                <i className={'fa fa-bars fa-lg'}/>
                            </NavLink>
                            <UncontrolledTooltip placement="bottom" target="toggleSidebar">
                                Turn on/off<br/>sidebar<br/>collapsing
                            </UncontrolledTooltip>
                            <NavLink className="fs-lg d-lg-none" href="#" onClick={this.switchSidebar}>
                            <span className="rounded rounded-lg bg-gray text-white d-md-none"
                                  style={{backgroundColor: '#DC004D!important'}}><i
                                className="fa fa-bars fa-lg"/></span>
                                <i className="fa fa-bars fa-lg d-sm-down-none"/>
                            </NavLink>
                        </NavItem>
                        <NavItem className="d-md-down-none ml-3">
                            <NavLink href="#" className="px-2" onClick={() => this.refresh()}>
                                <i className={`fa fa-refresh fa-lg ${this.state.refreshing}`}/>
                            </NavLink>
                        </NavItem>
                    </Nav>

                    <Form className="d-sm-down-none ml-5" inline>
                        <FormGroup>
                        </FormGroup>
                    </Form>

                    <NavLink className={`${s.navbarBrand} d-md-none`}>
                        Deeep Digital Mkt
                    </NavLink>

                    <Nav className={`ml-auto ${s.mlcustom}`}>
                        <NavDropdown isOpen={this.state.menuOpenTranslate} toggle={this.toggleMenuTranslate}
                                     className="d-sm-down-none">
                            <DropdownToggle nav>
                                <img src={this.state.currentLng} width={20}/>
                            </DropdownToggle>
                            <DropdownMenu right className="super-colors">
                                <DropdownItem onClick={() => this.changeLang(pt, 'pt')}><img src={pt}
                                                                                             width={20}/> Português</DropdownItem>
                                <DropdownItem onClick={() => this.changeLang(es, 'es')}><img src={es}
                                                                                             width={20}/> Español</DropdownItem>
                                <DropdownItem onClick={() => this.changeLang(en, 'en')}><img src={en}
                                                                                             width={20}/> English</DropdownItem>
                            </DropdownMenu>
                        </NavDropdown>
                        <NavDropdown isOpen={this.state.notificationsOpen} toggle={this.toggleNotifications}
                                     id="basic-nav-dropdown" className={`${s.notificationsMenu} d-sm-down-none`}>
                            <DropdownToggle nav>
                              <span className={`${s.avatar} thumb-sm float-left mr-2`}>
                                <img className="rounded-circle" src={a5} alt="..."/>
                              </span>
                                <span className="small">{user.firstName} ({user.emailAddress})</span>
                            </DropdownToggle>
                            <DropdownMenu right
                                          className={`${s.notificationsWrapper} pb-0 animated animated-fast fadeInUp`}>
                            </DropdownMenu>
                        </NavDropdown>
                        <NavDropdown isOpen={this.state.menuOpen} toggle={this.toggleMenu} className="d-sm-down-none">
                            <DropdownToggle nav>
                                <i className="fa fa-cog fa-lg"/>
                            </DropdownToggle>
                            <DropdownMenu right className="super-colors">
                                <DropdownItem><a href="/app/profile/settings" style={{textDecoration: 'none'}}><i
                                    className="glyphicon glyphicon-user"/> My Profile</a></DropdownItem>
                                <DropdownItem divider/>
                                <DropdownItem onClick={this.doLogout}><i className="fa fa-sign-out"/> Log
                                    Out</DropdownItem>
                            </DropdownMenu>
                        </NavDropdown>
                    </Nav>
                    <Nav>

                        <NavItem className="fs-lg d-lg-none">
                            <NavLink href="#" className="px-2" onClick={() => this.refresh()}>
                                <i className={`fa fa-refresh fa-lg ${this.state.refreshing}`}/>
                            </NavLink>
                        </NavItem>
                    </Nav>
                </Navbar>
            );
        }
        return null;

    }
}

function mapStateToProps(store) {
    return {
        sidebarOpened: store.navigation.sidebarOpened,
        sidebarStatic: store.navigation.sidebarStatic,
        user: store.auth.user,
    };
}

export default withRouter(connect(mapStateToProps)(withStyles(s)(Header)));

