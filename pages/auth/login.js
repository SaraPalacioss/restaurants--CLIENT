import { useAuthContext } from '../../context/authContext';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import userService from '../../services/user.service';
import MyLayout from "../../layouts/Layout";
import 'bootstrap/dist/css/bootstrap.css'
import { Button } from 'react-bootstrap';
import Link from 'next/link'
import jwt_decode from "jwt-decode";

const LoginUser = () => {

  const { setAlert, setLoggedIn, setCurrentUser, setAuthToken, setMessage, message, credentials, setCredentials } = useAuthContext()
  
  const router = useRouter();

  const handleChange = e => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });

  };

  useEffect(function () {
    console.log(window.localStorage);
  }, []);

  const handleLogin = (e) => {

    e.preventDefault();
    userService
      .login(credentials)
      .then((res) => {
        setMessage(res.message)
        const { token } = res.token;
        localStorage.setItem("jwtToken", res.token);
        setAuthToken(res.token);
        const decoded = jwt_decode(res.token);
        setCurrentUser(decoded);
        setLoggedIn(true)
        setCredentials({})
        setMessage()
        setAlert(false)
        router.push(`/`)
        setMessage(res.message)
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="container" >
      <div>
        <form onSubmit={handleLogin} className="form form-container form-align">
          <span>{message}</span>
          <div>
            <label htmlFor="Username">Username</label>
            <input
              onChange={handleChange}
              value={credentials.username}
              name="username"
              id="username"
              type="email"
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              onChange={handleChange}
              value={credentials.password}
              id="password"
              type="password"
              name="password"
            />
          </div>
          <span>Don't have an account? register <Link href="/auth/register">here</Link></span>
          <div className="btn-group">
            <Button variant="light"
              type="submit"
            >
              Login
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

LoginUser.Layout = MyLayout
export default LoginUser;








