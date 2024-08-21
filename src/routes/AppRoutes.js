import { Route, Routes } from "react-router-dom";

import Login from '../components/Login/Login.js';
import Register from '../components/Register/Register.js';
import Users from '../components/ManageUsers/Users.js';
import PrivateRoutes from "./PrivateRoutes.js";

const Project = () => {
    return <span>Projects</span>;
};

const AppRoutes = () => {
    return (
        <Routes>
            {/* Now using PrivateRoutes as a wrapper for protected components */}
            <Route path="/users" element={<PrivateRoutes element={<Users />} />} />
            <Route path="/projects" element={<PrivateRoutes element={<Project />} />} />

            <Route path="/news" element={'News'} />
            <Route path="/about" element={'About'} />
            <Route path="/contact" element={'Contact'} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={'Not Found'} />
        </Routes>
    );
};

export default AppRoutes;
