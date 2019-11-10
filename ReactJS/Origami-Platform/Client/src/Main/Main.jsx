import React from 'react';
import styles from './main.module.css';

function Main({ children, title }) {
    return (
        <main className={styles.main}>
            <h1>{title}</h1>
            {children}
        </main>
    )
}

export default Main;