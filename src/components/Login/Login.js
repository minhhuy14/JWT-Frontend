import './Login.scss';
import { useNavigate } from 'react-router-dom'
const Login = (props) => {

    let navigate = useNavigate();

    const handleCreateNewAccount = () => {
        navigate("/register")
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
                        <input type="text" className="form-control" placeholder="Email or phone number"></input>
                        <input type="password" className="form-control" placeholder="Password"></input>
                        <button className='btn btn-primary'>Login</button>
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