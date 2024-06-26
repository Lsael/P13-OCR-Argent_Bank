import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { postLogin } from "../services/fetch.js";
import { setToken } from "../stores/userSlice";

const SignIn = () => {
  const dispatch = useDispatch()
  const token = useSelector((state) => state.user.token)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [errorDisplay, setErrorDisplay] = useState(false)

  const handleRememberMe = (token) => {
    if(rememberMe) {
      localStorage.setItem("ArgentBank", token)
    }
  }

  const hanbleSubmitLogin = async () => {
    const response = await postLogin({
      email: username,
      password: password
    });

    if (response.status === 200) {
      sessionStorage.setItem("ArgentBank", response.body.token);
      handleRememberMe(response.body.token)
      dispatch(setToken(response.body.token))
    } else {
      setErrorDisplay(true)
    }
  };

  if (token) {
    return <Navigate to="/profile" />;
  } else {
    return (
      <div className="login-page">
          <main className="main bg-dark">
            <section className="sign-in-content">
              <i className="fa fa-user-circle sign-in-icon"></i>
              <h1>Sign In</h1>
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="input-wrapper">
                  <label htmlFor="username">Username</label>
                  <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
                </div>
                <div className="input-wrapper">
                  <label htmlFor="password">Password</label>
                  <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="input-remember">
                  <input type="checkbox" id="remember-me" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
                  <label htmlFor="remember-me">Remember me</label>
                </div>
                <button className="sign-in-button" onClick={() => hanbleSubmitLogin()}>
                  Sign In
                </button>
                <span className={errorDisplay ? "login-error-displayed" : "login-error-hidden"}>Incorrect Username or password</span>
              </form>
            </section>
          </main>
      </div>
    );
  }
};

export default SignIn;
