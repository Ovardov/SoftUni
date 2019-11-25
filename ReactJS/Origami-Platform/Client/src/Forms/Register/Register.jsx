import React, { Component } from 'react';
import WithForm from '../../shared/hocs/WithForm';
import userService from '../../services/user-service';
import styles from '../forms.module.css';

class Register extends Component {
    usernameOnChangeHandler = this.props.controlChangeHandlerFactory('username');
    passwordOnChangeHandler = this.props.controlChangeHandlerFactory('password');
    rePasswordOnChangeHandler = this.props.controlChangeHandlerFactory('rePassword');

    submitHandler = (event) => {
        event.preventDefault();

        const data = this.props.getFormState();

        userService.register(data)
            .then(() => {
                this.props.history.push('/login');
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        return (
            <div className={styles.register} >
                <h1>Register Page</h1>

                <form>
                    <div className={styles['form-control']}>
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" onChange={this.usernameOnChangeHandler} />
                    </div>

                    <div className={styles['form-control']}>
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" onChange={this.passwordOnChangeHandler} />
                    </div>

                    <div className={styles['form-control']}>
                        <label htmlFor="re-password">Re-Password</label>
                        <input type="password" id="re-password" onChange={this.rePasswordOnChangeHandler} />
                    </div>

                    <div className={styles['form-control']}>
                        <button type="submit" onClick={this.submitHandler}>Register</button>
                    </div>
                </form>
            </div>
        )
    }
}

const initialFormState = {
    username: '',
    password: '',
    rePassword: '',
}

export default WithForm(Register, initialFormState);