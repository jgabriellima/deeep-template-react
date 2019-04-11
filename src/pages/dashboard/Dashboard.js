import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Dashboard.module.scss';
import {withRouter} from "react-router-dom";
import connect from "react-redux/es/connect/connect";

class Dashboard extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={s.root}>
                <h1>Dashboard</h1>
            </div>
        );
    }
}


function mapStateToProps(state) {
    return Object.assign({}, {dashboard: state.dashboard})
}

export default withRouter(connect(mapStateToProps)(withStyles(s)(Dashboard)));
