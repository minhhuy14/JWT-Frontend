import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const PrivateRoutes = ({ element }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(true);

    const { user } = useContext(UserContext);
    useEffect(() => {
        console.log("Check context user in private routes: ", user);
        const session = sessionStorage.getItem('account');
        if (!session) {
            setIsAuthenticated(false);
        }
    }, []);

    // If authenticated, render the protected component
    return isAuthenticated ? element : <Navigate to="/login" />;
};

export default PrivateRoutes;
