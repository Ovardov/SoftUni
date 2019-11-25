import React, { Component } from 'react';
import Posts from '../publications/Posts/Posts';
import postService from '../services/post-service';
import styles from './input.module.css';

class Input extends Component {
    state = {
        description: ''
    }

    descriptionOnChangeHandler = (e) => {
        this.setState({
            description: e.target.value
        })
    }

    submitPost = () => {
        const data = this.state;

        postService.addPost(data)
            .then(() => {
                this.props.history.push('/');
            })
            .catch(err => {
                console.log(err);
            })
    }

    render() {
        const id = this.props.location.loggedUserId;

        return (
            <div className={styles.input} >
                <div>
                    <h1>Share your thoughts...</h1>
                    <textarea onChange={this.descriptionOnChangeHandler}>{this.state.description}</textarea>
                    <button onClick={this.submitPost}>Post</button>
                </div>

                <div>
                    <h2>Last 3 post on your wall</h2>
                    <Posts id={id} limit="3" />
                </div>
            </div>
        )
    }
}

export default Input;