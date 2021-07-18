import { useAuthContext } from '../context/authContext';
import React, { useContext, useState, useEffect, createContext } from 'react';

import { useRouter } from 'next/router';
import userService from '../services/user.service';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css'
import Link from 'next/link'
import restaurantsService from '../services/restaurants.service';

export default function MyLayout({ children }) {

    const { user, loggedIn, session, favourites, restaurants, setRestaurants, setUser, filterFavs, setLoggedIn, setSession, setFilterFavs, allRestaurants, setAllRestaurants } = useAuthContext()

    const router = useRouter();

    const checkIfLoggedIn = async () => {
        await userService
            .loggedin()
            .then((result) => {
                setLoggedIn(result);
                setUser(result.username)
            });
    };

    useEffect(() => {
        const getUser = async () => {
            await userService
              .loggedin()
              .then((res) => {setFavourites(res.favourites); setUser(res.username); setUserID(res.id)})
              .catch((err) => console.error('error', err));
          }
        const loadingRestaurants = async () => {
          await restaurantsService
            .getAllRestaurants()
            .then((res) => (setRestaurants(res.data)))
            .catch((err) => console.error('error', err));
        }
    
        loadingRestaurants();
        getUser()
      }, []);


    const logOut = async () => {
        await userService
            .logout()
            .then((res) => {
                checkIfLoggedIn()
                
            })
            .catch((err) => console.error('error', err));
    }

   
    return (
        <>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="/">Restaurants Next Js App</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                     
                     
                        <Navbar.Collapse className="justify-content-end">
                            <Nav>
                                {user && <Navbar.Text className="welcome">Wellcome {user}!</Navbar.Text>}
                                {user && <Nav.Link onClick={() => logOut()}>Log out</Nav.Link>}
                                {!user && <Nav.Link href="/auth/register">Register</Nav.Link>}
                                {!user && <Nav.Link href="/auth/login">Login</Nav.Link>}
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            {children}
        </>
    )
}