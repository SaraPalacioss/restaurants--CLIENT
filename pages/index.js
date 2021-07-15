import Head from 'next/head'
import Image from 'next/image'
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
  const [restaurants, saveRestaurants] = useState([]);
  const [name, saveName] = useState('');
  const [neighborhood, saveNeighborhood] = useState('')
  const [photograph, savePhotograph] = useState('')
  const [address, saveAddress] = useState('')
  const [lat, saveLat] = useState('')
  const [lng, saveLng] = useState('')
  const [image, saveImage] = useState('')
  const [cuisine_type, saveCuisineType] = useState('')
  const [monday, saveMonday] = useState('')
  const [tuesday, saveTuesday] = useState('')
  const [wednesday, saveWednesday] = useState('')
  const [thursday, saveThursday] = useState('')
  const [friday, saveFriday] = useState('')
  const [saturday, saveSaturday] = useState('')
  const [sunday, saveSunday] = useState('')

  useEffect(() => {

    const loadingRestaurants = async () => {
      await restaurantsService
        .getAllRestaurants()
        .then((res) => (saveRestaurants(res.data)))
        .catch((err) => console.error('error', err));


    }
    loadingRestaurants();
  }, []);

  const addNewRestaurant = (team) =>{
    const createNewRestaurant = async () => {
      await restaurantsService
        .addNewRestaurant(team)
        .then((res) => console.log(res.data))
        .catch((err) => console.error('error', err));


    }
    createNewRestaurant()
  }

  const submitNewRestaurant = (e) => {
    e.preventDefault();

    // if (nameAndLastName.trim() === "" || position.trim() === "" || bio.trim() === "") {
    //   document.getElementById("alertData").innerHTML =
    //     "All fields are mandatory";
    //   return null;
    // };

    // if (nameAndLastName.length > 100) {
    //   document.getElementById("alertNameAndLastName").innerHTML =
    //     "50 maximun character limit exceeded";
    //   return null;
    // };

    // if (position.length > 50) {
    //   document.getElementById("alertPosition").innerHTML =
    //     "50 maximun character limit exceeded";
    //   return null;
    // };

    // if (bio.length > 200) {
    //   document.getElementById("alertBio").innerHTML =
    //     "200 maximun character limit exceeded";
    //   return null;
    // };


    addNewRestaurant({
      name,
      neighborhood,
      // photograph,
      // address,
      // lat,
      // lng,
      // image,
      // cuisine_type,
      // // monday,
      // // tuesday,
      // // wednesday,
      // // thursday,
      // // friday,
      // // saturday,
      // // sunday,
    });

    // showForm(false);
    // saveNameAndLastName('')
    // savePosition('')
    // saveBio('')
    // savePicture('')
    // savePictureId('')
    console.log('saving')
  };

  const HEIGHT = 200;
  const WIDTH = 225;

  return (
    <div> 
    
 
      {/* <div>
    
          <form onSubmit={submitNewRestaurant}>
       
            <div >
              <label>Name: </label>
              <input
                type="text"
                name="name"
                value={name}
                placeholder="Name"
                onChange={(e) => saveName(e.target.value)}
              />
            <label>neighborhood: </label>
              <input
                type="text"
                name="neighborhood"
                value={neighborhood}
                placeholder="neighborhood"
                onChange={(e) => saveNeighborhood(e.target.value)}
              />
                    {/* <label>photo: </label>
              <input
                type="text"
                name="photograph"
                value={photograph}
                placeholder="Photograph"
                onChange={(e) => savePhotograph(e.target.value)}
              />
                    <label>Address: </label>
              <input
                type="text"
                name="address"
                value={address}
                placeholder="Address"
                onChange={(e) => saveAddress(e.target.value)}
              />
                    <label>lat: </label>
              <input
                type="number"
                name="lat"
                value={lat}
                placeholder="Lat"
                onChange={(e) => saveLat(e.target.value)}
              />
                    <label>Lng: </label>
              <input
                type="number"
                name="lng"
                value={lng}
                placeholder="Lng"
                onChange={(e) => saveLng(e.target.value)}
              />
                    <label>Cuisine Type: </label>
              <input
                type="text"
                name="cuisine_type"
                value={cuisine_type}
                placeholder="Cuisine_type"
                onChange={(e) => saveCuisineType(e.target.value)}
              />
                    <label>Monday: </label>
              <input
                type="text"
                name="monday"
                value={monday}
                placeholder="Monday"
                onChange={(e) => saveMonday(e.target.value)}
              />
                <label>Tuesday: </label>
              <input
                type="text"
                name="tuesday"
                value={tuesday}
                placeholder="Name"
                onChange={(e) => saveTuesday(e.target.value)}
              />
                <label>Wednesday: </label>
              <input
                type="text"
                name="wednesday"
                value={wednesday}
                placeholder="wednesday"
                onChange={(e) => saveWednesday(e.target.value)}
              />
                <label>Thursday: </label>
              <input
                type="text"
                name="thursday"
                value={thursday}
                placeholder="thursday"
                onChange={(e) => saveThursday(e.target.value)}
              />
                <label>Friday: </label>
              <input
                type="text"
                name="friday"
                value={friday}
                placeholder="friday"
                onChange={(e) => saveFriday(e.target.value)}
              />
                <label>Saturday: </label>
              <input
                type="text"
                name="saturday"
                value={saturday}
                placeholder="Saturdar"
                onChange={(e) => saveSaturday(e.target.value)}
              />
                <label>Sunday: </label>
              <input
                type="text"
                name="sunday"
                value={sunday}
                placeholder="sunday"
                onChange={(e) => saveSunday(e.target.value)}
              /> */}
          {/* //   </div>
          //   <div className="navigation">
          //     <button type="submit">Save</button>
          //   </div>
          // </form>
          // </div> */} 
   
 
      {console.log(restaurants)}
      {restaurants.map((data) => {
        return (


          <div key={data._id} params={data._id}>
            <Link href={`/restaurants/${data._id}`}><a>
            {console.log(data)}
{data.image &&     <Image src={data.image} height={HEIGHT}
                width={WIDTH} alt="restaurant photo" />}
        
              <div>{data.name}</div>
              <div>{data.neighborhood}</div>

             

            </a>

            </Link>
          </div>

        )

      })}
    </div>
  )

}








export default Home;
