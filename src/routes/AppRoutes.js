import { Route, Routes } from "react-router-dom";

import Login from '../components/Login/Login.js';
import Register from '../components/Register/Register.js';
import Users from '../components/ManageUsers/Users.js';
import PrivateRoutes from "./PrivateRoutes.js";
import Role from "../components/Role/Role.js";
import GroupRole from "../components/Group-Role/GroupRole.js";
const Project = () => {
    return <span>Projects</span>;
};

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/users" element={<PrivateRoutes element={<Users />} />} />
            <Route path="/projects" element={<PrivateRoutes element={<Project />} />} />
            <Route path="/roles" element={<PrivateRoutes element={<Role />} />} />
            <Route path="/group-role" element={<PrivateRoutes element={<GroupRole />} />} />/
            <Route path="/" element={'Home'} />
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
