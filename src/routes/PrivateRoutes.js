import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const PrivateRoutes = ({ element }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(true);

    useEffect(() => {
        const session = sessionStorage.getItem('account');
        if (!session) {
            setIsAuthenticated(false);
        }
    }, []);

    // If authenticated, render the protected component
    return isAuthenticated ? element : <Navigate to="/login" />;
};

export default PrivateRoutes;
