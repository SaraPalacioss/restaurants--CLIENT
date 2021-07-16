import React from "react";
import { useAuthContext } from '../context/authContext';
import { useRouter } from 'next/router';
import userService from '../services/user.service';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css'

export default function MyLayout({ children }) {

    const { user, loggedIn, session, setUser, setLoggedIn, setSession } = useAuthContext()
    
    const router = useRouter();

    const checkIfLoggedIn = async () => {
        await userService
            .loggedin()
            .then((result) => {
                setLoggedIn(result);
                setUser(result)
                setLoggedIn(false)
                console.log(result)
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
                            {loggedIn && <Nav.Link href="#link">My favourites</Nav.Link>}
                        </Nav>
                        <Nav className="justify-content-center">
                            {loggedIn && <Button variant="primary" size="sm" onClick={() => redirectNewRestaurant()}>
                                Add new restaurant
                            </Button>}
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
                </Container>
            </Navbar>
            {children}
        </>
    )
}