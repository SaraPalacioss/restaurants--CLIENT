import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import restaurantsService from '../../../services/restaurants.service'
import MyLayout from "../../../layouts/Layout";
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css'
import { useAuthContext } from '../../../context/authContext';


const EditRestaurant = () => {

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

    const HEIGHT = 300;
    const WIDTH = 325;

    return (
        <div className="container">
            <form onSubmit={submitNewRestaurantDetails} className="form form-container form-align">
                <h3>EDIT RESTAURANT</h3>
                <div >
                    <div>
                        <label>Name: </label>
                        <input
                            type="text"
                            name="name"
                            value={name}
                            placeholder="Name"
                            onChange={onChangeHandler}
                        />
                    </div>
                    <div>
                        <label>neighborhood: </label>
                        <input
                            type="text"
                            name="neighborhood"
                            value={neighborhood}
                            placeholder="neighborhood"
                            onChange={onChangeHandler}
                        />
                    </div>
                    <div>
                        <label>Image: </label>
                        <input
                            type="text"
                            name="image"
                            value={image}
                            placeholder="Image"
                            onChange={onChangeHandler}
                        />
                    </div>
                    <div>
                        <label>Address: </label>
                        <input
                            type="text"
                            name="address"
                            value={address}
                            placeholder="Address"
                            onChange={onChangeHandler}
                        />
                    </div>
                    <div>
                        <label>lat: </label>
                        <input
                            type="number"
                            name="lat"
                            value={lat}
                            placeholder="Lat"
                            onChange={onChangeHandler}
                        />
                    </div>
                    <div>
                        <label>Lng: </label>
                        <input
                            type="number"
                            name="lng"
                            value={lng}
                            placeholder="Lng"
                            onChange={onChangeHandler}
                        />
                    </div>
                    <div>
                        <label>Cuisine Type: </label>
                        <input
                            type="text"
                            name="cuisine_type"
                            value={cuisine_type}
                            placeholder="Cuisine_type"
                            onChange={onChangeHandler}
                        />
                    </div>
                    <p className="schedule">Schedule:</p>
                    <div>
                        <label>Monday: </label>
                        <input
                            type="text"
                            name="monday"
                            value={monday}
                            placeholder="Monday"
                            onChange={onChangeHandler}
                        />
                    </div>
                    <div>
                        <label>Tuesday: </label>
                        <input
                            type="text"
                            name="tuesday"
                            value={tuesday}
                            placeholder="Name"
                            onChange={onChangeHandler}
                        />
                    </div>
                    <div>
                        <label>Wednesday: </label>
                        <input
                            type="text"
                            name="wednesday"
                            value={wednesday}
                            placeholder="wednesday"
                            onChange={onChangeHandler}
                        />
                    </div>
                    <div>
                        <label>Thursday: </label>
                        <input
                            type="text"
                            name="thursday"
                            value={thursday}
                            placeholder="thursday"
                            onChange={onChangeHandler}
                        />
                    </div>
                    <div>
                        <label>Friday: </label>
                        <input
                            type="text"
                            name="friday"
                            value={friday}
                            placeholder="friday"
                            onChange={onChangeHandler}
                        />
                    </div>
                    <div>
                        <label>Saturday: </label>
                        <input
                            type="text"
                            name="saturday"
                            value={saturday}
                            placeholder="Saturdar"
                            onChange={onChangeHandler}
                        />
                    </div>
                    <div>
                        <label>Sunday: </label>
                        <input
                            type="text"
                            name="sunday"
                            value={sunday}
                            placeholder="sunday"
                            onChange={onChangeHandler}
                        />
                    </div>
                </div>
                <div className="btn-group">
                    <div >
                        <Button type="submit" variant="success">Save</Button>{' '}
                    </div>
                    <div>
                        <Button variant="light" onClick={() => closeEdition(id)}>Close</Button>
                    </div>
                </div>
            </form>
        </div>
    );
}

EditRestaurant.Layout = MyLayout

export default EditRestaurant;