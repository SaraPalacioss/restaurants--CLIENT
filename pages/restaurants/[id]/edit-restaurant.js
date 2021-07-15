import React, { useEffect, useContext, useState } from 'react';
import { useRouter } from 'next/router';
import restaurantsService from '../../../services/restaurants.service'
import Image from 'next/image'



const EditRestaurant = () => {

    // state del componente
  


    // Routing para obtener el id actual
    const router = useRouter();
    const { query: { id }} = router;

  
    const [restaurantNewDetails, saveRestaurantNewDetails] = useState({
        name: '',
        neighborhood: '',
        address: '',
     
          lat: '',
          lng:'' ,
     
        image:'' ,
        cuisine_type: '',
   
          monday: '',
          tuesday: '',
          wednesday:'' ,
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
  console.log(id)


  const onChangeHandler = e => {
    saveRestaurantNewDetails({
        ...restaurantNewDetails,
        [e.target.name]: e.target.value
    });
};


const submitNewRestaurantDetails = e => {

    e.preventDefault();

    // if (team.nameAndLastName.trim() === "" || team.position.trim() === "" || team.bio.trim() === "") {
    //     document.getElementById("alertData").innerHTML =
    //         "All fields are mandatory";
    //     return null;
    // };

    // if (team.nameAndLastName.length > 100) {
    //     document.getElementById("alertNameAndLastName").innerHTML =
    //         "50 maximun character limit exceeded";
    //     return null;
    // };

    // if (team.position.length > 50) {
    //     document.getElementById("alertPosition").innerHTML =
    //         "50 maximun character limit exceeded";
    //     return null;
    // };

    // if (team.bio.length > 200) {
    //     document.getElementById("alertBio").innerHTML =
    //         "200 maximun character limit exceeded";
    //     return null;
    // };

    restaurantsService.editRestaurantDetails(id, restaurantNewDetails)
        .then(
            (data) => {

                saveRestaurantNewDetails(data)
               

               
            },
            (error) => {
                console.error(error)
            }
        )
       

}


const {name, address, cuisine_type, photograph, lat, lng, neighborhood, friday, monday, saturday, sunday, thursday, tuesday, wednesday } = restaurantNewDetails
const HEIGHT = 200;
const WIDTH = 225; 
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
        <div className="navigation">
            <button type="submit">Save</button>
        </div>
    </form>
 
</div>

      );
}
 
export default EditRestaurant;