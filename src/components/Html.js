import React from 'react';
import PropTypes from 'prop-types';
import serialize from 'serialize-javascript';
import config from '../config';
import jquery from 'jquery';

window.$ = window.jQuery = jquery;

/* eslint-disable react/no-danger */

class Html extends React.Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        styles: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.string.isRequired,
            cssText: PropTypes.string.isRequired,
        }).isRequired),
        scripts: PropTypes.arrayOf(PropTypes.string.isRequired),
        app: PropTypes.object, // eslint-disable-line
        children: PropTypes.string.isRequired,
    };

    static defaultProps = {
        styles: [],
        scripts: [],
    };

    render() {
        const {title, description, styles, scripts, app, children} = this.props;
        // analytics here
        return (
            <html className="no-js" lang="en">
            <head>
                <meta charSet="utf-8"/>
                <meta httpEquiv="x-ua-compatible" content="ie=edge"/>
                <title>{title}</title>
                <meta name="description" content={description}/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <meta NAME="Title" CONTENT="Deeep Marketing - Transforming your Business with Artificial Intelligence"/>
                <meta NAME="Keywords"
                      CONTENT="neuromarketing,artificial intelligence, publicidade, memorabilidade, visual attention,"/>
                <meta NAME="Description"
                      CONTENT=" Deeep Marketing - Transforming your Business with Artificial Intelligence"/>
                <meta NAME="Subject" CONTENT="Neuromarketing and Artificial Intelligence"/>
                <meta NAME="Language" CONTENT="Brazil"/>
                <meta NAME="Robots" CONTENT="INDEX,FOLLOW"/>

                <link rel="apple-touch-icon" href="/apple-touch-icon.png"/>
                <link rel="icon" href="/favicon.ico"/>
                {styles.map(style =>
                    <style
                        key={style.id}
                        id={style.id}
                        dangerouslySetInnerHTML={{__html: style.cssText}}
                    />,
                )}
                <script dangerouslySetInnerHTML={{__html: {/* analytics here */}}}/>
                <script
                    dangerouslySetInnerHTML={{__html: 'var OneSignal = window.OneSignal || []; OneSignal.push(function() { OneSignal.init({ appId: "6d6e7c7b-df51-4a27-bc7f-4139b5d0b70e", });'}}/>
                <script
                    dangerouslySetInnerHTML={{__html: '"use strict"; !function () { var t = window.driftt = window.drift = window.driftt || []; if (!t.init) { if (t.invoked) return void (window.console && console.error && console.error("Drift snippet included twice.")); t.invoked = !0, t.methods = ["identify", "config", "track", "reset", "debug", "show", "ping", "page", "hide", "off", "on"], t.factory = function (e) { return function () { var n = Array.prototype.slice.call(arguments); return n.unshift(e), t.push(n), t; }; }, t.methods.forEach(function (e) { t[e] = t.factory(e); }), t.load = function (t) { var e = 3e5, n = Math.ceil(new Date() / e) * e, o = document.createElement("script"); o.type = "text/javascript", o.async = !0, o.crossorigin = "anonymous", o.src = "https://js.driftt.com/include/" + n + "/" + t + ".js"; var i = document.getElementsByTagName("script")[0]; i.parentNode.insertBefore(o, i); }; } }(); drift.SNIPPET_VERSION = \'0.3.1\'; drift.load(\'rh7v2kfnfvhv\');'}}/>
            </head>
            <body>
            <div style={{width: 100, border: '1px solid black', height: 100}}>
                dsdsdsdds
            </div>
            <div id="app" dangerouslySetInnerHTML={{__html: children}}/>
            <script dangerouslySetInnerHTML={{__html: `window.App=${serialize(app)}`}}/>
            {scripts.map(script => <script key={script} src={script}/>)}
            <script src="https://cdn.onesignal.com/sdks/OneSignalSDK.js" async=""></script>
            </body>
            </html>
        );
    }
}

export default Html;
