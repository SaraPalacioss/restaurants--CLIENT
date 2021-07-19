import { useRouter } from 'next/router';
import restaurantsService from '../services/restaurants.service';
import { Button } from 'react-bootstrap';
import { useAuthContext } from '../context/authContext';
import MyLayout from "../layouts/Layout";
import Link from 'next/link';
import styled from 'styled-components';


const Label = styled.label`
		color: black;
		font-weight: bold;
		text-transform: uppercase;
`;


const H3 = styled.h3`
              color: white;
		padding: 10px 20px;
		border-radius: 5%5%;
        font-weight: bolder;
		background-color: black;        
`;


const Input = styled.input`
		width: 100%;
		height: 30px;
		margin: 0.5rem;
		padding: 10px;
`;


const Form = styled.form`
		width: 100%;
		max-width: 600px;
		margin-right: 15px;
		display: flex;
		flex-direction: column;
		align-content: center;
		justify-content: center;
		align-items: center;
		text-align: center;
		
		@media (max-width: 350px) {
		width: fit-content;
		font-size: 0.8rem;

		button, label, span {
			font-size: 0.7rem;
		}
	}
`;


const Div = styled.div`
    display:flex;
    justify-content: center;
    align-items: center;
    align-content: center;
    height: 90vh;        
`;


const DivBtnGroup = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: 20px;
`;


const NewResturant = () => {

    const { name, loggedIn, neighborhood, loadingRestaurants, address, cuisine_type, saveName, saveNeighborhood, saveAddress, saveCuisineType } = useAuthContext();

    const router = useRouter();

    const addNewRestaurant = async (restaurant) => {
        await restaurantsService
            .addNewRestaurant(restaurant)
            .then((res) => { console.log(res.data); loadingRestaurants() })
            .catch((err) => console.error('error', err));
    };


    const submitNewRestaurant = (e) => {
        e.preventDefault();
        addNewRestaurant({
            name,
            neighborhood,
            address,
            cuisine_type,
        });

        loadingRestaurants();
        window.location.href = '/'
        saveName('');
        saveNeighborhood('');
        saveAddress('');
        saveCuisineType('');
    };


    const closeNewRestaurant = (id) => {
        router.push(`/`)
    };


    return (
        <Div className="container">
            {loggedIn ?
                <Div>
                    <Form onSubmit={submitNewRestaurant}>
                        <div>
                            <H3>NEW RESTAURANT</H3>
                        </div>
                        <div>
                            <div>
                                <Label>Name: </Label>
                                <Input
                                    type="text"
                                    name="name"
                                    value={name}
                                    placeholder="Restauran name"
                                    required="true"
                                    onChange={(e) => saveName(e.target.value)}
                                />
                            </div>
                            <div>
                                <Label>Neighborhood: </Label>
                                <Input
                                    type="text"
                                    name="neighborhood"
                                    value={neighborhood}
                                    placeholder="Restaurant neighborhood"
                                    onChange={(e) => saveNeighborhood(e.target.value)}
                                />
                            </div>
                            <div>
                                <Label>Address: </Label>
                                <Input
                                    type="text"
                                    name="address"
                                    value={address}
                                    placeholder="Restaurant address"
                                    onChange={(e) => saveAddress(e.target.value)}
                                />
                            </div>
                            <div>
                                <Label>Cuisine Type: </Label>
                                <Input
                                    type="text"
                                    name="cuisine_type"
                                    value={cuisine_type}
                                    placeholder="Italian, asian, spanish,..."
                                    onChange={(e) => saveCuisineType(e.target.value)}
                                />
                            </div>
                        </div>
                        <DivBtnGroup>
                            <div >
                                <Button type="submit" variant="success">Add</Button>{' '}
                            </div>

                            <div>
                                <Button variant="light" onClick={() => closeNewRestaurant()}>Close</Button>
                            </div>
                        </DivBtnGroup>
                    </Form>
                </Div>
                : <div><p>Plese <Link href="/auth/register">register</Link> or <Link href="/auth/login">login</Link> to access this content</p></div>}
        </Div>)
}

NewResturant.Layout = MyLayout;

export default NewResturant;
