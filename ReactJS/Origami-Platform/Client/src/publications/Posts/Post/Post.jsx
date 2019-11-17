import React from 'react';
import PostAuthor from '../../../shared/PostAuthor/PostAuthor';
import styles from './post.module.css';

function Post({ imageUrl, imageAlt, description, author }) {
    return (
        <div className={styles.post}>
            <img src={imageUrl} alt={imageAlt} />
            <p className={styles.description}>{description}</p>
            <PostAuthor author={author.username} />
        </div>
    )
}

export default Post;