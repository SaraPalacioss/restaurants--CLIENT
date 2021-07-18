import { useAuthContext } from '../context/authContext';
import React, { useEffect, useState } from 'react';
import userService from '../services/user.service';
import { Navbar, Nav, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css'
import Link from 'next/link'
import restaurantsService from '../services/restaurants.service';

export default function MyLayout({ children }) {

    const { user, loggedIn,  restaurants, getUser, setUserID, setRestaurants, setUser, setLoggedIn, setSession} = useAuthContext()

const [restaurantsInfo, setRestaurantsInfo] = useState('')
    useEffect(() => {
  
        const loadingRestaurants =  () => {
             restaurantsService
                .getAllRestaurants()
                .then((res) => (setRestaurants(res.data)))
                .catch((err) => console.error('error', err));
        }
loadingRestaurants()
        getUser()
    }, []);


    const logOut = async () => {
        await userService
            .logout()
            .then((res) => {
                setLoggedIn(false);
                setUser(res.username);
                setSession(false);
                setUserID(res._id)

            })
            .catch((err) => console.error('error', err));
    }

    return (
        <>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand><Link href="/">Restaurants Next Js App</Link></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav>

                            {loggedIn && <Nav.Link><Link href="/myfavourites">My favourites</Link></Nav.Link>}

                        </Nav>

                        <Navbar.Collapse className="justify-content-end">
                            <Nav>
                                {loggedIn && <Navbar.Text className="welcome">Wellcome {user}!</Navbar.Text>}
                                {loggedIn && <Nav.Link onClick={() => logOut()}>Log out</Nav.Link>}
                                {!loggedIn && <Nav.Link href="/auth/register">Register</Nav.Link>}
                                {!loggedIn && <Nav.Link href="/auth/login">Login</Nav.Link>}
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar.Collapse>

                    </>
                  
                </Container>
            </Navbar>
            {children}
        </>
    )
}