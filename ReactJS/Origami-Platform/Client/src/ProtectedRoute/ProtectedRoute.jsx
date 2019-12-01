import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function ProtectedRoute({ isLogged, isProtected, redirectTo, ...props }) {
    if (isLogged && !isProtected) {
        return <Redirect to={redirectTo} />
    } else if (!isLogged && isProtected) {
        return <Redirect to='/login' />
    } else {
        return <Route {...props} />;
    }
}

export default ProtectedRoute;