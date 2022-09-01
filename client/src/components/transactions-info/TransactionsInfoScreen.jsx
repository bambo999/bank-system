import React from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { Navbar } from '../navbar/Navbar'
import { Container, MainTitle, UserTableContainer, UserTableHeader, UserTableRow, UserTables } from '../users-info/UsersInfoScreen'

export const TransactionsInfoScreen = () => {

	const dispatch = useDispatch();
	const { getTransactions } = useSelector(state => state.transactions);
	const { transactions } = getTransactions.transactions;



	return (
		<div>
			<Navbar />

				<Container>
				<MainTitle>Total Transactions: { getTransactions.transactions.total }</MainTitle>

				<UserTables>
					<tbody>
						<UserTableContainer>
							<UserTableHeader size='20%'>User ID</UserTableHeader>
							<UserTableHeader size='20%'>Amount</UserTableHeader>
							<UserTableHeader size='20%'>Recieved ID</UserTableHeader>
						</UserTableContainer>

						{
							(transactions) 
								&&

								transactions.map((transaction) => {
									return(
										<UserTableContainer key={transaction._id}>
											<UserTableRow>{transaction.user}</UserTableRow>
											<UserTableRow>{transaction.amount}</UserTableRow>
											<UserTableRow>{transaction.userId}</UserTableRow>
										</UserTableContainer>
									)
								})
						}
					
					</tbody>		
				</UserTables>		
			</Container>
		</div>
	)
}
