import React, { useState, useEffect, createContext } from 'react';
import authApi from '../api/auth';

export const authContext = createContext({ });

export default function ProvideAuth(props) {
    const auth = useProvideAuth();

    return (
        <authContext.Provider value={auth}>
            {props.children}
        </authContext.Provider>
    )
}

function useProvideAuth() {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loginWithToken = async () => {
            await authApi.tokenLogin((user) => {
                user ? console.log("Logged in as " + user.userName) : console.log("Not logged in");
                setUser(user);
                setError(null);
                setIsLoading(false);
            });
        }
        console.log("Logging in with token");
        setIsLoading(true);
        loginWithToken();

    }, []);

    const signup = (userInfo, cb) => {
        return authApi.signup(userInfo, (data) => {
            console.log(data);
            cb(data);
        })
    }

    const login = (credentials, cb) => {
        console.log("logging in");
        setIsLoading(true);
        authApi.login(credentials, (user, error) => {
            if(error) setError(error);
            else {
                setUser(user);
                setError(null);
                cb(user);
            }
        })
        setIsLoading(false);
    }

    const logout = cb => {
        return authApi.logout(() => {
            setUser(null);
            setError(null);
            cb && cb();
        });
    }

    const changePassword = (currentPassword, newPassword, cb) => {
        return authApi.changePassword(currentPassword, newPassword, user.token, (err) => {
            if(err) {
                setError(err);
                cb(err);
            } else {
                setError(null);
                cb(null);
            }
        });
    }

    return {
        user,
        isLoading,
        error,
        signup,
        login, 
        logout,
        changePassword
    }
}