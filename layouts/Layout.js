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
import { Button } from 'react-bootstrap';

export default function MyLayout({ children }) {

    const router = useRouter();

    const { loggedIn, currentUser, setCurrentUser, getUser, setRestaurants, setLoggedIn } = useAuthContext();


    useEffect(() => {

        if (localStorage.jwtToken) {

            const token = localStorage.jwtToken;
            setAuthToken(token);

            const decoded = jwt_decode(token);

            setCurrentUser(decoded);
            setLoggedIn(true);

            const currentTime = Date.now() / 1000;
            if (decoded.exp < currentTime) {

                store.dispatch(logoutUser());

                window.location.href = "./auth/login";
            };

        };

        getUser(currentUser.id);

        const loadingRestaurants = () => {
            restaurantsService
                .getAllRestaurants()
                .then((res) => (setRestaurants(res.data)))
                .catch((err) => console.error('error', err));
        };

        loadingRestaurants();
    }, []);

    const redirectNewRestaurant = () => {
        router.push(`/restaurants/new-restaurant`)
    };

    const logOut = async () => {
        await userService
            .logout()
            .then((res) => {
                localStorage.removeItem("jwtToken");
                localStorage.removeItem("session");
                setAuthToken(false);
                setCurrentUser('');
                setLoggedIn(false)
                router.push('/')
            })
            .catch((err) => console.error('error', err));
    };

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
                            <Nav>
                                {loggedIn && <Button variant="primary" size="sm" onClick={() => redirectNewRestaurant()}>
                                    Add new restaurant
                                </Button>}
                            </Nav>

                            <Navbar.Collapse className="justify-content-end">
                                <Nav>
                                    {loggedIn && <Navbar.Text>Wellcome {currentUser.username}!</Navbar.Text>}
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