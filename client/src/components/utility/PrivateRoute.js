import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function PrivateRoute({ children, ...props }) {
    return (
        <Route 
            {...props}
            render={({ location }) =>
                auth.user ? (
                    children
                ) : (
                    <Redirect 
                        to={{ 
                            pathname: "/login", 
                            state: { from: location } 
                        }}/>
                )
            }
        />
    )
}

export default PrivateRoute;