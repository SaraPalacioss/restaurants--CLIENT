import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import restaurantsService from '../services/restaurants.service'
import { Button } from 'react-bootstrap';
import MyLayout from "../layouts/Layout";
import 'bootstrap/dist/css/bootstrap.css'
import { useAuthContext } from '../context/authContext'
import userService from '../services/user.service';
import { Row } from 'react-bootstrap';
import Link from 'next/link'


const MyFavourites = () => {

    const { user, loggedIn,session, userID, favourites, setFavourites, setUserID, setUser, setLoggedIn, setSession} =useAuthContext()
    const [details, saveDetails] = useState({});

    const router = useRouter();

    const { query: { id } } = router;
    const getUser = async () => {
        await userService
            .loggedin()
            .then((res) => setFavourites(res.favourites))
            .catch((err) => console.error('error', err));
    }
    
    useEffect(() => {
        const loadingDetails = async (id) => {
            await userService
                .myfavourites(id)
                .then((res) => saveDetails(res.data))
                .catch((err) => console.error('error', err));
        }
        
    
        loadingDetails(id);
        getUser()
    }, [id]);

  






    const HEIGHT = 500;
    const WIDTH = 825;


    return (
        <div>
          {/* <div className="gap-2">
          </div>
          <div className="container home">
            <Row xs={1} md={4} className="g-4">
              {details.map((data) => {
                return (
                  <div key={data._id} params={data._id}>
                    <Link href={`/restaurants/${data._id}`}><a>
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
    
    
                  </div>
                )
              })}
            </Row>
          </div> */}
        </div>
      )
    
}


MyFavourites.Layout = MyLayout

export default MyFavourites;