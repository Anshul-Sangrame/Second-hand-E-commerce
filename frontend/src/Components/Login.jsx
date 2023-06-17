import React, { useState } from "react";
import profile from "./images/loginp.png";
import userImg from "./images/loginu.png";
import passwordImg from "./images/loginpa.png";
import './Style/login.css'
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [cred, setCred] = useState({
    username: '',
    password: ''
  });

  const nav = useNavigate();

  const handleChange = (e) => {
    setCred({
      ...cred,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const body = cred
      const res = await fetch('http://localhost:5000/login', {
        method: 'post',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (res.ok) {
        const data = await res.json();
        sessionStorage.setItem('token', data.token);
        nav('/home');
        return;
      }
      else {
        const errType = await res.json()
        console.log(errType.msg)
      }
    } catch (err) {
      console.error(err.message)
    }
  }

  return (
    <div className="main">
      <div className="sub-main">
        <div>
          <div className="imgs">
            <div className="container-image">
              <img src={profile} alt="profile" className="profile" />

            </div>
          </div>
          <div>
            <h1>Login to your account</h1>
            <div>
              <img src={userImg} alt="user" className="user" />
              <input type="text" onChange={handleChange} value={cred.username} name="username" placeholder="user-name" className="name" />
            </div>
            <div>
              <img src={passwordImg} alt="password" className="password" />
              <input type="password" onChange={handleChange} value={cred.password} name="password" placeholder="Password" className="name" />
            </div>
            <button onClick={handleSubmit} className="login-button">Login</button>
          </div>
          <p className="link">
            <a href="#">Forgot password ?</a> Or<Link to='/signUp'>Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};
export default Login;
