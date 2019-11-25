import React, { Component } from 'react';
import WithForm from '../../shared/hocs/WithForm';
import styles from '../forms.module.css';

class Login extends Component {
    constructor(props) {
        super(props);

    }

    usernameOnChangeHandler = this.props.controlChangeHandlerFactory('username');
    passwordOnChangeHandler = this.props.controlChangeHandlerFactory('password');



    submitHandler = (event) => {
        event.preventDefault();

        const data = this.props.getFormState();

        this.props.login(this.props.history, data);
    }

    render() {
        return (
            <div className={styles.login} >
                <h1>Login Page</h1>

                <form>
                    <div className={styles['form-control']}>
                        <label htmlFor="username">Username</label>
                        <input type="username" name="username" onChange={this.usernameOnChangeHandler} />
                    </div>

                    <div className={styles['form-control']}>
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" onChange={this.passwordOnChangeHandler} />
                    </div>

                    <div className={styles['form-control']}>
                        <button type="submit" onClick={this.submitHandler}>Login</button>
                    </div>
                </form>
            </div>
        )
    }
}

const initialFormState = {
    username: '',
    password: '',
} 

export default WithForm(Login, initialFormState);