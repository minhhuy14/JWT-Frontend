import './Register.scss';
import { useNavigate } from 'react-router-dom'
const Register = (props) => {

    let navigate = useNavigate();

    const handleLogin = () => {
        navigate("/login")
    }
    return (
        <div class="login-container">
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
                            <input type="email" className="form-control" placeholder="Email"></input>
                        </div>
                        <div className='form-group'>
                            <label>Phone number:</label>
                            <input type="tel" className="form-control" placeholder="Phone number"></input>
                        </div>
                        <div className='form-group'>
                            <label>Username:</label>
                            <input type="text" className="form-control" placeholder="Username"></input>
                        </div>
                        <div className='form-group'>
                            <label>Password:</label>
                            <input type="password" className="form-control" placeholder="Password"></input>

                        </div>
                        <div className='form-group'>
                            <label>Re-enter Password:</label>
                            <input type="password" className="form-control" placeholder="Re-enter password"></input>

                        </div>
                        <button className='btn btn-primary'>Register</button>
                        <span className='text-center'><a className='forgot-password' href='#'>Already 've account. Login!</a></span>
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