import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { 
	BrowserRouter as Router,
	Redirect,
	Switch
} from 'react-router-dom'
import { startGettingUsers } from '../actions/admin'
import { finishCheckingToken, startCheckingAuthToken } from '../actions/auth'
import { startGettingTransactions } from '../actions/transactions'
import { AcountInfoScreen } from '../components/account/AcountInfoScreen'
import { LoginScreen } from '../components/auth/LoginScreen'
import { RegisterScreen } from '../components/auth/RegisterScreen'
import {AdminRegisterScreen} from '../components/auth/AdminRegisterScreen'
import { HomeScreen } from '../components/home/HomeScreen'
import { TransactionsInfoScreen } from '../components/transactions-info/TransactionsInfoScreen'
import { TransactionsScreen } from '../components/transactions/TransactionsScreen'
import { UsersInfoScreen } from '../components/users-info/UsersInfoScreen'
import { PrivateRoute } from './PrivateRoute'
import { PublicRoute } from './PublicRoute'

export const AppRouter = () => {

	const dispatch = useDispatch();
	const { id, role } = useSelector(state => state.auth)
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	const token = localStorage.getItem('token');
	
	useEffect(() => {
		
		if ( token ) {		
			
			setIsAuthenticated(true);
			dispatch(startCheckingAuthToken(id));

		}else{
			setIsAuthenticated(false);
			dispatch(finishCheckingToken());
		}

		if (role === 'ADMIN_ROLE') {
			
			dispatch(startGettingUsers());
			dispatch(startGettingTransactions());
		}

	}, [token, id, dispatch, role])


	return (
		<Router>
				<div>
					<Switch>
						<PrivateRoute isAuthenticated={isAuthenticated} exact path='/' component={HomeScreen}  />
						<PublicRoute isAuthenticated={isAuthenticated} exact path='/login' component={LoginScreen}  />
						<PublicRoute isAuthenticated={isAuthenticated} exact path='/register' component={RegisterScreen}  />
						<PublicRoute isAuthenticated={isAuthenticated} exact path='/admin' component={AdminRegisterScreen}  />
						
						{
							( role === 'ADMIN_ROLE' )
								? (
									<Switch>
										<PrivateRoute isAuthenticated={isAuthenticated} exact path='/users-info' component={ UsersInfoScreen } />
										<PrivateRoute isAuthenticated={isAuthenticated} exact path='/transactions-info' component={  TransactionsInfoScreen } />

										<Redirect to='/login' />
									</Switch>
								)

								: (
									<Switch>
										<PrivateRoute isAuthenticated={isAuthenticated} exact path='/account-info' component={AcountInfoScreen}  />
										<PrivateRoute isAuthenticated={isAuthenticated} exact path='/transactions' component={TransactionsScreen}  />

										<Redirect to='/login' />
									</Switch>
								)
						}
	
						<Redirect to='/login' />
					</Switch>
				</div>
			</Router>
	)
}
