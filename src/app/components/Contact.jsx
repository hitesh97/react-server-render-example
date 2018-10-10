import React, { Component } from 'react';
import Helmet from 'react-helmet';
import Menu from './Menu';

export default class Contact extends Component {
    render() {
        return (
            <div>
                <Helmet title="Contact us" />
                <Menu />
                <h1>Contact</h1>
            </div>
        );
    }
}
