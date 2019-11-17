import React from 'react';
import ListedLinks from '../shared/ListedLinks/ListedLinks';
import styles from './aside.module.css';

function Aside() {
    return (
        <aside className={styles.aside}>
            <ListedLinks />
        </aside>
    )
}

export default Aside;