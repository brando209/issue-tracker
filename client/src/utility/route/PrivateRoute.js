import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
function PrivateRoute({ children, component, ...props }) {
    let auth = useAuth();
    const Component = component;
    return (
        <Route
            {...props}
            render={(props) =>
            auth.user ? (
                children || <Component {...props}/>
            ) : (
                <Redirect
                    to={{
                        pathname: "/login",
                        state: { from: props.location }
                    }}
                />
            )}
        />
    );
}

export default PrivateRoute;