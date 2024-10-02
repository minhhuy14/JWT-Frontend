import { useContext, useEffect, useState } from "react";
import { Navigate,Route } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const PrivateRoutes = ({ element}) => {
    const { user } = useContext(UserContext);

    if (user&&user?.isAuthenticated===true){
            return element;
    }

    return <Navigate to="/login"></Navigate>
    
  
};

export default PrivateRoutes;
