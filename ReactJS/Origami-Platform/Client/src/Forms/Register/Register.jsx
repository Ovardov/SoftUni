import React from 'react';
import styles from '../forms.module.css';

function Register() {
    return (
        <div className={styles.register}>
            <h1>Register Page</h1>
            <form action="/register" method="POST">
                <div className={styles['form-control']}>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" />
                </div>

                <div className={styles['form-control']}>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" />
                </div>

                <div className={styles['form-control']}>
                    <label htmlFor="re-password">Re-Password</label>
                    <input type="password" name="re-password" />
                </div>

                <div className={styles['form-control']}>
                    <button type="submit">Register</button>
                </div>
            </form>
        </div>
    )
}

export default Register;