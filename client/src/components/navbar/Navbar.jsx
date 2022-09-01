import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { startLogout } from '../../actions/auth';

export const Navbar = () => {

	const dispatch = useDispatch();
	const { role } = useSelector(state => state.auth);


	const handleLogout = () => {
		dispatch(startLogout());

		localStorage.removeItem('token')
	}

	return (
		<NavbarContainer>
			<NavList>
				<NavListItem to='/'>Home</NavListItem>
				
				{ 

					( role !== 'ADMIN_ROLE' )
					
					? (
						<>
							<NavListItem to='/account-info'>Account Info</NavListItem>
							<NavListItem to='/transactions'>Transactions</NavListItem>
						</>
					)
					
					: (
						<>
							<NavListItem to='/users-info'>Users Info</NavListItem>
							<NavListItem to='/transactions-info'>Transactions Info</NavListItem>
						</>

					)

				}
				
				<Logout onClick={ handleLogout }>Logout</Logout>
			</NavList>
		</NavbarContainer>
	)
}


const NavbarContainer = styled.nav`
	width: 100vw;
	height: 100px;
	display: flex;
	align-items: center;
	justify-content: flex-end;
`;

const NavList = styled.ul`
	width: 50%;
	display: flex;
	flex-direction: row;
	justify-content: space-around;
`;

const NavListItem = styled(Link)`
	text-decoration: none;
	padding: 9px 35px;
	font-size: 18px;
	font-weight: normal;
	color: black;

	&:hover{
		color: white;
		background-color: #2980B9;
		border-radius: 20px;
		cursor: pointer;
	}
`;

const Logout = styled.button`
	padding: 9px 35px;
	font-size: 18px;
	font-weight: normal;
	color: black;
	border: none;
	background-color: white;

	&:hover{
		color: white;
		background-color: #E53737;
		border-radius: 20px;
		cursor: pointer;
	}

`;