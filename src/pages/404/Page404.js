import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {withRouter} from "react-router-dom";
import connect from "react-redux/es/connect/connect";
import s from './Page404.scss';
import Widget from "../../components/Widget";
import {Button} from 'reactstrap';

class Page404 extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const user = JSON.parse(window.localStorage.getItem('deeep.user'));
        return  (
            <div className={s.root}>
                <Widget>
                    <h1>Ops! <br/> Ei {user.firstName}, você tentou acessar uma página que não existe!</h1>
                    <Button onClick={()=> window.location='/app'}>Voltar para o Dashboard</Button>
                </Widget>
            </div>
        );
    }
}

export default withRouter(withStyles(s)(Page404));


