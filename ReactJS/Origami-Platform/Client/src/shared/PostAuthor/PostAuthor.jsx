import React from 'react';
import styles from './post-author.module.css';

function PostAuthor({ author }) {
    return (
        <div className={styles.container}>
            <span>
                <small>Author:</small>
                {author}
            </span>
        </div>
    )
}

export default PostAuthor;