import Image from 'next/image'
import React, { useContext, useState, useEffect, createContext } from 'react';

import { useRouter } from 'next/router';
import { Row } from 'react-bootstrap';
import Link from 'next/link'
import restaurantsService from '../services/restaurants.service'
import { useAuthContext } from '../context/authContext';
import MyLayout from "../layouts/Layout";
import userService from '../services/user.service';
import { Button } from 'react-bootstrap';


const Home = () => {

  const { user, userID, loggedIn, session, restaurants, setRestaurants, allRestaurants, favourites, filterFavs, setFilterFavs, setAllRestaurants, setFavourites, setUser, setUserID, setLoggedIn, setSession } = useAuthContext()

  const router = useRouter();


  const getUser = async () => {
    await userService
      .loggedin()
      .then((res) => {setFavourites(res.favourites); setUser(res.username); setUserID(res.id)})
      .catch((err) => console.error('error', err));
  }



  useEffect(() => {

    const loadingRestaurants = async () => {
      await restaurantsService
        .getAllRestaurants()
        .then((res) => (setAllRestaurants(res.data)))
        .catch((err) => console.error('error', err));
    }

    loadingRestaurants();
    getUser()
  }, []);

  const redirectNewRestaurant = () => {
    router.push(`/restaurants/new-restaurant`)
};

  const HEIGHT = 300;
  const WIDTH = 325;

  return (
    <div>
      
      <div className="container home">
      {/* {user && !filterFavs ? (<Button variant="danger" size="sm" onClick={() => {setFilterFavs(true),filterr()}}>
                                View favourites
                            </Button>): (<Button variant="danger" size="sm" onClick={() => {setFilterFavs(false), setRestaurants(allRestaurants)}}>
                                View all
                            </Button>)} */}
                            {user && <Button variant="primary" size="sm" onClick={() => redirectNewRestaurant()}>
                                Add new restaurant
                            </Button>}
        <Row xs={1} md={4} className="g-4">
          {restaurants.map((data) => {
            console.log(data)
            return (
              <div key={data._id} params={data._id}>
                <Link href={`/restaurants/${data._id}`}><a>
                  {data.image && <Image src={data.image} height={HEIGHT}
                    width={WIDTH} alt="restaurant photo" />}
                </a></Link>

  

                <div className="align-info">
                  <Link href={`/restaurants/${data._id}`}><a>
                    <h2>{data.name}</h2>
                    <div>
                      <span>{data.neighborhood}</span>
                    </div>
                  </a></Link>

                </div>


              </div>
            )
          })}
        </Row>
      </div>
    </div>
  )
}


Home.Layout = MyLayout

export default Home;
