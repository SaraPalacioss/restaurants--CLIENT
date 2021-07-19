import { useRouter } from 'next/router';
import restaurantsService from '../services/restaurants.service'
import { Button } from 'react-bootstrap';
import { useAuthContext } from '../context/authContext'
import MyLayout from "../layouts/Layout";
import 'bootstrap/dist/css/bootstrap.css'
import Link from 'next/link'


const NewResturant = () => {

    const { name, loggedIn, neighborhood, loadingRestaurants, address, cuisine_type, saveName, saveNeighborhood, saveAddress, saveCuisineType } = useAuthContext()

    const router = useRouter();



    const addNewRestaurant = async (restaurant) => {
        await restaurantsService
            .addNewRestaurant(restaurant)
            .then((res) => { console.log(res.data); loadingRestaurants() })
            .catch((err) => console.error('error', err));

    }

    const submitNewRestaurant = (e) => {
        e.preventDefault();
        addNewRestaurant({
            name,
            neighborhood,
            address,
            // lat,
            // lng,
            cuisine_type,
            // monday,
            // tuesday,
            // wednesday,
            // thursday,
            // friday,
            // saturday,
            // sunday,
        });

        loadingRestaurants()
        window.location.href = '/'
        saveName(''),
            saveNeighborhood(''),
            saveAddress(''),
            saveCuisineType('')
    };

    const closeNewRestaurant = (id) => {
        router.push(`/`)
    };


    return (
        <div className="container">
            {loggedIn ?
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
                                    placeholder="Restauran name"
                                    required="true"
                                    onChange={(e) => saveName(e.target.value)}
                                />
                            </div>
                            <div>
                                <label>Neighborhood: </label>
                                <input
                                    type="text"
                                    name="neighborhood"
                                    value={neighborhood}
                                    placeholder="Restaurant neighborhood"
                                    onChange={(e) => saveNeighborhood(e.target.value)}
                                />
                            </div>
                            <div>
                                <label>Address: </label>
                                <input
                                    type="text"
                                    name="address"
                                    value={address}
                                    placeholder="Restaurant address"
                                    onChange={(e) => saveAddress(e.target.value)}
                                />
                            </div>
                            {/* <div>
                                <label>lat: </label>
                                <input
                                    type="number"
                                    name="lat"
                                    value={lat}
                                    placeholder="Lat"
                                    onChange={(e) => saveLat(e.target.value)}
                                />
                            </div> */}
                            {/* <div>
                                <label>Lng: </label>
                                <input
                                    type="number"
                                    name="lng"
                                    value={lng}
                                    placeholder="Lng"
                                    onChange={(e) => saveLng(e.target.value)}
                                />
                            </div> */}
                            <div>
                                <label>Cuisine Type: </label>
                                <input
                                    type="text"
                                    name="cuisine_type"
                                    value={cuisine_type}
                                    placeholder="Italian, asian, spanish,..."
                                    onChange={(e) => saveCuisineType(e.target.value)}
                                />
                            </div>
                            {/*
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
                                /> */}
                            {/* </div> */}
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
                : <div><p>Plese <Link href="/auth/register">register</Link> or <Link href="/auth/login">login</Link> to access this content</p></div>}
        </div>)
}


NewResturant.Layout = MyLayout

export default NewResturant;
