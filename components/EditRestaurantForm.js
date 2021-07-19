import React from 'react';
import { Button } from 'react-bootstrap';
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
		};
	};
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


export default function EditRestaurantForm({ submitMethod, title, name, onChangeHandler, neighborhood, address, cuisine_type, submitBtnText, closeBtnText, id, closeFunction, onChangeAddress, onChangeCuisine, onChangeName, onChangeNeigh }) {
	return (
        <Div className="container">
        <Form onSubmit={submitMethod}>
            <H3>{title}</H3>
            <div >
                <div>
                    <Label>Name: </Label>
                    <Input
                        type="text"
                        name="name"
                        value={name}
                        placeholder="Name"
                        onChange={onChangeHandler}
                    />
                </div>
                <div>
                    <Label>Neighborhood: </Label>
                    <Input
                        type="text"
                        name="neighborhood"
                        value={neighborhood}
                        placeholder="neighborhood"
                        onChange={onChangeHandler}
                    />
                </div>
                <div>
                    <Label>Address: </Label>
                    <Input
                        type="text"
                        name="address"
                        value={address}
                        placeholder="Address"
                        onChange={onChangeHandler}
                    />
                </div>
                    <Label>Cuisine Type: </Label>
                    <Input
                        type="text"
                        name="cuisine_type"
                        value={cuisine_type}
                        placeholder="Cuisine_type"
                        onChange={onChangeHandler}
                    />
                </div>
             <DivBtnGroup>
                <div >
                    <Button type="submit" variant="success">{submitBtnText}</Button>{' '}
                </div>
                <div>
                    <Button variant="light" onClick={() => closeFunction(id)}>{closeBtnText}</Button>
                </div>
            </DivBtnGroup>
        </Form>
    </Div>

	);
};
