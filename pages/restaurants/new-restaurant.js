import React, { useState } from 'react';
import { useRouter } from 'next/router';
import restaurantsService from '../../services/restaurants.service'
import { Button } from 'react-bootstrap';
import { useAuthContext } from '../../context/authContext'
import MyLayout from "../../layouts/Layout";
import 'bootstrap/dist/css/bootstrap.css'


const NewResturant = () => {

        const { user, loggedIn,session, userID, setUserID, setUser, setLoggedIn, setSession} =useAuthContext()

    const router = useRouter();
    const [name, saveName] = useState('');
    const [neighborhood, saveNeighborhood] = useState('')
    const [image, saveImage] = useState('')
    const [address, saveAddress] = useState('')
    const [lat, saveLat] = useState('')
    const [lng, saveLng] = useState('')
    const [cuisine_type, saveCuisineType] = useState('')
    const [monday, saveMonday] = useState('')
    const [tuesday, saveTuesday] = useState('')
    const [wednesday, saveWednesday] = useState('')
    const [thursday, saveThursday] = useState('')
    const [friday, saveFriday] = useState('')
    const [saturday, saveSaturday] = useState('')
    const [sunday, saveSunday] = useState('')

    const addNewRestaurant = async (restaurant) => {
        await restaurantsService
            .addNewRestaurant(restaurant)
            .then((res) => console.log(res.data))
            .catch((err) => console.error('error', err));
    }
    const loadingRestaurants = async () => {
        await restaurantsService
          .getAllRestaurants()
          .then((res) => console.log(res))
          .catch((err) => console.error('error', err));
      }
      loadingRestaurants();

    const submitNewRestaurant = (e) => {
        e.preventDefault();
        addNewRestaurant({
            name,
            neighborhood,
            image,
            address,
            lat,
            lng,
            cuisine_type,
            monday,
            tuesday,
            wednesday,
            thursday,
            friday,
            saturday,
            sunday,
        });
        loadingRestaurants();

        router.push(`/`)
    };

    const closeNewRestaurant = (id) => {
        router.push(`/`)
    };

    return (
        <div className="container">
{user ?      
<div>
    <form onSubmit={submitNewRestaurant} className="form form-container form-align">
        <h3>NEW RESTAURANT</h3>
        <div>
            <div>
                <label>Name: </label>
                <input
                    type="text"
                    name="name"
                    value={name}
                    placeholder="Name"
                    onChange={(e) => saveName(e.target.value)}
                />
            </div>
            <div>
                <label>Neighborhood: </label>
                <input
                    type="text"
                    name="neighborhood"
                    value={neighborhood}
                    placeholder="neighborhood"
                    onChange={(e) => saveNeighborhood(e.target.value)}
                />
            </div>
            <div>
                <label>Image: </label>
                <input
                    type="text"
                    name="image"
                    value={image}
                    placeholder="image"
                    onChange={(e) => saveImage(e.target.value)}
                />
            </div>
            <div>
                <label>Address: </label>
                <input
                    type="text"
                    name="address"
                    value={address}
                    placeholder="Address"
                    onChange={(e) => saveAddress(e.target.value)}
                />
            </div>
            <div>
                <label>lat: </label>
                <input
                    type="number"
                    name="lat"
                    value={lat}
                    placeholder="Lat"
                    onChange={(e) => saveLat(e.target.value)}
                />
            </div>
            <div>
                <label>Lng: </label>
                <input
                    type="number"
                    name="lng"
                    value={lng}
                    placeholder="Lng"
                    onChange={(e) => saveLng(e.target.value)}
                />
            </div>
            <div>
                <label>Cuisine Type: </label>
                <input
                    type="text"
                    name="cuisine_type"
                    value={cuisine_type}
                    placeholder="Cuisine_type"
                    onChange={(e) => saveCuisineType(e.target.value)}
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
                    onChange={(e) => saveMonday(e.target.value)}
                />
            </div>
            <div>
                <label>Tuesday: </label>
                <input
                    type="text"
                    name="tuesday"
                    value={tuesday}
                    placeholder="Name"
                    onChange={(e) => saveTuesday(e.target.value)}
                />
            </div>
            <div>
                <label>Wednesday: </label>
                <input
                    type="text"
                    name="wednesday"
                    value={wednesday}
                    placeholder="wednesday"
                    onChange={(e) => saveWednesday(e.target.value)}
                />
            </div>
            <div>
                <label>Thursday: </label>
                <input
                    type="text"
                    name="thursday"
                    value={thursday}
                    placeholder="thursday"
                    onChange={(e) => saveThursday(e.target.value)}
                />
            </div>
            <div>
                <label>Friday: </label>
                <input
                    type="text"
                    name="friday"
                    value={friday}
                    placeholder="friday"
                    onChange={(e) => saveFriday(e.target.value)}
                />
            </div>
            <div>
                <label>Saturday: </label>
                <input
                    type="text"
                    name="saturday"
                    value={saturday}
                    placeholder="Saturdar"
                    onChange={(e) => saveSaturday(e.target.value)}
                />
            </div>
            <div>
                <label>Sunday: </label>
                <input
                    type="text"
                    name="sunday"
                    value={sunday}
                    placeholder="sunday"
                    onChange={(e) => saveSunday(e.target.value)}
                />
            </div>
        </div>
        <div className="btn-group">
            <div >
                <Button type="submit" variant="success">Add</Button>{' '}
            </div>

            <div>
                <Button variant="light" onClick={() => closeNewRestaurant()}>Close</Button>
            </div>
        </div>
    </form>
</div>

 : <div>mal</div>}
 </div>   )
}


NewResturant.Layout = MyLayout

export default NewResturant;
