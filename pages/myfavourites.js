import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import restaurantsService from '../services/restaurants.service'
import { Button } from 'react-bootstrap';
import MyLayout from "../layouts/Layout";
import 'bootstrap/dist/css/bootstrap.css'
import { useAuthContext } from '../context/authContext';
import userService from '../services/user.service';
import { Row } from 'react-bootstrap';
import Link from 'next/link'


const MyFavourites = () => {

    const { user, loggedIn,session, userID, favourites, setFavourites, setUserID, setUser, setLoggedIn, setSession} =useAuthContext()
    const [favDetails, saveFavDetails] = useState({
        name: '',
        image: '',
    });

    const router = useRouter();


   
    // useEffect(() => {
    //     // const loadingFavDetails = async (id) => {
    //     //     await userService
    //     //         .myfavourites(id)
    //     //         .then((res) => saveFavDetails(res.data))
    //     //         .catch((err) => console.error('error', err));
    //     // }
        
    
    //     // loadingFavDetails(id);
    //     const getUser = async () => {
    //         await userService
    //             .loggedin()
    //             .then((res) => setFavourites(res.favourites))
    //             .catch((err) => console.error('error', err));
    //     }
        
    //     getUser()
     
    // });

    const loadingFavDetails =  (id) => {
          restaurantsService
            .myfavourites(id)
            .then((res) => saveFavDetails(res.data))
            .catch((err) => console.error('error', err));
    }
  


// const mapeo= async () =>{
//    await favourites.map((data)=>{
//         userService
//             .myfavourites(data.id)
//             .then((res) => saveFavDetails(res.data))
//             .catch((err) => console.error('error', err));
//     })
// } 


    const HEIGHT = 500;
    const WIDTH = 825;


    return (
        <div>
                  {console.log(favourites[0])}
                  <div className="gap-2">
          </div>
          <div className="container home">
            <Row xs={1} md={4} className="g-4">

       
              {/* {favourites.map((data) => {
                return (
                  <div key={data}> */}
                  {/* {console.log(favourites[0])} */}
                    {/* <Link href={`/restaurants/${data._id}`}><a>
                      {data.image && <Image src={data.image} height={HEIGHT}
                        width={WIDTH} alt="restaurant photo" />}
                    </a></Link>
    
      
    
                    <div className="align-info">
                      <Link href={`/restaurants/${data._id}`}><a>
                        <h2>{data.name}</h2>
                        <div>
                          <span>{data.neighborhood}</span>
                        </div>
                      </a></Link>
    
                    </div>
    
     */}
                  {/* </div>
                )
              })} */}
            </Row>
          </div>
        </div>
      )
    
}


MyFavourites.Layout = MyLayout

export default MyFavourites;