import React from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';

import styled from 'styled-components';

const Label = styled.label`
		color: black;
		font-weight: bold;
		text-transform: uppercase;
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
height: 95vh;
		display: flex;
		justify-content: center;
		align-content: center;
		margin: 0;
`;

const SpanAlert = styled.span`
	color: tomato;
	padding-bottom: 20px;
	font-weight: bold;
	text-transform: uppercase;
	font-size: 0.8rem;
`;

const SpanInfo = styled.span`
	padding-top: 20px;
	padding-bottom: 20px;
`;

const Strong = styled.strong`
	text-decoration: underline;
`;



export default function EditRestaurantForm({ submitMethod, title, name, onChangeHandler, neighborhood, address, cuisine_type, submitBtnText, closeBtnText, id, closeFunction, onChangeAddress, onChangeCuisine, onChangeName, onChangeNeigh }) {
	return (
        <div className="container">
        <form onSubmit={submitMethod} className="form form-container form-align">
            <h3>{title}</h3>
            <div >
                <div>
                    <label>Name: </label>
                    <input
                        type="text"
                        name="name"
                        value={name}
                        placeholder="Name"
                        onChange={onChangeHandler}
                    />
                </div>
                <div>
                    <label>Neighborhood: </label>
                    <input
                        type="text"
                        name="neighborhood"
                        value={neighborhood}
                        placeholder="neighborhood"
                        onChange={onChangeHandler}
                    />
                </div>
                <div>
                    <label>Address: </label>
                    <input
                        type="text"
                        name="address"
                        value={address}
                        placeholder="Address"
                        onChange={onChangeHandler}
                    />
                </div>
                    <label>Cuisine Type: </label>
                    <input
                        type="text"
                        name="cuisine_type"
                        value={cuisine_type}
                        placeholder="Cuisine_type"
                        onChange={onChangeHandler}
                    />
                </div>
            <div className="btn-group">
                <div >
                    <Button type="submit" variant="success">{submitBtnText}</Button>{' '}
                </div>
                <div>
                    <Button variant="light" onClick={() => closeFunction(id)}>{closeBtnText}</Button>
                </div>
            </div>
        </form>
    </div>
	


	);
}
