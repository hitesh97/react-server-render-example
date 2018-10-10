import React, { Component } from 'react';
import Helmet from 'react-helmet';
import Menu from './Menu';

export default class About extends Component {
    render() {
        return (
            <div>
                <Helmet title="About us" />
                <Menu />
                <h1>About</h1>
            </div>
        );
    }
}
