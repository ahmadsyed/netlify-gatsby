import React, { useState } from 'react';
import { navigate } from 'gatsby';
import { handleLogin, isLoggedIn } from './../../services/auth';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../register/register.css';
import Layout from '../../components/Layout';
import { Button } from 'react-bootstrap';

// const jwt = require('jsonwebtoken');
// const { v4: uuidv4 } = require('uuid');

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errorMessage, setError] = useState('');

	// const getLoginUrl=(customerId, storeHash, storeUrl, clientId, clientSecret)=> {
	// 	console.log('clientSecret---',clientSecret)
	// 	console.log('clientId---',clientId)
	// 	console.log('storeUrl---',storeUrl)
	// 	console.log('storeHash---',storeHash)
	// 	console.log('customerId---',customerId)
	// 	const dateCreated = Math. round((new Date()). getTime() / 1000);
	// 	const  payload = {
	// 		"iss": clientId,
	// 		"iat": dateCreated,
	// 		"jti": uuidv4(),
	// 		"operation": "customer_login",
	// 		"store_hash": storeHash,
	// 		"customer_id": customerId,
	// 	}
	// 	let token = jwt.sign(payload, clientSecret, {algorithm:'HS256'});
	// 	return `${storeUrl}/login/token/${token}`;
	//  };

	// const handleSubmit = () => {
	// 	console.log('handleSubmit---', email, '---passs----', password);
	// 	checkUser(email).then((userData) => {
	// 		console.log('userData---', userData);
	// 		if (userData) {

	// 			const clientId = process.env.API_CLIENT_ID;
	// 			const clientSecret = process.env.API_SECRET;
	// 			const customerId = userData.data[0].id;
	// 			const storeHash = process.env.API_STORE_HASH;
	// 			const storeUrl ='https://store-p7yh4d2thd.mybigcommerce.com/';
	// 			const loginUrl = getLoginUrl(customerId, storeHash, storeUrl, clientId, clientSecret);
	// 			console.log(loginUrl);
	// 			// fetch(
	// 			// 	`/.netlify/functions/bigcommerce?endpoint=customers/${customer_id}/validate`,
	// 			// 	{
	// 			// 		method:'POST',
	// 			// 		credentials: 'same-origin',
	// 			// 		mode: 'same-origin',
	// 			// 		body: JSON.stringify({"password":password}),
	// 			// 	}
	// 			// )
	// 			// 	.then((response) => {
	// 			// 		console.log('first---',response);
	// 			// 		response.json();
	// 			// 	})
	// 			// 	.then((IsCustomer)=> {
	// 			// 		console.log('second---', IsCustomer);
	// 			// 		if(IsCustomer){
	// 			// 			//logged in and move to profile page
	// 			// 			setError('');
	// 			// 		}
	// 			// 		else{
	// 			// 			setError('Incorrect credentials.');
	// 			// 		}

	// 			// 	})
	// 			// 	.catch((error) => {
	// 			// 		console.error(error);
	// 			// 	});
	// 		} else {
	// 			setError('Email is not registered.');
	// 		}
	// 	});
	// };
	const handleSubmit = () => {
		console.log('handleSubmit---', email, '---passs----', password);
		checkUser(email).then((userData) => {
			console.log('userData---', userData);
			if (userData) {
				let customer_id = userData.data[0].id;
				console.log('customer_id---', customer_id);
				const passwordData = {
						password: password
					};
				fetch(
					`/.netlify/functions/bigcommerce?endpoint=customers/${customer_id}/validate`,
					{
						method: 'POST',
						credentials: 'same-origin',
						mode: 'same-origin',
						body: JSON.stringify(passwordData),
					}
				)
					.then((response) => {
						console.log('first---');
						console.log(response);
						JSON.stringify(response);
						//store user details in storage for display
					})
					.then((IsCustomer) => {
						console.log('second---', IsCustomer);
						if (IsCustomer) {
							//logged in and move to profile page
							setError('');
						} else {
							setError('Incorrect credentials.');
						}
					})
					.catch((error) => {
						console.error(error);
					});
			} else {
				setError('Email is not registered.');
			}
		});
	};

	const checkUser = async (email) => {
		const res = await fetch(
			`/.netlify/functions/bigcommerce?endpoint=customers?email:in=` + email,
			{
				credentials: 'same-origin',
				mode: 'same-origin',
			}
		);
		return await res.json();
	};

	if (isLoggedIn()) {
		console.log('test---');
		navigate(`/profile`);
	} else {
		console.log('else test---');
	}

	const closeErrorAlert = () => {
		setError('');
	};

	return (
		<Layout>
			<form style={{ border: '1px solid #ccc' }}>
				<div className='container'>
					{errorMessage ? (
						<div className='alert alert-danger alert-dismissible'>
							<a
								href='#'
								className='close'
								data-dismiss='alert'
								aria-label='close'
								onClick={() => closeErrorAlert()}
							>
								&times;
							</a>
							<strong>{errorMessage}</strong>
						</div>
					) : null}
					<h3 style={{ textAlign: 'center' }}>Sign In</h3>

					<div className='form-group'>
						<label>Email</label>
						<input
							type='email'
							className='form-control'
							placeholder='Enter Email'
							name='email'
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>

					<div className='form-group'>
						<label>Password</label>
						<input
							type='password'
							className='form-control'
							placeholder='Enter password'
							name='password'
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>

					<div className='form-group'>
						<div className='custom-control custom-checkbox'>
							<input
								type='checkbox'
								className='custom-control-input'
								id='customCheck1'
							/>
							<label className='custom-control-label' htmlFor='customCheck1'>
								Remember me
							</label>
						</div>
					</div>
					<div className='clearfix'>
						<Button
							className='signupbtn'
							id='addsignup'
							onClick={() => handleSubmit()}
						>
							Submit
						</Button>
						<p className='forgot-password text-right'>
							<a href='/register'>Signup?</a> / Forgot{' '}
							<a href='#'>password? </a>
						</p>
					</div>
				</div>
			</form>
		</Layout>
	);
};

export default Login;
