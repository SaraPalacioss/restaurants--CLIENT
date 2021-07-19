import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuthContext } from '../../context/authContext';
import Image from 'next/image'
import restaurantsService from '../../services/restaurants.service'
import userService from '../../services/user.service';
import { Button, Spinner } from 'react-bootstrap';
import MyLayout from "../../layouts/Layout";


const RestaurantDetails = () => {

    const { currentUser, getUser, favourites, setFavourites, details, saveDetails } = useAuthContext()

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
    }, [id]);


    const deleteRestaurant = async (id) => {
        await restaurantsService.deleteRestaurant(id)
            .then(
                () => {
                    getUser(currentUser.id);
                    console.log(`Restaurant with id: ${id} deleted`)
                    window.location.href = '/'
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
            .then((res) => getUser(currentUser.id))
            .catch((err) => console.error('error', err));
    }

    const deleteFavourite = (restaurantID, userID) => {
        userService
            .deleteFavourite(restaurantID, userID)
            .then((res) => getUser(currentUser.id))
            .catch((err) => console.error('error', err));
    }

    const findDuplicates = () => favourites.includes(id)

    const isInFavs = findDuplicates()


    const HEIGHT = 500;
    const WIDTH = 825;


    return (
        <div className="container home">
        {details ?    <div>      <h3>{details.name}</h3>
            <div>
                {details.image && <Image src={details.image} height={HEIGHT}
                    width={WIDTH} alt="restaurant photo" />}
            </div>
            <address className="info"><strong>{details.address}</strong></address>
            <span>{details.neighborhood}</span>
            <p>Cuisine type {details.cuisine_type}</p>
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
            </div>}</div>: <Button variant="light" disabled>
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
    );
}


RestaurantDetails.Layout = MyLayout

export default RestaurantDetails;