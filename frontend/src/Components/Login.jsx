import React from "react";
import profile from "./images/loginp.png";
import user from "./images/loginu.png";
import password from "./images/loginpa.png";

function Login(){
  return (
    <div className="main">
      <div className="sub-main">
        <div>
          <div className="imgs">
            <div className="container-image">
              <img src={profile} alt ="profile" className="profile"/>

            </div>
          </div>
          <div>
            <h1>Login to your account</h1>
            <div>
              <img src={user} alt="user" className="user"/>
              <input type="text" placeholder="user-name" className="name"/>
            </div>
            <div>
              <img src={password} alt="password" className="password"/>
              <input type="text" placeholder="Password" className="name"/>
            </div>
            <button className="login-button">Login</button>
          </div>
          <p className="link">
              <a href="#">Forgot password ?</a> Or<a href="#">Sign Up</a>
            </p>
        </div>
      </div>
    </div>
  );
};
export default Login;
