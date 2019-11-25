import React from 'react';
import { Link } from 'react-router-dom';
import ListedLinks from '../shared/ListedLinks/ListedLinks';
import styles from './navigation.module.css';

function Navigation({isLogged, loggedUserId}) {
    return (
        <nav className={styles.navigation}>
            <ul>
                <li className="list-item">
                    <Link to='/'>
                        <img src="white-origami-bird.png" alt="Origami" className={styles.logo} />
                    </Link>
                </li>

                <ListedLinks isLogged={isLogged} loggedUserId={loggedUserId}/>
            </ul>
        </nav>
    )
}

export default Navigation;