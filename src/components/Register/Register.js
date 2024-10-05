// import './Register.scss';
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { registerNewUser } from '../../services/userService';
const Register = (props) => {

    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const defaultValidInput = {
        isValidEmail: true,
        isValidPhone: true,
        isValidPassword: true,
        isValidConfirmPassword: true
    }
    const [objCheckInput, setObjCheckInput] = useState(defaultValidInput);
    const navigate = useNavigate();

    const isValidInputs = () => {
        setObjCheckInput(defaultValidInput);
        if (!email) {
            toast.error("Email is required");
            setObjCheckInput({ ...defaultValidInput, isValidEmail: false });
            return false;
        }
        let emailRegx = /\S+@\S+\.\S+/;
        if (!emailRegx.test(email)) {
            toast.error("Email is invalid");
            setObjCheckInput({ ...defaultValidInput, isValidEmail: false });
            return false;
        }
        if (!phone) {
            toast.error("Phone is required");
            setObjCheckInput({ ...defaultValidInput, isValidPhone: false });
            return false;
        }
        if (!password) {
            toast.error("Password is required");
            setObjCheckInput({ ...defaultValidInput, isValidPassword: false });
            return false;
        }
        if (password !== confirmPassword) {
            toast.error("Password and confirmed Password do not match");
            setObjCheckInput({ ...defaultValidInput, isValidConfirmPassword: false });
            return false;
        }
        return true;
    }
    const handleLogin = () => {
        navigate("/login")
    }

    const handleRegister = async () => {
        let check = isValidInputs();
        if (check === true) {
            let response = await registerNewUser(email, phone, username, password);
            let serverData = response;
            if (+serverData.EC === 0) {
                toast.success(serverData.EM);
                navigate('/login');
            }
            else {
                toast.error(serverData.EM)
            }

        }

    }
    useEffect(() => {
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
                            <input type="text" className={objCheckInput.isValidEmail ? 'form-control is-valid' : 'form-control is-invalid'} placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)} />
                        </div>
                        <div className='form-group'>
                            <label>Phone number:</label>
                            <input type="tel" className={objCheckInput.isValidPhone ? 'form-control is-valid' : 'form-control is-invalid'} placeholder="Phone number" value={phone} onChange={(event) => setPhone(event.target.value)} ></input>
                        </div>
                        <div className='form-group'>
                            <label>Username:</label>
                            <input type="text" className={objCheckInput.isValidPassword ? 'form-control is-valid' : 'form-control is-invalid'} placeholder="Username" value={username} onChange={(event) => setUsername(event.target.value)} ></input>
                        </div>
                        <div className='form-group'>
                            <label>Password:</label>
                            <input type="password" className={objCheckInput.isValidConfirmPassword ? 'form-control is-valid' : 'form-control is-invalid'} placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)} ></input>

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