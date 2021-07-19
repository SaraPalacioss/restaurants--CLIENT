import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import restaurantsService from '../services/restaurants.service'
import MyLayout from "../layouts/Layout";
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css'
import { useAuthContext } from '../context/authContext';
import EditRestaurantForm from '../components/EditRestaurantForm';

const EditRestaurantView = () => {

    const { saveRestaurantNewDetails, restaurantNewDetails } = useAuthContext()

    const router = useRouter();
    const { query: { id } } = router;

    useEffect(() => {

        const loadingDetails = async () => {
            await restaurantsService
                .getRestaurantDetails(id)
                .then((res) => (saveRestaurantNewDetails(res.data)))
                .catch((err) => console.error('error', err));
        }
        loadingDetails();

    }, [id]);

    const onChangeHandler = e => {
        saveRestaurantNewDetails({
            ...restaurantNewDetails,
            [e.target.name]: e.target.value
        });
    };

    const submitNewRestaurantDetails = e => {

        e.preventDefault();

        restaurantsService.editRestaurantDetails(id, restaurantNewDetails)
            .then(
                (data) => {
                    saveRestaurantNewDetails(data)
                    router.push(`/restaurants/${id}`)
                },
                (error) => {
                    console.error(error)
                }
            )
    };


    const closeEdition = (id) => {
        router.push(`/restaurants/${id}`)
    };

    const { name, address, cuisine_type, image, lat, lng, neighborhood, friday, monday, saturday, sunday, thursday, tuesday, wednesday } = restaurantNewDetails
 
    return (
       
        <EditRestaurantForm
            submitMethod={submitNewRestaurantDetails}
            title={`EDIT RESTAURANT`}
            name={name}
            onChangeHandler={onChangeHandler}
            neighborhood={neighborhood}
            address={address}
            cuisine_type={cuisine_type}
            submitBtnText={`Save`}
            closeBtnText={`Close`}
            closeFunction={closeEdition}
            id={id}
        />
    );
}

EditRestaurantView.Layout = MyLayout

export default EditRestaurantView;