// import './Register.scss';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { isValidElement, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
const Register = (props) => {

    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const navigate = useNavigate();

    const isValidInputs = () => {
        if (!email) {
            toast.error("Email is required");
            return false;
        }
        let emailRegx = /\S+@\S+\.\S+/;
        if (!emailRegx.test(email)) {
            toast.error("Email is invalid");
            return false;
        }
        if (!phone) {
            toast.error("Phone is required");
            return false;
        }
        if (!password) {
            toast.error("Password is required");
            return false;
        }
        if (password !== confirmPassword) {
            toast.error("Password and confirmed Password do not match");
            return false;
        }



        return true;
    }
    const handleLogin = () => {
        navigate("/login")
    }

    const handleRegister = () => {
        let check = isValidInputs();
        if (!check) {
            toast.error("Please try again!");
            return;
        }
        let userData = { email, phone, username, password, confirmPassword };
        console.log("Check user data: ", userData);
        toast.success("Register successfully!");
    }
    useEffect(() => {
        axios.get("http://localhost:8080/api/test-api").then(data => {
            console.log(">>>check data axios: ", data)
        })
    }, [])
    return (
        <div className="register-container">
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
                        <div className='form-group'>
                            <label>Email:</label>
                            <input type="email" className="form-control" placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)} />
                        </div>
                        <div className='form-group'>
                            <label>Phone number:</label>
                            <input type="tel" className="form-control" placeholder="Phone number" value={phone} onChange={(event) => setPhone(event.target.value)} ></input>
                        </div>
                        <div className='form-group'>
                            <label>Username:</label>
                            <input type="text" className="form-control" placeholder="Username" value={username} onChange={(event) => setUsername(event.target.value)} ></input>
                        </div>
                        <div className='form-group'>
                            <label>Password:</label>
                            <input type="password" className="form-control" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)} ></input>

                        </div>
                        <div className='form-group'>
                            <label>Re-enter Password:</label>
                            <input type="password" className="form-control" placeholder="Re-enter password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} ></input>

                        </div>
                        <button className='btn btn-primary' onClick={() => handleRegister()}>Register</button>
                        <span className='text-center'><a className='forgot-password' href='/youtube.com'>Already 've account. Login!</a></span>
                        <hr></hr>
                        <div className='text-center'>
                            <button className='btn btn-success' onClick={() => handleLogin()}>Login</button>

                        </div>


                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register