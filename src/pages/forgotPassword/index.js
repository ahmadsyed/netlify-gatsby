import { navigate } from 'gatsby';
import React, { useState } from 'react';
import * as EmailValidator from 'email-validator';
import 'react-tabs/style/react-tabs.css';
import Layout from '../../components/Layout';
import _ from 'lodash';
import { Button } from 'react-bootstrap';

const ForgotPassword = () => {
	const [email, setEmail] = useState('');
	const [errorLog, setErrorLog] = useState('');

	const sendRespone = async () => {
		if (EmailValidator.validate(email)) {
			setErrorLog('');
			let randomPass = _.times(10, () => _.random(35).toString(36)).join('');
			console.log('randomPass---', randomPass);
			//sent in email the random password
			//update the random password for the customer as per the email
		} else {
			setErrorLog('Email is invalid.');
		}

		// const res = await fetch(
		// 	`/.netlify/functions/bigcommerce?endpoint=orders?customer_id=` + userId,
		// 	{
		// 		credentials: 'same-origin',
		// 		mode: 'same-origin',
		// 	}
		// );
		// return await res.json();
	};

	return (
		<Layout>
			<div className='container'>
				<div className='container'>
					<span style={{ color: 'red' }}>
						{errorLog?errorLog:null}
					</span>
				</div>
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
				<div className='clearfix'>
					<Button
						className='signupbtn'
						id='resetPassword'
						onClick={() => sendRespone()}
					>
						Submit
					</Button>
				</div>
			</div>
		</Layout>
	);
};

export default ForgotPassword;
