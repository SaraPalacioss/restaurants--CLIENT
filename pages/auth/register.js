

import { useSession } from 'next-auth/client';
import { useAuthContext } from '../../context/authContext';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import userService from '../../services/user.service';
import { Button } from 'react-bootstrap';
import MyLayout from "../../layouts/Layout";


const RegisterUser = () => {
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

  const handleSignUp = e => {
    e.preventDefault()
    userService
    .register(credentials)
    .then((res) => {
      if (res.username) {
        setMessage()
        setAlert(false)
        router.push(`/auth/login`)

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
      <div>
        <form noValidate onSubmit={handleSignUp} className="form form-container form-align">
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
            <Button variant="primary"
              type="submit"
            >
              Register
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

RegisterUser.Layout = MyLayout


export default RegisterUser;







// const validators = {
// 	username: (value) => {
// 		let message;
// 		if (!value) message = 'Username is required';
// 		return message;
// 	},
// 	password: (value) => {
// 		let message;
// 		if (!value) message = 'Password is required';
// 		else if (value.length < 6) message = 'Password must be longer than 6 characters';
// 		return message;
// 	},
// };


