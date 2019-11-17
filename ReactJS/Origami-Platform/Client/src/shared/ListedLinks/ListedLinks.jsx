import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import './listed-links.css';

function ListedLinks() {
    return (
        <Fragment>
            <li className="list-item"><Link to="/create-post">Post</Link></li>
            <li className="list-item"><Link to="/login">Login</Link></li>
            <li className="list-item"><Link to="/register">Register</Link></li>
            <li className="list-item"><Link to="/profile">Profile</Link></li>
            <li className="list-item"><Link to="#">Going to 5</Link></li>
            <li className="list-item"><Link to="#">Going to 6</Link></li>
            <li className="list-item"><Link to="#">Going to 7</Link></li>
            <li className="list-item"><Link to="#">Going to 8</Link></li>
            <li className="list-item"><Link to="#">Going to 9</Link></li>
            <li className="list-item"><Link to="#">Going to 10</Link></li>
            <li className="list-item"><Link to="#">Going to 11</Link></li>
        </Fragment>
    )
}

export default ListedLinks;