import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import restaurantsService from '../../../services/restaurants.service'


const EditRestaurant = () => {

    const router = useRouter();
    const { query: { id } } = router;


    const [restaurantNewDetails, saveRestaurantNewDetails] = useState({
        name: '',
        neighborhood: '',
        address: '',
        lat: '',
        lng: '',
        image: '',
        cuisine_type: '',
        monday: '',
        tuesday: '',
        wednesday: '',
        thursday: '',
        friday: '',
        saturday: '',
        sunday: '',
    });



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


    }


    const closeEdition = (id) => {


        router.push(`/restaurants/${id}`)




    };



    const { name, address, cuisine_type, photograph, lat, lng, neighborhood, friday, monday, saturday, sunday, thursday, tuesday, wednesday } = restaurantNewDetails
    const HEIGHT = 300;
    const WIDTH = 325;
    return (

        <div>

            <form onSubmit={submitNewRestaurantDetails}>

                <div >
                    <label>Name: </label>
                    <input
                        type="text"
                        name="name"
                        value={name}
                        placeholder="Name"
                        onChange={onChangeHandler}
                    />
                    <label>neighborhood: </label>
                    <input
                        type="text"
                        name="neighborhood"
                        value={neighborhood}
                        placeholder="neighborhood"
                        onChange={onChangeHandler}
                    />
                    <label>photo: </label>
                    <input
                        type="text"
                        name="photograph"
                        value={photograph}
                        placeholder="Photograph"
                        onChange={onChangeHandler}
                    />
                    <label>Address: </label>
                    <input
                        type="text"
                        name="address"
                        value={address}
                        placeholder="Address"
                        onChange={onChangeHandler}
                    />
                    <label>lat: </label>
                    <input
                        type="number"
                        name="lat"
                        value={lat}
                        placeholder="Lat"
                        onChange={onChangeHandler}
                    />
                    <label>Lng: </label>
                    <input
                        type="number"
                        name="lng"
                        value={lng}
                        placeholder="Lng"
                        onChange={onChangeHandler}
                    />
                    <label>Cuisine Type: </label>
                    <input
                        type="text"
                        name="cuisine_type"
                        value={cuisine_type}
                        placeholder="Cuisine_type"
                        onChange={onChangeHandler}
                    />
                    <label>Monday: </label>
                    <input
                        type="text"
                        name="monday"
                        value={monday}
                        placeholder="Monday"
                        onChange={onChangeHandler}
                    />
                    <label>Tuesday: </label>
                    <input
                        type="text"
                        name="tuesday"
                        value={tuesday}
                        placeholder="Name"
                        onChange={onChangeHandler}
                    />
                    <label>Wednesday: </label>
                    <input
                        type="text"
                        name="wednesday"
                        value={wednesday}
                        placeholder="wednesday"
                        onChange={onChangeHandler}
                    />
                    <label>Thursday: </label>
                    <input
                        type="text"
                        name="thursday"
                        value={thursday}
                        placeholder="thursday"
                        onChange={onChangeHandler}
                    />
                    <label>Friday: </label>
                    <input
                        type="text"
                        name="friday"
                        value={friday}
                        placeholder="friday"
                        onChange={onChangeHandler}
                    />
                    <label>Saturday: </label>
                    <input
                        type="text"
                        name="saturday"
                        value={saturday}
                        placeholder="Saturdar"
                        onChange={onChangeHandler}
                    />
                    <label>Sunday: </label>
                    <input
                        type="text"
                        name="sunday"
                        value={sunday}
                        placeholder="sunday"
                        onChange={onChangeHandler}
                    />
                </div>
                <div>
                    <button type="submit">Save</button>
                </div>
                <div>
                    <button onClick={() => closeEdition(id)}>Close</button>
                </div>

            </form>

        </div>

    );
}

export default EditRestaurant;