import React from 'react';
import { Link } from 'react-router-dom';
import ListedLinks from '../shared/ListedLinks/ListedLinks';
import styles from './footer.module.css';

function Footer() {
    return (
        <footer className={styles.footer}>
            <ListedLinks />
            <Link to="/">
                <img src="blue-origami-bird-flipped.png" alt="Origami" className={styles.logo} />
            </Link>
            <p>Software University &copy; 2019</p>
        </footer>
    )
}

export default Footer;