import React, { Component } from 'react';
import Helmet from 'react-helmet';
import Menu from './Menu';
import styles from '../../styles/styles.pcss';

export default class Homepage extends Component {
    render() {
        return (
            <div className={styles.component}>
                <Helmet title="Welcome to our Homepage" />
                <Menu />
                <h1>Homepage</h1>
            </div>
        );
    }
}
