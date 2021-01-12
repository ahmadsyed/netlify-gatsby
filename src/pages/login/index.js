import React, { useEffect, useState } from 'react';
import { navigate } from 'gatsby';
import { isLoggedIn } from './../../services/auth';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../register/register.css';
import Layout from '../../components/Layout';
import { Button } from 'react-bootstrap';
import PageLoader from '../../utility/PageLoader';

// const jwt = require('jsonwebtoken');
// const { v4: uuidv4 } = require('uuid');

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errorMessage, setError] = useState('');
	const [loaderDiv, setLoaderDiv] = useState(false);
	const [isChecked, setIsChecked] = useState(false);

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
	// 			const storeUrl ='https://test-product.mybigcommerce.com';
	// 			const loginUrl = getLoginUrl(customerId, storeHash, storeUrl, clientId, clientSecret);
	// 			navigate(loginUrl);

	// 		} else {
	// 			setError('Email is not registered.');
	// 		}
	// 	});
	// };

	useEffect(async () => {
		if (localStorage.checkbox == 'true' && localStorage.email !== '') {
			setEmail(localStorage.email);
			setPassword(localStorage.password);
			setIsChecked(true);
		} else {
			setIsChecked(false);
		}
	}, []);

	const onChangeCheckbox = (event) => {
		setIsChecked(event.target.checked);
	};

	const handleSubmit = () => {
		setLoaderDiv(true);
		checkUser(email).then((userData) => {
			if (userData) {
				let customer_id = userData.data[0].id;
				let company = userData.data[0].company;
				let first_name = userData.data[0].first_name;
				let last_name = userData.data[0].last_name;
				let phone = userData.data[0].phone;
				const passwordData = {
					password: password,
				};

				if (isChecked && email !== '') {
					localStorage.email = email;
					localStorage.password = password;
					localStorage.checkbox = isChecked;
				} else {
					localStorage.setItem('checkbox', isChecked);
					localStorage.removeItem('password');
				}

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
						console.log(response);
						return response.json();
						//store user details in storage for display
					})
					.then((IsCustomer) => {
						if (IsCustomer.success) {
							//logged in and move to profile page
							setLoaderDiv(false);
							setError('');
							localStorage.setItem('customerId', customer_id);
							localStorage.setItem('email', email);
							localStorage.setItem('company', company);
							localStorage.setItem('first_name', first_name);
							localStorage.setItem('last_name', last_name);
							localStorage.setItem('phone', phone);
							localStorage.setItem('isLoggedIn', true);
							navigate('/profile');
						} else {
							setLoaderDiv(false);
							setError('Incorrect credentials. Try with correct credentials');
						}
					})
					.catch((error) => {
						console.error(error);
					});
			} else {
				setLoaderDiv(false);
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
		navigate(`/profile`);
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
					{loaderDiv ? (
						<div style={{ textAlign: 'center' }}>
							<PageLoader />
						</div>
					) : null}
					<div className='form-group'>
						<label>Email</label>
						<input
							type='email'
							className='form-control'
							placeholder='Enter Email'
							name='email'
							value={localStorage.checkbox ? email : ''}
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
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>

					<div className='form-group'>
						<div>
							<input
								type='checkbox'
								checked={isChecked}
								name='lsRememberMe'
								onChange={(e) => onChangeCheckbox(e)}
							/>
							<label>Remember me</label>
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
							<a href='/forgotPassword'>password? </a>
						</p>
					</div>
				</div>
			</form>
		</Layout>
	);
};

export default Login;
