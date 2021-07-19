import Image from 'next/image'
import React, { useEffect, useState } from 'react';
import restaurantsService from '../services/restaurants.service';
import { useRouter } from 'next/router';
import { Row, Card, Col } from 'react-bootstrap';
import { useAuthContext } from '../context/authContext';
import MyLayout from "../layouts/Layout";
import styled from 'styled-components';


const Div = styled.div`
		margin-top: 80px;
        margin-bottom: 80px;
`;


const IndexView = () => {

    const { restaurants, currentUser, getUser, loggedIn } = useAuthContext();
    const [restaurantsInfo, setRestaurantsInfo] = useState('');


    useEffect(() => {

        getUser(currentUser.id);
        const loadingRestaurants = async () => {
            await restaurantsService
                .getAllRestaurants()
                .then((res) => (setRestaurantsInfo(res.data)))
                .catch((err) => console.error('error', err))
        }
        loadingRestaurants();

    }, []);


    const HEIGHT = 450;
    const WIDTH = 350;


    return (
        <Div className="container">
            <Row xs={1} md={2} className="g-4">
                {restaurants.map((data) => {
                    return (
                        <div key={data._id} params={data._id}>
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
        </Div>
    )
}


IndexView.Layout = MyLayout;

export default IndexView;

