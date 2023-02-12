const LoginMobile = () => {
    return (
        <div>
            <div className="login-container">
                <section className="login" id="login">
                    <header>
                        <h2>Application Name</h2>
                        <h4>Login</h4>
                    </header>
                    <form className="login-form" action="#" method="post">
                        <input type="text" className="login-input" placeholder="User" required autoFocus/>
                        <input type="password" className="login-input" placeholder="Password" required/>
                        <div className="submit-container">
                            <button type="submit" className="login-button">SIGN IN</button>
                        </div>
                    </form>
                </section>
            </div>
        </div>
    );
};

export default LoginMobile