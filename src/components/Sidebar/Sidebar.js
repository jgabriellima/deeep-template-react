import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { withRouter, Link } from 'react-router-dom';
import { dismissAlert } from '../../actions/alerts';
import s from './Sidebar.module.scss';
import LinksGroup from './LinksGroup/LinksGroup';

import { openSidebar, closeSidebar, changeActiveSidebarItem } from '../../actions/navigation';
import isScreen from '../../core/screenHelper';
import { logoutUser } from '../../actions/user';
import logoIco from './../../assets/logo-ico.png';

class Sidebar extends React.Component {
  static propTypes = {
    sidebarStatic: PropTypes.bool,
    sidebarOpened: PropTypes.bool,
    dispatch: PropTypes.func.isRequired,
    activeItem: PropTypes.string, //eslint-disable-line
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }).isRequired,
  };

  static defaultProps = {
    sidebarStatic: false,
    sidebarOpened: false,
    activeItem: '',
  };

  constructor(props) {
    super(props);

    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.doLogout = this.doLogout.bind(this);
  }

  onMouseEnter() {
    if (!this.props.sidebarStatic && (isScreen('lg') || isScreen('xl'))) {
      const paths = this.props.location.pathname.split('/');
      paths.pop();
      this.props.dispatch(openSidebar());
      this.props.dispatch(changeActiveSidebarItem(paths.join('/')));
    }
  }

  onMouseLeave() {
    if (!this.props.sidebarStatic && (isScreen('lg') || isScreen('xl'))) {
      this.props.dispatch(closeSidebar());
      this.props.dispatch(changeActiveSidebarItem(null));
    }
  }

  dismissAlert(id) {
    this.props.dispatch(dismissAlert(id));
  }

  doLogout() {
    this.props.dispatch(logoutUser());
  }

  render() {
    const user = JSON.parse(window.localStorage.getItem('deeep.user'));
    if (user) {
      return (
          <nav
              onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}
              className={[s.root, this.props.sidebarStatic ? s.staticSidebar : '', !this.props.sidebarOpened ? s.sidebarClose : ''].join(' ')}
          >
            <header className={s.logo}>
              <Link to="/app">
                <img src={logoIco} width={40}/>
                <span className={s.logoName}>Deeep Marketing</span>
              </Link>
            </header>
            <ul className={s.nav}>
              <LinksGroup header="Home" link="/app" iconName="fa-bar-chart" isHeader />
              <LinksGroup header="Settings" link="/app/profile/settings" iconName="fa-cogs" badge="1" isHeader />
            </ul>
            <ul className={`${s.nav} ${s['nav-bottom']}`}>
              <LinksGroup header="Help" isOutLink={true} link="http://help.deeep.marketing" iconName="fa-question-circle" isHeader />
              <LinksGroup header="Logout" link="/auth" onActiveSidebarItemChange={() => this.doLogout()}  iconName="fa-eject" isHeader />
            </ul>
          </nav>
      );
    }
    return null;

  }
}

function mapStateToProps(store) {
  return {
    sidebarOpened: store.navigation.sidebarOpened,
    sidebarStatic: store.navigation.sidebarStatic,
    activeItem: store.navigation.activeItem,
  };
}

export default withRouter(connect(mapStateToProps)(withStyles(s)(Sidebar)));
