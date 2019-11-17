import React from 'react';
import Posts from '../publications/Posts/Posts';
import styles from './profile.module.css';

function Profile() {
    return (
        <div className={styles.profile}>
            <img src="" alt="" />
            <div className={styles['personal-info']}>
                <p>
                    <span>Email:</span>
                    test@test.com
                </p>
                <p>
                    <span>Posts:</span>
                    9
                </p>
            </div>
            <div>
                <h2>3 of your recent post</h2>
                <Posts limit="3"/>
            </div>
        </div>
    )
}

export default Profile;