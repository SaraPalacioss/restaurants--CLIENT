import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../../context/authContext';
import { useRouter } from 'next/router';
import userService from '../../services/user.service';
import MyLayout from "../../layouts/Layout";
import 'bootstrap/dist/css/bootstrap.css'
import { Button } from 'react-bootstrap';

const LoginUser = () => {
  const { user, loggedIn, session, alert, message, userID, setUser, setUserID, setLoggedIn, setSession, setAlert, setMessage } = useAuthContext()
  const router = useRouter();

  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });

  };


  const handleLogin = (e) => {

    e.preventDefault();
    userService
      .login(credentials)
      .then((res) => {
        if (res.username) {
 
          setLoggedIn(true)
          setUser(res.username)
          setSession(true)
          setMessage()
          setAlert(false)
          setUserID(res.id)
          router.push(`/`)

        } else {
          setMessage(res.message)
          setAlert(true)
        }

        console.log(res)

      })
      .catch((err) => {
        console.log(err);
      });
  }


 

  return (
    <div className="container" >

      <div >
        <form onSubmit={handleLogin} className="form form-container form-align">
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








