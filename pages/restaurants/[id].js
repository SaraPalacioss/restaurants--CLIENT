import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import restaurantsService from '../../services/restaurants.service'
import Image from 'next/image'

import useAuthContext from '../../context/authContext';


const RestaurantDetails = () => {
    useAuthContext();

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

    const redirectEditRestaurant = (id) => {
        router.push(`/restaurants/${id}/edit-restaurant`)
    };


    const redirectHome = () => {
        router.push(`/`)
    };

    const { name, address, cuisine_type, image, lat, lng, neighborhood, Friday, Monday, Saturday, Sunday, Thursday, Tuesday, Wednesday, _id } = details
    const HEIGHT = 300;
    const WIDTH = 325;

    return (
        <div>
            {`${useAuthContext().user}`}

            {name}
            {address}
            {image && <Image src={image} height={HEIGHT}
                width={WIDTH} alt="restaurant photo" />}
            <div>
                <button onClick={() => redirectEditRestaurant(id)}>Edit</button>
            </div>
            <div>
                <button onClick={() => deleteRestaurant(id)}>Delete</button>
            </div>
            <div>
                <button onClick={() => redirectHome()}>View all restaurants</button>
            </div>

        </div>
    );
}

export default RestaurantDetails;