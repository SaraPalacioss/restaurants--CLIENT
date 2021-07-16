import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../../context/authContext';
import { useRouter } from 'next/router';
import userService from '../../services/user.service';
import MyLayout from "../../layouts/Layout";
import 'bootstrap/dist/css/bootstrap.css'
import { Button } from 'react-bootstrap';

const LoginUser = () => {
  const { user, loggedIn, session, setUser, setLoggedIn, setSession } = useAuthContext()
  const router = useRouter();

  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });

  const [alert, setAlert] = useState(false)

  const [message, setMessage] = useState('')

  const handleLogin = (e) => {

    e.preventDefault()
    userService.login(credentials)
      .then(
        (user) => {
        if(user) {
          setAlert(false)
       setLoggedIn(true)
          setUser(user.username)
          router.push("/")
        } else {
          console.log(user)
          return
        }
         

        },
        (error) => {
          console.error(error)

        }
        
      )

  }


  const handleChange = (event) => {
    const { name, value } = event.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });

  };

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


