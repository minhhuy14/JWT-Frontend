import axios from '../setup/axios';

const registerNewUser = (email, phone, username, password) => {
    return axios.post('http://localhost:8080/api/v1/register', {
        email, phone, username, password
    })
}

const loginUser = (email, password) => {
    return axios.post('http://localhost:8080/api/v1/login', {
        email, password
    });
}

const fetchAllUsers = (page, limit) => {
    return axios.get(`/api/v1/user/read?page=${page}&limit=${limit}`);
}

const deleteUser = (user) => {
    return axios.delete("/api/v1/user/delete", { data: { id: user.id } })
}

const fetchGroups = () => {
    return axios.get(`/api/v1/group/read`);
}

const createNewUser = (userData) => {
    return axios.post("/api/v1/user/create", { ...userData });
}

const updateCurrentUser = (userData) => {
    return axios.put("/api/v1/user/update", { ...userData });

}

const getUserAccount=()=>{
    return axios.get(`/api/v1/account`);
}
const logoutUser=()=>{
    return axios.post(`/api/v1/logout`,{});
}
export {
    registerNewUser, loginUser, fetchAllUsers, deleteUser, fetchGroups, createNewUser, updateCurrentUser, getUserAccount,logoutUser
}