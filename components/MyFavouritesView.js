import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import MyLayout from "../layouts/Layout";
import 'bootstrap/dist/css/bootstrap.css'
import { useAuthContext } from '../context/authContext';
import { Row } from 'react-bootstrap';
import Image from 'next/image'
import { Button, Spinner } from 'react-bootstrap';


const MyFavouritesView = () => {

  const { getUser, restaurants, currentUser, setViewFav, loadingFavDetails, viewFav, loggedIn, session, userID, favourites, setFavourites, setUserID, setUser, setLoggedIn, setSession } = useAuthContext()

  useEffect(() => {
 
      getUser(currentUser.id)
    loadingFavDetails()
  }, []);


  const HEIGHT = 500;
  const WIDTH = 825;


  return (
        <div className="container home">

      {viewFav.length ?
        <div>
          <Row xs={1} md={4} className="g-4">
            {viewFav.map((data) => {
              return (
                <div key={data.id}>
                  <a href={`/restaurants/${data._id}`}>
                    {data.image && <Image src={data.image} height={HEIGHT}
                      width={WIDTH} alt="restaurant photo" />}
                    {data.name}
                    {data.address}
                  </a>
                </div>
              )
            })}
          </Row>
        </div> : <Button variant="light" disabled>
   
    Theres no favourites here...
  </Button>}
    </div>
  )
}


MyFavouritesView.Layout = MyLayout;

export default MyFavouritesView;