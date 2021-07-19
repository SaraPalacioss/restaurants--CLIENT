import React, { useEffect } from 'react';
import MyLayout from "../layouts/Layout";
import { useAuthContext } from '../context/authContext';
import { Row, Card, Col } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import styled from 'styled-components';


const Div = styled.div`
		margin-top: 80px;
        margin-bottom: 80px;
`;


const MyFavouritesView = () => {

    const { getUser, restaurants, currentUser, setViewFav, loadingFavDetails, viewFav, loggedIn, session, userID, favourites, setFavourites, setUserID, setUser, setLoggedIn, setSession } = useAuthContext()

    useEffect(() => {

        getUser(currentUser.id)
        loadingFavDetails()
    }, []);


    const HEIGHT = 450;
    const WIDTH = 350;


    return (
        <Div className="container">

            {viewFav.length ?
                <div>
                    <Row xs={1} md={2} className="g-4">
                        {viewFav.map((data) => {
                            return (
                                <div key={data.id}>
                                    <Col>
                                        <a href={`/restaurants/${data._id}`}>
                                            <Card>
                                                <Card.Img variant="top" src={data.image} height={HEIGHT}
                                                    width={WIDTH} />
                                                <Card.Body>
                                                    <Card.Title>{data.name}</Card.Title>
                                                    <Card.Text>
                                                        {data.neighborhood}
                                                    </Card.Text>
                                                </Card.Body>
                                            </Card>
                                        </a>
                                    </Col>
                                </div>
                            )
                        })}
                    </Row>
                </div> : <Button variant="light" disabled>
                    Theres no favourites here...
                </Button>}
        </Div>
    )
}


MyFavouritesView.Layout = MyLayout;

export default MyFavouritesView;