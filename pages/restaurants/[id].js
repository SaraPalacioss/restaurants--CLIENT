import React, { useEffect, useContext, useState } from 'react';
import { useRouter } from 'next/router';
import restaurantsService from '../../services/restaurants.service'
import Image from 'next/image'



const RestaurantDetails = () => {

    // state del componente
    const [details, saveDetails] = useState({});


    // Routing para obtener el id actual
    const router = useRouter();
    const { query: { id }} = router;

  




  useEffect(() => {

    const loadingDetails = async () => {
      await restaurantsService
        .getRestaurantDetails(id)
        .then((res) => (saveDetails(res.data)))
        .catch((err) => console.error('error', err));
    }
    loadingDetails();
  }, [id]);
  console.log(id)


const deleteRestaurant = async (id) => {


    await restaurantsService.deleteRestaurant(id)
        .then(
            () => {

                console.log(`Restaurant with id: ${id} deleted`)
               

               
            },
            (error) => {
                console.error(error)
            }
        )

   


};




const {name, address, cuisine_type, image, lat, lng, neighborhood, Friday, Monday, Saturday, Sunday, Thursday, Tuesday, Wednesday,_id  } = details
const HEIGHT = 200;
const WIDTH = 225; 
return ( 
       
        <div>
         
            {name}
            {address}
  
            {image &&     <Image src={image} height={HEIGHT}
                width={WIDTH} alt="restaurant photo" />}
             <div className="navigation">
            <button onClick={()=>deleteRestaurant(id)}>Delete</button>
        </div>
        </div>
      );
}
 
export default RestaurantDetails;