import React from 'react';
import Posts from '../publications/Posts/Posts';
import styles from './main.module.css';

function Main() {
    return (
        <main className={styles.main}>
            <h1>Publications</h1>
            <Posts />
        </main>
    )
}

export default Main;