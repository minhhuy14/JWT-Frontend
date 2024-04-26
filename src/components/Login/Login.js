import './Login.scss';
const Login = (props) => {
    return (
        <div class="login-container">
            <div className="container">
                <div className="row">
                    <div className="content-left red col-md-7 d-none">
                        <div className="brand">
                            Hoi Dan IT
                        </div>
                    </div>
                    <div className="content-right green col-md-5">
                        <div className="Detail">
                            Facebook helps you connect to all over the world.
                        </div>
                    </div>
                    <div className="content-right col-5 green">
                        <input type="text"></input>
                        <input type="password"></input>
                        <button>Login</button>
                        <span>Forgot your password?</span>
                        <hr></hr>
                        <button>Create new account</button>


                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login