import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import './listed-links.css';

function ListedLinks({ isLogged, loggedUserId }) {
    return (
        <Fragment>
            {isLogged && <li className="list-item"><Link to={{ pathname:"/create-post", loggedUserId}}>Post</Link></li>}
            {!isLogged && <li className="list-item"><Link to="/login">Login</Link></li>}
            {!isLogged && <li className="list-item"><Link to="/register">Register</Link></li>}
            {isLogged && <li className="list-item"><Link to={`/profile/${loggedUserId}`}>Profile</Link></li>}
        </Fragment>
    )
}

export default ListedLinks;