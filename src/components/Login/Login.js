import './Login.scss';
const Login = (props) => {
    return (
        <div class="login-container">
            <div className="container">
                <div className="row">
                    <div className="content-left col-md-7 d-none">
                        <div className="brand">
                            Hoi Dan IT
                        </div>
                    </div>
                    <div className="content-right green col-md-5">
                        <div className="Detail">
                            Facebook helps you connect to all over the world.
                        </div>
                    </div>
                    <div className="content-right col-5 d-flex flex-column gap-3 py-3">
                        <input type="text" className="form-control" placeholder="Email or phone number"></input>
                        <input type="password" className="form-control" placeholder="Password"></input>
                        <button className='btn btn-primary'>Login</button>
                        <span className='text-center'>Forgot your password?</span>
                        <hr></hr>
                        <div className='text-center'>
                            <button className='btn btn-success'>Create new account</button>

                        </div>


                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login