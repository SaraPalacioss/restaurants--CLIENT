import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router';
import { signIn, signOut, useSession } from 'next-auth/client';

import styles from '../styles/Home.module.css'
import Link from 'next/link'
import restaurantsService from '../services/restaurants.service'
import axios from 'axios'
import React, { useEffect, useContext, useState } from 'react';
import { useAuthContext } from '../context/authContext';
import userService from '../services/user.service';



const Home = () => {
  const { user, loggedIn, session, setUser, setLoggedIn, setSession } = useAuthContext()

  const router = useRouter();

  const [restaurants, saveRestaurants] = useState([]);
  useEffect(() => {

    const loadingRestaurants = async () => {
      await restaurantsService
        .getAllRestaurants()
        .then((res) => (saveRestaurants(res.data)))
        .catch((err) => console.error('error', err));


    }
    loadingRestaurants();
  }, []);


  const redirectNewRestaurant = () => {


    router.push(`/restaurants/new-restaurant`)




  };


  const checkIfLoggedIn = async () => {
    await userService
      .loggedin()
      .then((result) => {
        setLoggedIn(result);
        setUser(result.data.username)
  });
};


const logOut = async () => {
  await userService
    .logout()
    .then((res) => {
      checkIfLoggedIn()
    })
    .catch((err) => console.error('error', err));


}



const HEIGHT = 300;
const WIDTH = 325;

return (
  <div>
    {user}
    <div>
      <button onClick={() => logOut()}>Log out</button>
    </div>
    <div>
      <button onClick={() => redirectNewRestaurant()}>Add new restaurant</button>
    </div>

    {restaurants.map((data) => {
      return (


        <div key={data._id} params={data._id}>
          <Link href={`/restaurants/${data._id}`}><a>
            {data.image && <Image src={data.image} height={HEIGHT}
              width={WIDTH} alt="restaurant photo" />}

            <div>{data.name}</div>
            <div>{data.neighborhood}</div>
            <div>
              <button onClick={() => addToFavourites(data.id)}>Add to favourites</button>
            </div>
            <div>
              <button onClick={() => checke()}>A</button>
            </div>



          </a>

          </Link>
        </div>

      )

    })}
  </div>
)

}








export default Home;
