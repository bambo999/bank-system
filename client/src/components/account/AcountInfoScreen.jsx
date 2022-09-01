import React from 'react'
import styled from 'styled-components';
import { Navbar } from '../navbar/Navbar';
import UserImage from '../../assets/default-user-image.png';
import { useSelector } from 'react-redux';

export const AcountInfoScreen = () => {
	
	let { user, email, id, nationality, birthday, phone, balance } = useSelector(state => state.auth);


	return (
		<div>
			<Navbar />

			<Container>
				<UserInfoBox>
					{/* Col 1 */}
					<ImageUserContainer>
						<UserImageTag src={UserImage} alt='image' />
					</ImageUserContainer>

					{/* Col 2 */}
					<InfoContainer>
						<Paragraph>
							user:   { user }
						</Paragraph>
						<Paragraph>
							Email:   {email}
						</Paragraph>
						<Paragraph>
							ID: { id }
						</Paragraph>
						<Paragraph>
							Nationality:  { nationality }
						</Paragraph>
					</InfoContainer>
					
					{/* Col 3 */}
					<InfoContainer>
						<Paragraph>
							Birthday:  { (birthday) && birthday.split('').splice(0, 10).join('') }
						</Paragraph>
						<Paragraph>
							Phone:  { phone }
						</Paragraph>
						<Paragraph>
							Balance:  { balance }
						</Paragraph>

						<Paragraph style={{color:'transparent'}}>a</Paragraph>
					</InfoContainer>
				
				</UserInfoBox>
			</Container>
		</div>
	)
}

const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100vw;
	height: 89.3vh;
`;

const UserInfoBox = styled.div`
	width: 70%;
	height: 75%;
	background: rgb(41,128,185);
	background: linear-gradient(90deg, rgba(41,128,185,1) 0%, rgba(41,56,185,1) 35%, rgba(41,185,166,1) 100%);
	border-radius: 70px;
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;

`;

const ImageUserContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`;

const UserImageTag = styled.img`
	width: 300px;
	height: 300px;
	border-radius: 999px;
`;

const InfoContainer = styled.div`
	display: grid;
	align-items: center;
`;

const Paragraph = styled.p`
	color: white;
	margin: 0px 0px;
	font-size: 20px;
`;
