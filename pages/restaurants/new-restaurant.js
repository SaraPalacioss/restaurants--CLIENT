import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router';
import restaurantsService from '../../services/restaurants.service'

import React, { useState } from 'react';

const NewResturant = () => {
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
    addNewRestaurant()


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
        router.push(`/`)
    };

    const closeNewRestaurant = (id) => {
        router.push(`/restaurants`)
    };

    return (
        <div>
            <div>
                <form onSubmit={submitNewRestaurant}>

                    <div >
                        <label>Name: </label>
                        <input
                            type="text"
                            name="name"
                            value={name}
                            placeholder="Name"
                            onChange={(e) => saveName(e.target.value)}
                        />
                        <label>neighborhood: </label>
                        <input
                            type="text"
                            name="neighborhood"
                            value={neighborhood}
                            placeholder="neighborhood"
                            onChange={(e) => saveNeighborhood(e.target.value)}
                        />
                        <label>Image: </label>
                        <input
                            type="text"
                            name="image"
                            value={image}
                            placeholder="image"
                            onChange={(e) => saveImage(e.target.value)}
                        />
                        <label>Address: </label>
                        <input
                            type="text"
                            name="address"
                            value={address}
                            placeholder="Address"
                            onChange={(e) => saveAddress(e.target.value)}
                        />
                        <label>lat: </label>
                        <input
                            type="number"
                            name="lat"
                            value={lat}
                            placeholder="Lat"
                            onChange={(e) => saveLat(e.target.value)}
                        />
                        <label>Lng: </label>
                        <input
                            type="number"
                            name="lng"
                            value={lng}
                            placeholder="Lng"
                            onChange={(e) => saveLng(e.target.value)}
                        />
                        <label>Cuisine Type: </label>
                        <input
                            type="text"
                            name="cuisine_type"
                            value={cuisine_type}
                            placeholder="Cuisine_type"
                            onChange={(e) => saveCuisineType(e.target.value)}
                        />
                        <label>Monday: </label>
                        <input
                            type="text"
                            name="monday"
                            value={monday}
                            placeholder="Monday"
                            onChange={(e) => saveMonday(e.target.value)}
                        />
                        <label>Tuesday: </label>
                        <input
                            type="text"
                            name="tuesday"
                            value={tuesday}
                            placeholder="Name"
                            onChange={(e) => saveTuesday(e.target.value)}
                        />
                        <label>Wednesday: </label>
                        <input
                            type="text"
                            name="wednesday"
                            value={wednesday}
                            placeholder="wednesday"
                            onChange={(e) => saveWednesday(e.target.value)}
                        />
                        <label>Thursday: </label>
                        <input
                            type="text"
                            name="thursday"
                            value={thursday}
                            placeholder="thursday"
                            onChange={(e) => saveThursday(e.target.value)}
                        />
                        <label>Friday: </label>
                        <input
                            type="text"
                            name="friday"
                            value={friday}
                            placeholder="friday"
                            onChange={(e) => saveFriday(e.target.value)}
                        />
                        <label>Saturday: </label>
                        <input
                            type="text"
                            name="saturday"
                            value={saturday}
                            placeholder="Saturdar"
                            onChange={(e) => saveSaturday(e.target.value)}
                        />
                        <label>Sunday: </label>
                        <input
                            type="text"
                            name="sunday"
                            value={sunday}
                            placeholder="sunday"
                            onChange={(e) => saveSunday(e.target.value)}
                        />
                    </div>
                    <div>
                        <button type="submit">Save</button>
                    </div>
                    <div>
                        <button onClick={() => closeNewRestaurant()}>Close</button>
                    </div>
                </form>
            </div>


        </div>
    )

}








export default NewResturant;
