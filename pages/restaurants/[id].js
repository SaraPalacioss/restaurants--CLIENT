import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuthContext } from '../../context/authContext';
import Image from 'next/image'
import restaurantsService from '../../services/restaurants.service'
import userService from '../../services/user.service';
import { Button } from 'react-bootstrap';
import MyLayout from "../../layouts/Layout";


const RestaurantDetails = () => {
    const { user, currentUser, getUser, authToken, userID, favourites, setFavourites, details, saveDetails } = useAuthContext()


    const router = useRouter();

    const { query: { id } } = router;



    useEffect(() => {
        getUser(currentUser.id)


        const loadingDetails = async () => {
            await restaurantsService
                .getRestaurantDetails(id)
                .then((res) => saveDetails(res.data))
                .catch((err) => console.error('error', err));
        }

        loadingDetails();

        // const getUser = (id) => {
        //     userService
        //         .getUser(id)

        //         .then((res) => setFavourites(res.favourites))
        //         .catch((err) => console.error('error', err));
        // }

        //  getUser( currentUser.id)

        // const isLoggedIn = () => {
        //     userService
        //         .loggedIn()
        //         .then((res) => {
        //             console.log(res)
        //             console.log(window.localStorage.token)

        //         }

        //         )
        //         .catch((err) => console.error('error', err));
        // }


        // setFavOrNotFavIcon(searchFavourites(favourites, details._id))


    }, [id]);





    const deleteRestaurant = async (id) => {
        await restaurantsService.deleteRestaurant(id)
            .then(
                () => {
                    getUser(currentUser.id);
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

    const addFavourite = (restaurantID, userID) => {

        userService
            .addFavourite(restaurantID, userID)
            .then((res) => {
                console.log(res);
                getUser(currentUser.id);

            }
            )
            .catch((err) => console.error('error', err));
    }

    const deleteFavourite = (restaurantID, userID) => {
        userService
            .deleteFavourite(restaurantID, userID)
            .then((res) => {

                getUser(currentUser.id);
                console.log(res)

            }
            ).catch((err) => console.error('error', err));
    }


    const findDuplicates = () => favourites.includes(id)

    const isInFavs = findDuplicates()



    const HEIGHT = 500;
    const WIDTH = 825;



    return (

        <div className="container home">

            <Button onClick={() => getUser(currentUser.id)} variant="success">user</Button>

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

            {currentUser.id && <div className="btn-group">
                <div>
                    <Button onClick={() => redirectEditRestaurant(id)} variant="success">Edit</Button>
                </div>
                <div>
                    <Button onClick={() => deleteRestaurant(id)} variant="danger">Delete</Button>
                </div>{' '}

                {isInFavs && <Button variant="dark" className="fav-btn" onClick={() => deleteFavourite(details._id, currentUser.id)}>Remove favourite</Button>}
                {!isInFavs && <Button variant="dark" className="fav-btn" onClick={() => addFavourite(details._id, currentUser.id)}>Add favourite</Button>
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