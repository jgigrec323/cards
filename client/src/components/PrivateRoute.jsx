import React, { useContext, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from './AuthContext'; // Import the AuthContext

const PrivateRoute = ({ component }) => {
    const location = useLocation();
    const { isAuth, isLoading, error, authenticate } = useContext(AuthContext);

    useEffect(() => {
        async function callAuth() {
            authenticate()
        }
        callAuth()
    })


    if (isLoading) {
        return <div>Loading...</div>; // Display a loading state while authentication is in progress
    }

    if (error) {
        return <div>Error: {error.message}</div>; // Handle authentication errors (optional)
    }

    return isAuth ? component : <Navigate to="/login" state={{ from: location.pathname }} />;
};

export default PrivateRoute;
