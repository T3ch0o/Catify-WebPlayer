import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const AuthRoute = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={(props) => (
            rest.loggedIn
                ? <Redirect to="/" />
                : <Component {...props} />
        )} />
    );
};

export default AuthRoute;