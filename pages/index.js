import Image from 'next/image'
import { useRouter } from 'next/router';
import { Row } from 'react-bootstrap';
import Link from 'next/link'
import restaurantsService from '../services/restaurants.service'
import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../context/authContext';
import MyLayout from "../layouts/Layout";
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

  const addToMyFavourites = async (restaurantID, userID) => {
     await userService
      .favourites(restaurantID, userID)
      .then((result) => {
        console.log('hola')
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const HEIGHT = 300;
  const WIDTH = 325;


  return (
    <div>
      <div className="gap-2">
      </div>
      <div className="container home">
        <Row xs={1} md={4} className="g-4">
          {restaurants.map((data) => {
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
