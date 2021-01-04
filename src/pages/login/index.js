import React, { useState } from 'react';
import { navigate } from 'gatsby';
import { handleLogin, isLoggedIn } from './../../services/auth';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../register/register.css';
import Layout from '../../components/Layout';
import { Button } from 'react-bootstrap';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errorMessage, setError] = useState('');

	const handleSubmit = () => {
		console.log('handleSubmit---', email, '---passs----', password);
		checkUser(email).then((userData) => {
			console.log('userData---', userData);
			if (userData) {
				let customer_id = userData.data[0].id;
				console.log('customer_id---', customer_id);
				
				fetch(
					`/.netlify/functions/bigcommerce?endpoint=customers/${customer_id}/validate`,
					{
						method:'POST',
						credentials: 'same-origin',
						mode: 'same-origin',
						body: JSON.stringify({"password":password}),
					}
				)
					.then((response) => {
						console.log('first---',response);
						response.json();
					})
					.then((IsCustomer)=> {
						console.log('second---', IsCustomer);
						if(IsCustomer){
							//logged in and move to profile page
							setError('');
						}
						else{
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
