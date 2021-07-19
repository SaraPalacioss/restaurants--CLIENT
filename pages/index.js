import Image from 'next/image'
import React, { useEffect, useState } from 'react';
import restaurantsService from '../services/restaurants.service';

import { useRouter } from 'next/router';
import { Row } from 'react-bootstrap';
import Link from 'next/link'
import { useAuthContext } from '../context/authContext';
import MyLayout from "../layouts/Layout";
import { Button, Spinner } from 'react-bootstrap';




const Home = () => {

  const { user, restaurants, getUser, loggedIn } = useAuthContext()
  const [restaurantsInfo, setRestaurantsInfo] = useState('')

  const router = useRouter();

  useEffect(() => {

    const loadingRestaurants = async () => {
      await restaurantsService
        .getAllRestaurants()
        .then((res) => (setRestaurantsInfo(res.data)))
        .catch((err) => console.error('error', err));
    }
    loadingRestaurants()

  }, []);


  const redirectNewRestaurant = () => {
    router.push(`/restaurants/new-restaurant`)
  };



  const HEIGHT = 300;
  const WIDTH = 325;

  return (

  
  
        <div>
          <div className="container home">
            {loggedIn &&
              <Button variant="primary" size="sm" onClick={() => redirectNewRestaurant()}>
                Add new restaurant
              </Button>
            }
            {restaurants.length ? <Row xs={1} md={4} className="g-4">
              {restaurants.map((data) => {
                return (
                  <div key={data._id} params={data._id}>
                    <a href={`/restaurants/${data._id}`}><a>
                      {data.image && <Image src={data.image} height={HEIGHT}
                        width={WIDTH} alt="restaurant photo" />}
                      <div className="align-info">
                        <h2>{data.name}</h2>
                        <div>
                          <span>{data.neighborhood}</span>
                        </div>
                      </div></a>
                    </a>
                  </div>
                )
              })}
            </Row> : <Button variant="light" disabled>
              <Spinner
                as="span"
                animation="grow"
                size="sm"
                role="status"
                aria-hidden="true"
              />
              Loading...
            </Button>}
          </div>
        </div>


  )
}


Home.Layout = MyLayout

export default Home;
