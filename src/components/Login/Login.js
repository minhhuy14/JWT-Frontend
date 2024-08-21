import { isValidElement, useEffect, useState } from 'react';
import './Login.scss';
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { loginUser } from '../../services/userService'
const Login = (props) => {

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
        console.log("res login data", response.data);

        if (response && response.data && +response.data.EC === 0) {

            let data = {
                isAuthenticated: true,
                token: 'fake token'
            }
            sessionStorage.setItem('account', JSON.stringify(data));
            navigate('/users');
            window.location.reload();
        }
        else {
            toast.error(response.data.EM);
        }
    }

    const handlePressEnter = (event) => {
        if (event.keyCode === 13 && event.key === "Enter") {
            handleLogin();

        }
    }

    useEffect(() => {

        const session = sessionStorage.getItem('account');
        if (session) {
            navigate('/');
        }
    }, [])
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