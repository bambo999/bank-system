import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { startLogin } from '../../actions/auth';
import BankBackground from '../../assets/bankBackground.jpeg';
import { useForm } from '../../hooks/useForm';

export const LoginScreen = () => {
	
	const dispatch = useDispatch();

	const [loginValues, handleInputChange] = useForm({
		lEmail: '',
		lPassword: '',
	
	})

	const {lEmail, lPassword } = loginValues;

	const handleLogin = (e) => {
		e.preventDefault();

		if (lPassword) {
			
			dispatch(startLogin(lEmail, lPassword));	
		}
	}

	return (		
		<Container>
			<RightContainer>
				<FormContainer onSubmit={handleLogin}>
						<MainTitle>Login</MainTitle>
							<InputContainer>
								<Icon className="far fa-id-card"></Icon>
								<CustomInput 
									type='email'
									name='lEmail'
									value={lEmail}
									onChange={handleInputChange}	
								></CustomInput>
							</InputContainer>

							<InputContainer>
									<Icon className="fas fa-lock"></Icon>
									<CustomInput type='password'
										name='lPassword'
										value={lPassword}
										onChange={handleInputChange}
									></CustomInput>
							</InputContainer>
			
							<InputContainer>
								<SubmitInput type='submit' value='Join!'></SubmitInput>
							</InputContainer>

							<InputContainer>
								<ForgotPassword to='/register'>You dont have an account</ForgotPassword>
							</InputContainer>

						
				</FormContainer>
			</RightContainer>

			<LeftContainer>
				<ImageBackground src={ BankBackground } alt="Bank" />
			</LeftContainer>
		</Container>					
	)
}

export const Container = styled.div`
	margin: 0px;
	padding: 0px;
	display: flex;
	height: 100vh;
	width: 100vw;
	flex-direction: row;
`;

const RightContainer = styled.div`
	width: 50%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const LeftContainer = styled.div`
	width: 50%;
	height: 100%;
`;

export const ImageBackground = styled.img`
	width: 100%;
	height: 100%;
`;

const FormContainer = styled.form`
	width: 550px;
	height: 700px;
	border-radius: 50px;
	background-color: #F0F0F0;
`;

const MainTitle = styled.h1`
	margin-top: 50px;
	margin-bottom: 20px;
	color: #2980B9;
	text-align: center;
	font-family: Arial, Helvetica, sans-serif;
	font-weight: bold;
	font-size: 43px;
`;

const InputContainer = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content:center;
`;

const CustomInput = styled.input`
	padding: 25px;
	padding-left: 5px;
	width: 57%;
	margin: 20px 0px;
	border: none;
	color: #444;
	font-size: 15px;
	
	&:focus{
		outline: none;
	}
`;

const Icon = styled.i`
   padding: 24.5px;
	color: #2980B9;
	font-size: 18px;
	background-color: white;
`;

const SubmitInput = styled.input`
	margin-top: 20px;
	padding: 20px 50px;
	width: 40%;
	border: none;
	background-color: #2980B9;
	border-radius: 30px;
	color: white;
	font-size: 20px;

	&:hover{
		background-color: #3188C1;
		cursor: pointer;
	}
`;

const ForgotPassword = styled(Link)`
	color: #2980B9;
	text-decoration: none;
	margin-top: 40px;
	font-size: 18px;
	font-family: Arial, Helvetica, sans-serif;
`;