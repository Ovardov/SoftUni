import React from 'react';
import {Link} from 'react-router-dom';

function ErrorPage() {
    return(
        <div>
            Error Page
            <Link to='/'>Go back to home</Link>
        </div>
    )
}

export default ErrorPage;