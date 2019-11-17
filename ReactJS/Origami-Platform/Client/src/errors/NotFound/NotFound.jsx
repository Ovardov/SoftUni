import React from 'react';
import styles from './not-found.module.css';

function NotFound() {
    return(
        <div className={styles['not-found']}>
            <h1>Something went wrong...</h1>
            <img src="not-found.png" alt="Not Found"/>
        </div>
    )
}

export default NotFound;