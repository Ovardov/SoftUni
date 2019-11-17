import React from 'react';
import styles from '../forms.module.css';

function Login() {
    return (
        <div className={styles.login}>
            <h1>Login Page</h1>
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
                    <button type="submit">Login</button>
                </div>
            </form>
        </div>
    )
}

export default Login;