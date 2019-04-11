import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {
  Container,
  Form,
  FormGroup,
  Input,
  Button,
} from 'reactstrap';

import s from './ErrorPage.module.scss';

class ErrorPage extends React.Component {
  render() {
    return (
      <div className={s.errorPage}>
        <Container className="height-100">
          <div className={`${s.errorContainer} mx-auto`}>
            <h1 className={s.errorCode}>404</h1>
            <p className={s.errorInfo}>
              Opps, it seems that this page does not exist.
            </p>
            <p className={[s.errorHelp, 'mb-3'].join(' ')}>
              If you are sure it should, search for it.
            </p>
            <Form method="get">
              <Button className={s.errorBtn} type="submit" color="inverse" onClick={()=>window.location='/'}>
                Back to main page
              </Button>
            </Form>
          </div>
          <footer className={s.pageFooter}>
            2018 &copy; Deeep Digital - Powered by Deeep Marketing
          </footer>
        </Container>
      </div>
    );
  }
}

export default withStyles(s)(ErrorPage);
