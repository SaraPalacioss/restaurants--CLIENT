import { useAuthContext } from '../context/authContext';
import React, { useEffect, useState } from 'react';
import userService from '../services/user.service';
import { Navbar, Nav, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css'
import Link from 'next/link'
import restaurantsService from '../services/restaurants.service';
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { useRouter } from 'next/router';

export default function MyLayout({ children }) {

    const router = useRouter();

    const { user, loggedIn, currentUser, setCurrentUser, restaurants, getUser, setUserID, setRestaurants, setUser, setLoggedIn, setSession } = useAuthContext()

    const [restaurantsInfo, setRestaurantsInfo] = useState('')
    useEffect(() => {
   
        if (localStorage.jwtToken) {
            console.log(localStorage.jwtToken)
            // Set auth token header auth
            const token = localStorage.jwtToken;
            setAuthToken(token);
            // Decode token and get user info and exp
            const decoded = jwt_decode(token);
            // Set user and isAuthenticated
            setCurrentUser(decoded);
            setLoggedIn(true);
            // Check for expired token

            const currentTime = Date.now() / 1000; // to get in milliseconds
            if (decoded.exp < currentTime) {
              // Logout user
              store.dispatch(logoutUser());
          
              // Redirect to login
              window.location.href = "./auth/login";
            }
            // getUser(currentUser.id)
          }
          getUser(currentUser.id)
          
        const loadingRestaurants = () => {
            restaurantsService
                .getAllRestaurants()
                .then((res) => (setRestaurants(res.data)))
                .catch((err) => console.error('error', err));
        }

        loadingRestaurants()
        // const getUser = (id) => {
        //     userService
        //         .getUser(currentUser.id)
        //         .then((res) => {
        //             console.log(res)
        //         }

        //         )
        //         .catch((err) => console.error('error', err));
        // }
        // getUser()

        
    }, []);



    const logOut = async () => {
        await userService
            .logout()
            .then((res) => {
                // setLoggedIn(false);
                // setUser(res.username);
                // setSession(false);
                // setUserID(res._id)
                // Remove token from local storage
                localStorage.removeItem("jwtToken");
                localStorage.removeItem("session");

                // Remove auth header for future requests
                setAuthToken(false);
                // Set current user to empty object {} which will set isAuthenticated to false
                setCurrentUser('');
                setLoggedIn(false)
                router.push('/')
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
                                    {loggedIn && <Navbar.Text className="welcome">Wellcome {currentUser.username}!</Navbar.Text>}
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