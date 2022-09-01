import React from 'react'
import { Link } from 'react-router-dom';
import { Container, ImageBackground, LeftContainer } from './LoginScreen'
import BankBackground from '../../assets/bankBackground.jpeg';
import styled from 'styled-components';
import { useForm } from '../../hooks/useForm';
import { useDispatch, useSelector } from 'react-redux';
import {  startRegister } from '../../actions/auth';
import { Redirect } from 'react-router-dom';

export const AdminRegisterScreen = () => {

	const dispatch = useDispatch();
	const { checking } = useSelector(state => state.auth)

	const [ formValues, handleInputChange ] = useForm({
		rFirstname: '',
		rLastname: '',
		rEmail: '',
		rnationality: '',
		rPhone: '',
		rPassword: '',
		rBirthday: '',
		rAmount: '',
		role: 'ADMIN_ROLE'
	})

	const { rFirstname, rLastname, rEmail, rnationality, rPhone, rPassword, rBirthday, rAmount, role } = formValues;

	const handleSubmit = (e) => {
		e.preventDefault();

		dispatch(startRegister( rFirstname, rLastname, rEmail, rnationality, rPhone, rPassword, rBirthday, rAmount, role ));		
	
	}

	if (!checking) {
		return (
			<Redirect to='/login' />
		)
	}


	return (
		<Container>
			<RightContainer onSubmit={handleSubmit}>
					{/* Fistname - Lastname - email - password - birthday - nationality - role - phone - amount */}
				<MainTitle>Admin Register</MainTitle>

				<Row>
					{/* Firstname */}
					<CustomInputRow  
						placeholder="Firstname" 
						name='rFirstname'
						value={rFirstname}
						onChange={handleInputChange}	
					/>
				
					{/* Lastname */}
					<CustomInputRow 
						placeholder="Lastname" 
						name='rLastname'
						value={rLastname}
						onChange={handleInputChange}	
					/>
				</Row>

				<DivCenterInput>
					{/* Email */}
					<CustomInput 
						placeholder="Email"
						type='email'
						name='rEmail'
						value={rEmail}
						onChange={handleInputChange}	
					/>
				</DivCenterInput>

				<Row>
					<CustomInputRow 
						placeholder="Nationality" 
						name='rnationality'
						value={rnationality}
						onChange={handleInputChange}
					/>
					
					{/* Phone */}
					<CustomInputRow 
						placeholder="Phone" 
						name='rPhone'
						value={rPhone}
						onChange={handleInputChange}	
					/>
				</Row>

				<DivCenterInput>
					{/* Password */}
					<CustomInput
						type='password'
						placeholder="Password" 
						name='rPassword'
						value={rPassword}
						onChange={handleInputChange}	
					/>
				</DivCenterInput>

				<Row>
					{/* Birthday */}
					<CustomInputRow 
						placeholder="Birthday" 
						type="date"
						name='rBirthday'
						value={rBirthday}
						onChange={handleInputChange}
					/>
				
					{/* Amount */}
					<CustomInputRow 
						placeholder="Amount" 
						name='rAmount'
						value={rAmount}
						onChange={handleInputChange}
					/>

				</Row>

				{/* SUBMIT */}
				<DivCenterInput>
					<SubmitInput type="submit" value="Submit"/>
				</DivCenterInput>
                
				<InputContainer>
								<ForgotPassword to='/login'>Already have an account, Login</ForgotPassword>
				</InputContainer>

			
			</RightContainer>
		
			<LeftContainer>
				<ImageBackground src={ BankBackground } alt="Bank" />
			</LeftContainer>
		</Container>
	)
}

const RightContainer = styled.form`
	width: 50%;
	height: 100%;
`;

const MainTitle = styled.h1`	
	margin-top: 40px;
	color: #2980B9;
	text-align: center;
	font-size: 45px;
`;

const DivCenterInput = styled.div`
	display: flex;
	justify-content: center;
`;	

const CustomInput = styled.input`
	width: 90%;
	padding: 20px;
	border: none;
	background-color: #F0F0F0;
	font-size: 16px;
	color: #444;

	&:focus{
		outline: none;
	}
`;


const Row = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-around;
`;

const CustomInputRow = styled.input`
	width: 40%;
	margin: 40px 0px;
	padding: 20px;
	border: none;
	background-color: #F0F0F0;
	font-size: 16px;
	color: #444;

	&:focus{
		outline: none;
	}
`;

const SubmitInput = styled.input`
	padding: 18px 60px;
	font-size: 20px;
	border: none;
	background-color: #2980B9;
	color: white;
	border-radius: 5px;

	&:hover{
		background-color: #3188C1;
		cursor: pointer;
	}
`;


const InputContainer = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content:center;
`;

const ForgotPassword = styled(Link)`
	color: #2980B9;
	text-decoration: none;
	margin-top: 40px;
	font-size: 18px;
	font-family: Arial, Helvetica, sans-serif;
`;