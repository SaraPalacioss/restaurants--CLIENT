import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import restaurantsService from '../services/restaurants.service'
import { Button } from 'react-bootstrap';
import MyLayout from "../layouts/Layout";
import 'bootstrap/dist/css/bootstrap.css'
import { useAuthContext } from '../context/authContext';
import userService from '../services/user.service';
import { Row } from 'react-bootstrap';
import Link from 'next/link'
import Image from 'next/image'


const MyFavourites = () => {

  const { user, restaurants, setViewFav, viewFav, loggedIn, session, userID, favourites, setFavourites, setUserID, setUser, setLoggedIn, setSession } = useAuthContext()


  const router = useRouter();



  useEffect(() => {
    const loadingFavDetails = () => {
      restaurantsService
        .getAllRestaurants()
        .then((res) => setViewFav(restaurants.filter((res) => favourites.includes(res._id))))
        .catch((err) => console.error('error', err));
    }


    loadingFavDetails()






  }, []);




  const HEIGHT = 500;
  const WIDTH = 825;


  return (
    <div>
{viewFav.length ?      
      <div className="container home">
        <Row xs={1} md={4} className="g-4">

          {viewFav.map((data) => {
            return (
              <div key={data.id}>
                <a href={`/restaurants/${data._id}`}>
                  {data.image && <Image src={data.image} height={HEIGHT}
                    width={WIDTH} alt="restaurant photo" />}

                  {data.name}
                  {data.address}
                </a>
              </div>
            )
          })}
    
        </Row>
      </div>:<div>There is no favourites.</div>}
    </div>
  )

}


MyFavourites.Layout = MyLayout

export default MyFavourites;