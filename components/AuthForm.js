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


export default function AuthForm({ username, password, message, submitMethod, handleChange, spaninfo, spanlink, href, textButton }) {
	return (
		<Div className="container">
				<Form onSubmit={submitMethod}>
					<SpanAlert>{message}</SpanAlert>
					<div>
						<Label htmlFor="Username">Username</Label>
						<Input
							onChange={handleChange}
							value={username}
							name="username"
							id="username"
							type="email"
						/>
					</div>
					<div>
						<Label htmlFor="password">Password</Label>
						<Input
							onChange={handleChange}
							value={password}
							id="password"
							type="password"
							name="password"
						/>
					</div>
					<SpanInfo>{spaninfo}<Strong><Link href={href}>{spanlink}</Link></Strong></SpanInfo>
					<div>
						<Button variant="light"
							type="submit"
						>
							{textButton}
						</Button>
					</div>
				</Form>
			</Div>
	);
};
