import React from 'react';
import Link from '../shared/Link/Link'
import styles from './footer.module.css';


function Footer() {
    return (
        <footer className={styles.footer}>
            <ul>
                <Link url="#">Going to 1</Link>
                <Link url="#">Going to 2</Link>
                <Link url="#">Going to 3</Link>
                <Link url="#">Going to 4</Link>
                <Link url="#">Going to 5</Link>
                <Link url="#">Going to 6</Link>
                <Link url="#">Going to 7</Link>
                <Link url="#">Going to 8</Link>
                <Link url="#">Going to 9</Link>
                <Link url="#">Going to 10</Link>
                <Link url="#">Going to 11</Link>
                <Link url="#">
                    <img src="blue-origami-bird-flipped.png" alt="Origami" className={styles.logo} />
                </Link>
            </ul>
            <p>Software University &copy; 2019</p>
        </footer>
    )
}

export default Footer;