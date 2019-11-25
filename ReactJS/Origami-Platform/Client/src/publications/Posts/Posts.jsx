import React from 'react';
import PropTypes from 'prop-types';
import Post from './Post/Post';
import postService from '../../services/post-service';
import styles from './posts.module.css';

class Posts extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: null,
        };
    }


    renderPost = (posts) => {
        if (posts) {
            return posts.map(post => {
                return (<Post key={post._id} imageUrl="../blue-origami-bird.png" imageAlt="Origami" {...post} />);
            });
        } else {
            return <div>Loading</div>
        }

    }

    componentDidMount() {
        const { id, limit } = this.props;

        postService.load(id, limit)
            .then(posts => {
                this.setState({ posts: posts });

                this.props.getPostLength(Object.keys(posts).length);
                this.props.getUsername(posts[0].author.username);
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

Posts.propTypes = {
    limit: PropTypes.number
}

export default Posts;