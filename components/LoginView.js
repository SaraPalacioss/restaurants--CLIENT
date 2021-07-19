import { useAuthContext } from '../context/authContext';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import userService from '../services/user.service';
import MyLayout from "../layouts/Layout";
import jwt_decode from "jwt-decode";
import AuthForm from '../components/AuthForm';

const LoginUserView = () => {

  const { setAlert, loggedIn, setLoggedIn, setCurrentUser, setAuthToken, setMessage, message, credentials, setCredentials } = useAuthContext()
  
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
       {!loggedIn ? <AuthForm
           username={credentials.username}
           password= {credentials.password}
           message={message}
           handleChange={handleChange}
           submitMethod={handleLogin}
           spaninfo={`Don't have an account? register `}
           spanlink={`here`}
           href={`/auth/register`}
           textButton={`Login`}
        /> : <p>Hey dude! you are already login here 😎</p>} 
    </div>
  );
}

LoginUserView.Layout = MyLayout
export default LoginUserView;








