
import { PropTypes } from 'prop-types';
import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Loader from '../Components/Loader/Loader';

const PrivateRoutes = ({ children }) => {
    const [loginStatus, setLoginStatus] = useState(null);
    const location = useLocation();
    useEffect(() => {
        const checkLoginStatus = () => {
            const storedToken = localStorage.getItem('access_token');
            setLoginStatus(storedToken ? 'loggedIn' : 'loggedOut');
        };

        checkLoginStatus();
    }, []);

    if (loginStatus === null) {

        return <Loader></Loader>;
    } else if (loginStatus === 'loggedIn') {

        return children;
    } else {
        // User is not logged in, redirect to login page
        return <Navigate state={location.pathname} to={"/login"}></Navigate>
    }
};

PrivateRoutes.propTypes = {
    children: PropTypes.node,
};

export default PrivateRoutes;