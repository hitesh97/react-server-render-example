import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import styles from '../../styles/styles.pcss';

export default class Menu extends Component {
    render() {
        return (
            <div>
                <ul>
                    <li>
                        <NavLink exact to={'/'} activeClassName={styles.active}>
                            Homepage
                        </NavLink>
                    </li>
                    <li>
                        <NavLink activeClassName={styles.active} to={'/about'}>
                            About
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            activeClassName={styles.active}
                            to={'/contact'}
                        >
                            Contact
                        </NavLink>
                    </li>
                </ul>
            </div>
        );
    }
}
