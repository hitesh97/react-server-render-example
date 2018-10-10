import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { Switch, Route } from 'react-router-dom';

import Homepage from './components/Homepage';
import About from './components/About';
import Contact from './components/Contact';

export default class App extends Component {
    render() {
        return (
            <div>
                <Helmet
                    htmlAttributes={{ lang: 'en', amp: undefined }} // amp takes no value
                    titleTemplate="%s | React App"
                    titleAttributes={{ itemprop: 'name', lang: 'en' }}
                    meta={[
                        {
                            name: 'description',
                            content: 'Server side rendering example'
                        },
                        {
                            name: 'viewport',
                            content: 'width=device-width, initial-scale=1'
                        }
                    ]}
                    link={[{ rel: 'stylesheet', href: '/dist/styles.css' }]}
                />
                <Switch>
                    <Route exact path="/" component={Homepage} />
                    <Route path="/about" component={About} />
                    <Route path="/contact" component={Contact} />
                </Switch>
            </div>
        );
    }
}
