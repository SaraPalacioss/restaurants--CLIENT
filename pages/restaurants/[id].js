import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuthContext } from '../../context/authContext';
import Image from 'next/image'
import restaurantsService from '../../services/restaurants.service'
import userService from '../../services/user.service';
import { Button } from 'react-bootstrap';
import MyLayout from "../../layouts/Layout";


const RestaurantDetails = () => {
    const { user, loggedIn,session, userID, setUserID, setUser, setLoggedIn, setSession} =useAuthContext()

    const [details, saveDetails] = useState({});

    const router = useRouter();

    const { query: { id } } = router;

    useEffect(() => {
        const loadingDetails = async () => {
            await restaurantsService
                .getRestaurantDetails(id)
                .then((res) => (saveDetails(res.data)))
                .catch((err) => console.error('error', err));
        }
        loadingDetails();
    }, [id]);

    const deleteRestaurant = async (id) => {
        await restaurantsService.deleteRestaurant(id)
            .then(
                () => {
                    console.log(`Restaurant with id: ${id} deleted`)
                    router.push('/')
                },
                (error) => {
                    console.error(error)
                }
            )
    };


    const addToMyFavourites =  (userID) => {
         userService
         .favourites(userID)
         .then((result) => {
           console.log('hola')
         })
         .catch((err) => {
           console.log(err);
         });
     };

     
    const redirectEditRestaurant = (id) => {
        router.push(`/restaurants/${id}/edit-restaurant`)
    };

    const redirectHome = () => {
        router.push(`/`)
        const loadingRestaurants = async () => {
            await restaurantsService
              .getAllRestaurants()
              .then((res) => (saveRestaurants(res.data)))
              .catch((err) => console.error('error', err));
          }
          loadingRestaurants();
    };

    
    const HEIGHT = 500;
    const WIDTH = 825;


    return (
        <div className="container home">

           <h3>{details.name}</h3> 
           <div>
           {details.image && <Image src={details.image} height={HEIGHT}
                width={WIDTH} alt="restaurant photo" />}
           </div>
            <p className="info"><strong>{details.address}</strong></p>
            <span>{details.neighborhood}</span>
            <p>Cuisine type {details.cuisine_type}</p>
            <div>
            <p className="schedule-info">Schedule</p>
            <p className="schedule-data">Monday: {details.monday}</p>
            <p className="schedule-data">Tuesday: {details.tuesday}</p>
            <p className="schedule-data">Wednesday: {details.wednesday}</p>
            <p className="schedule-data">Thursday: {details.thursday}</p>
            <p className="schedule-data">Friday: {details.friday}</p>
            <p className="schedule-data">Saturday: {details.saturday}</p>
            <p className="schedule-data">Sunday: {details.sunday}</p>
            </div>
     
          {loggedIn && <div  className="btn-group">
           <div>
                <Button onClick={() => redirectEditRestaurant(id)} variant="success">Edit</Button>
            </div>
            <div>
                <Button onClick={() => deleteRestaurant(id)} variant="danger">Delete</Button>
            </div>{' '}
            <div>
            </div>
         <Button variant="dark" className="fav-btn" onClick={() => addToMyFavourites(id)}>♡</Button>
         <Button onClick={() => redirectHome()} variant="link">View all restaurants</Button>
{console.log(userID)}
           </div>} 
            


            

        </div>
    );
}


RestaurantDetails.Layout = MyLayout

export default RestaurantDetails;