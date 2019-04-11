import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Loading.module.scss';

class Loading extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (<div className={`${s['lds-css']} ${this.props.open ? s.hidden : ''}`}>
        <div className={s['lds-eclipse']}>
            Carregando ...
            <div className={`${this.props.className}`}>
            </div>
        </div>
        </div>
    );
  }
}

export default withStyles(s)(Loading);
