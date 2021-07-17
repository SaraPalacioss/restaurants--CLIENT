import React from "react";
import { useAuthContext } from '../context/authContext';
import { useRouter } from 'next/router';
import userService from '../services/user.service';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css'
import Link from 'next/link'

export default function MyLayout({ children }) {

    const { user, loggedIn, session, setUser, setLoggedIn, setSession } = useAuthContext()
    
    const router = useRouter();

    const checkIfLoggedIn = async () => {
        await userService
            .loggedin()
            .then((result) => {
                setLoggedIn(result);
                setUser(result.username)
            });
    };


    const logOut = async () => {
        await userService
            .logout()
            .then((res) => {
                checkIfLoggedIn()
                
            })
            .catch((err) => console.error('error', err));
    }

    const redirectNewRestaurant = () => {
        router.push(`/restaurants/new-restaurant`)
    };

    return (
        <>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="/">Restaurants Next Js App</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            {user && <Nav.Link><Link href="/myfavourites"><a>My favourites</a></Link></Nav.Link>}
                        </Nav>
                        <Nav className="justify-content-center">
                            {user && <Button variant="primary" size="sm" onClick={() => redirectNewRestaurant()}>
                                Add new restaurant
                            </Button>}
                        </Nav>
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