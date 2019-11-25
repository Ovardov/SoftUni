import React from 'react';
import ListedLinks from '../shared/ListedLinks/ListedLinks';
import styles from './aside.module.css';

function Aside({isLogged, loggedUserId}) {
    return (
        <aside className={styles.aside}>
            <ListedLinks isLogged={isLogged}  loggedUserId={loggedUserId}/>
        </aside>
    )
}

export default Aside;