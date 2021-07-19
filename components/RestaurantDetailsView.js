import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuthContext } from '../context/authContext';
import Image from 'next/image'
import restaurantsService from '../services/restaurants.service'
import userService from '../services/user.service';
import { Button, Spinner } from 'react-bootstrap';
import MyLayout from "../layouts/Layout";
import styled from 'styled-components';


const Div = styled.div`
    display:flex;
    flex-direction: column-reverse;
    justify-content: center;
    align-items: center;
    align-content: center;
    height: 90vh;    
    
    @media (max-width: 350px) {
		width: fit-content;
		font-size: 0.8rem;

		button, label, span {
			font-size: 0.7rem;
		};
    };
`;


const H3 = styled.h3`
    font-weight: bolder;
`;


const DivBtnGroup = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: 20px;

    @media (max-width: 350px) {
	display: flex;
    flex-direction: column;
    justify-content: center;

		button, label, span {
			font-size: 0.7rem;
            width: 100px;
            line-height: 1.5;
            padding: 10;
            margin: 0;  
		};
    };
`;


const RestaurantDetails = () => {

    const { currentUser, getUser, favourites, setFavourites, details, saveDetails } = useAuthContext();

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
                    window.location.href = '/'
                },
                (error) => {
                    console.error(error)
                }
            );
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
    };


    const deleteFavourite = (restaurantID, userID) => {
        userService
            .deleteFavourite(restaurantID, userID)
            .then((res) => getUser(currentUser.id))
            .catch((err) => console.error('error', err));
    };


    const findDuplicates = () => favourites.includes(id)


    const isInFavs = findDuplicates()

    const HEIGHT = 500;
    const WIDTH = 825;


    return (
        <Div className="container">
            {details ?
                <div>
                    <H3>{details.name}</H3>

                    {details.image && <Image src={details.image} height={HEIGHT}
                        width={WIDTH} alt="restaurant photo" />}

                    <address><strong>{details.address}</strong></address>

                    <p>{details.neighborhood}</p>

                    <p>Cuisine type {details.cuisine_type}</p>

                    {currentUser.id 
                    
                    && <DivBtnGroup>
                        <div>
                            <Button onClick={() => redirectEditRestaurant(id)} variant="success">Edit</Button>
                        </div>{' '}
                        <div>
                            <Button onClick={() => deleteRestaurant(id)} variant="danger">Delete</Button>
                        </div>{' '}
                        {isInFavs && <Button variant="dark" onClick={() => deleteFavourite(details._id, currentUser.id)}>Remove favourite</Button>}
                        {!isInFavs && <Button variant="dark" onClick={() => addFavourite(details._id, currentUser.id)}>Add favourite</Button>
                        }
                        <Button onClick={() => redirectHome()} variant="link">View all restaurants</Button>
                    </DivBtnGroup>
                    }</div> 
                    
                    : <Button variant="light" disabled>
                    
                    <Spinner
                        as="span"
                        animation="grow"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                    />
                    Loading...
                </Button>}
        </Div>
    );
};


RestaurantDetails.Layout = MyLayout;

export default RestaurantDetails;