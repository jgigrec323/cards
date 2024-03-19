import React, { createContext, useState } from 'react';
import { protectedRoutes } from '../routes/api';

const AuthContext = createContext({
    isAuth: false,
    setIsAuth: () => { },
    isLoading: false,
    setIsLoading: () => { },
    error: null,
    setError: () => { },
    authenticate: () => { },
    logout: () => { },
});

const AuthProvider = ({ children }) => {
    const [isAuth, setIsAuth] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const authenticate = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const authData = await protectedRoutes();
            setIsAuth(authData.data.status === true);
        } catch (error) {
            console.error('Authentication error:', error);
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };


    const logout = () => {
        // Implement logout logic (e.g., clear tokens, update state)
        sessionStorage.removeItem("token")
        setIsAuth(false);
    };

    return (
        <AuthContext.Provider
            value={{ isAuth, setIsAuth, isLoading, setIsLoading, error, setError, authenticate, logout }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
