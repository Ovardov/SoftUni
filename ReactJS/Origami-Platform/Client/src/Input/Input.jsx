import React from 'react';
import Posts from '../publications/Posts/Posts';
import styles from './input.module.css';

function Input() {
    return (
        <div className={styles.input}>
            <div>
                <h1>Share your thoughts...</h1>
                <textarea></textarea>
                <button>Post</button>
            </div>

            <div>
                <h2>Last 3 post on your wall</h2>
                <Posts limit="3"/>
            </div>
        </div>
    )
}

export default Input;