import { useAuthContext } from '../../context/authContext';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import userService from '../../services/user.service';
import MyLayout from "../../layouts/Layout";
import jwt_decode from "jwt-decode";
import AuthForm from '../../components/AuthForm';
import LoginView from '../../components/LoginView';

const LoginUser = () => {

  
  return (
    <div className="container" >
        <LoginView/>
    </div>
  );
}

LoginUser.Layout = MyLayout
export default LoginUser;








