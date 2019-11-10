import React from 'react';
import Post from './Post/Post';
import postService from '../services/post-service';
import styles from './posts.module.css';

class Posts extends React.Component {
    state = {
        posts: null
    };

    renderPost = (posts) => {
        if (posts) {
            return posts.map(post => {
                return (<Post key={post._id} imageUrl="logo.svg" imageAlt="Origami" {...post} />);
            });
        } else {
            return <div>Loading</div>
        }

    }

    componentDidMount() {
        postService.load()
            .then(posts => {
                this.setState({ posts: posts });
            })
            .catch(err => {
                console.error(err);
            });
    }

    render() {
        return (
            <div className={styles.posts}>
                {this.renderPost(this.state.posts)}
            </div>
        )
    }
}

export default Posts;