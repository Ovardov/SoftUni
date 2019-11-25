import React, { Component } from 'react';
import Posts from '../publications/Posts/Posts';
import utils from '../utils/index';
import styles from './profile.module.css';

class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            postsLenght: 0,
            username: ''
        }
    }

    logout = () => {
        this.props.logout(this.props.history);
    }

    getPostLength = (postsLenght) => {
        this.setState({
            postsLenght
        })
    }

    getUsername = (username) => {
        this.setState({
            username
        })
    }

    render() {
        const isLogged = utils.isLogged();
        const { id } = this.props.match.params;


        return (
            <div className={styles.profile} >
                <img src="" alt="" />
                <div className={styles['personal-info']}>
                    <p>
                        <span>Username: {this.state.username}</span>
                    </p>
                    <p>
                        <span>Posts: {this.state.postsLenght}</span>
                    </p>

                    {isLogged && <button onClick={this.logout}>Logout</button>}
                </div>
                <div>
                    <h2>3 of your recent post</h2>
                    <Posts id={id} limit="3" {...this.state} getPostLength={this.getPostLength} getUsername={this.getUsername}/>
                </div>
            </div>
        )
    }
}

export default Profile;