import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import MyLayout from "../layouts/Layout";
import 'bootstrap/dist/css/bootstrap.css'
import { useAuthContext } from '../context/authContext';
import { Row } from 'react-bootstrap';
import Image from 'next/image'
import { Button, Spinner } from 'react-bootstrap';
import MyFavouritesView from '../components/MyFavouritesView'
import LoginUserView from '../components/LoginView';

const MyFavourites = () => {

  const { loggedIn } = useAuthContext()

  return (
    <div>
    {loggedIn ? <MyFavouritesView /> : <LoginUserView/>}
    </div>
  )
}


MyFavourites.Layout = MyLayout;

export default MyFavourites;