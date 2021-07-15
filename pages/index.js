import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router';
import useAuthContext, { useAppContext } from '../context/authContext';

import styles from '../styles/Home.module.css'
import Link from 'next/link'
import restaurantsService from '../services/restaurants.service'
import axios from 'axios'
import React, { useEffect, useContext, useState } from 'react';

// export async function getStaticProps() {
//   let restaurants = [];

//   await restaurantsService
//     .getAllRestaurants()
//     .then((res) => (restaurants = res.data))
//     .catch((err) => console.error('error', err));

//   if (!restaurants) {
//     return {
//       notFound: true,
//     };
//   }

//   return {
//     props: {
//       restaurants,
//     },
//   };
// }




const Home = () => {

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


  const redirectNewRestaurant= ()=> {


    router.push(`/restaurants/new-restaurant`)




};


  const HEIGHT = 300;
  const WIDTH = 325;

  return (
    <div> 
    
    <div>
            <button onClick={()=>redirectNewRestaurant()}>Add new restaurant</button>
        </div>
   
      {restaurants.map((data) => {
        return (


          <div key={data._id} params={data._id}>
            <Link href={`/restaurants/${data._id}`}><a>
{data.image &&     <Image src={data.image} height={HEIGHT}
                width={WIDTH} alt="restaurant photo" />}
        
              <div>{data.name}</div>
              <div>{data.neighborhood}</div>
              <div>
            <button onClick={()=>addToFavourites(data.id)}>Add to favourites</button>
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
