import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuthContext } from '../../context/authContext';
import Image from 'next/image'
import restaurantsService from '../../services/restaurants.service'
import userService from '../../services/user.service';
import { Button } from 'react-bootstrap';
import MyLayout from "../../layouts/Layout";


const RestaurantDetails = () => {
    const { user, getUser, userID, favourites, details, saveDetails } = useAuthContext()


    const router = useRouter();

    const { query: { id } } = router;


    useEffect(() => {
        const loadingDetails = async () => {
            await restaurantsService
                .getRestaurantDetails(id)
                .then((res) => saveDetails(res.data))
                .catch((err) => console.error('error', err));
        }


        loadingDetails();
        // getUser()
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





    const redirectEditRestaurant = (id) => {
        router.push(`/restaurants/${id}/edit-restaurant`)
    };

    const redirectHome = () => {
        router.push(`/`)


    };

    const addFavourite = async (restaurantID, userID) => {

        await userService
            .addFavourite(restaurantID, userID)
            .then((res) => getUser()
            )
            .catch((err) => console.error('error', err));
    }

    const deleteFavourite = async (restaurantID, userID) => {
        await userService
            .deleteFavourite(restaurantID, userID)
            .then((res) => getUser()
            ).catch((err) => console.error('error', err));
    }


    const searchFavourites = (arr, restaurantID) => {
        return arr.includes(restaurantID)
    }

    const favOrNotFavIcon = searchFavourites(favourites, details._id)

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
                {/* <p className="schedule-info">Schedule</p>
                <p className="schedule-data">Monday: {details.operating_hours.monday}</p>
                <p className="schedule-data">Tuesday: {details.operating_hours.tuesday}</p>
                <p className="schedule-data">Wednesday: {details.operating_hours.wednesday}</p>
                <p className="schedule-data">Thursday: {details.operating_hours.thursday}</p>
                <p className="schedule-data">Friday: {details.operating_hours.friday}</p>
                <p className="schedule-data">Saturday: {details.operating_hours.saturday}</p>
                <p className="schedule-data">Sunday: {details.operating_hours.sunday}</p> */}
            </div>

            {user && <div className="btn-group">
                <div>
                    <Button onClick={() => redirectEditRestaurant(id)} variant="success">Edit</Button>
                </div>
                <div>
                    <Button onClick={() => deleteRestaurant(id)} variant="danger">Delete</Button>
                </div>{' '}
                {favOrNotFavIcon ? <Button variant="dark" className="fav-btn" onClick={() => deleteFavourite(details._id, userID)}>Remove favourite</Button> : <Button variant="dark" className="fav-btn" onClick={() => addFavourite(details._id, userID)}>Add favourite</Button>
                }
                <div>
                </div>

                <Button onClick={() => redirectHome()} variant="link">View all restaurants</Button>
               
          
            </div>}




        </div>
    );
}


RestaurantDetails.Layout = MyLayout

export default RestaurantDetails;