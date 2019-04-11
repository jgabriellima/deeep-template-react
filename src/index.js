/* eslint-disable import/first */
import jQuery from 'jquery';
import 'semantic-ui-css/semantic.min.css';

window.jQuery = jQuery;
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import configureStore from './store/configureStore'
import './styles/theme.scss';
import JavascriptTimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en';

JavascriptTimeAgo.locale(en);
import {I18nextProvider} from "react-i18next";
import i18n from "./i18n";

require('dotenv').config();

const fetch = () => {
};

const store = configureStore({}, {});

const css = new Set();

const context = {
    fetch,
    store,
    insertCss: (...styles) => {
        // eslint-disable-next-line no-underscore-dangle
        styles.forEach(style => css.add(style.toString()));
    },
};

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <I18nextProvider i18n={i18n} initialLanguage={'pt'}>
                <App store={store} context={context}/>
            </I18nextProvider>
        </Provider>
    </BrowserRouter>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
