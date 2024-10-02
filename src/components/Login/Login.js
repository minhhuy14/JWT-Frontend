import { isValidElement, useContext, useEffect, useState } from 'react';
import './Login.scss';
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { loginUser } from '../../services/userService'
import { UserContext } from '../../context/UserContext';
const Login = (props) => {

    let { loginContext } = useContext(UserContext);
    let navigate = useNavigate();
    const [valueLogin, setValueLogin] = useState("");
    const [password, setPassword] = useState("");


    const defaultObjValidInput = {
        isValidValueLogin: true,
        isValidPassword: true
    }

    const [objValidInput, setObjValidInput] = useState(defaultObjValidInput);
    const handleCreateNewAccount = () => {
        navigate("/register")
    }

    const handleLogin = async () => {
        setObjValidInput(defaultObjValidInput);
        if (!valueLogin) {
            setObjValidInput({ ...defaultObjValidInput, isValidValueLogin: false });
            toast.error("Please enter your email address or phone number");
            return;
        }
        if (!password) {
            setObjValidInput({ ...defaultObjValidInput, isValidPassword: false });
            toast.error("Please enter your password");
            return;
        }
        let response = await loginUser(valueLogin, password);
        console.log("res login data", response);

        if (response && +response.EC === 0) {
            let groupWithRoles = response.DT.roles;
            let email = response.DT.email;
            let username = response.DT.username;
            let token = response.DT.accessToken;
            let data = {
                isAuthenticated: true,
                token,
                account: { groupWithRoles, email, username }
            }
            loginContext(data);
            navigate('/users');
            // window.location.reload();
            toast.success("Login successfully!");
        }
        else {
            toast.error(response.EM);
        }
    }

    const handlePressEnter = (event) => {
        if (event.keyCode === 13 && event.key === "Enter") {
            handleLogin();

        }
    }

    return (
        <div className="login-container">
            <div className="container">
                <div className="row">
                    <div className="content-left col-12 d-none col-sm-7 d-sm-block">
                        <div className="brand">
                            Hoi Tan IT
                        </div>
                        <div className="detail">
                            Facebook helps you connect to all over the world.
                        </div>
                    </div>
                    <div className="content-right col-5 d-flex flex-column gap-3 py-3">
                        <div className="brand d-sm-none">
                            Hoi Tan IT
                        </div>
                        <input type="text" className={objValidInput.isValidValueLogin ? 'form-control' : 'is-invalid form-control'} placeholder="Email or phone number" value={valueLogin} onChange={(event) => { setValueLogin(event.target.value) }}></input>
                        <input type="password" placeholder="Password" className={objValidInput.isValidPassword ? 'form-control' : 'is-invalid form-control'} value={password} onChange={(event) => { setPassword(event.target.value) }} onKeyDown={(event) => { handlePressEnter(event) }}></input>
                        <button className='btn btn-primary' onClick={() => { handleLogin() }}>Login</button>
                        <span className='text-center'><a className='forgot-password' href='#'>Forgot your password?</a></span>
                        <hr></hr>
                        <div className='text-center'>
                            <button className='btn btn-success' onClick={() => handleCreateNewAccount()}>Create new account</button>

                        </div>


                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login