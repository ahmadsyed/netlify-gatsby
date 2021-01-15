import { navigate } from 'gatsby';
import React, { useState } from 'react';
import * as EmailValidator from 'email-validator';
import 'react-tabs/style/react-tabs.css';
import Layout from '../../components/Layout';
import _ from 'lodash';
import { Button } from 'react-bootstrap';
import { postApiData, isValidPassword } from '../../utility/Api';
import PageLoader from '../../utility/PageLoader';

const ResetPassword = (props) => {
	const [email, setEmail] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [errorLog, setErrorLog] = useState('');
	const [successLog, setSuccessLog] = useState('');
	const [validationErrorLog, setValidationErrorLog] = useState('');
	const [loaderDiv, setLoaderDiv] = useState(false);

	// console.log('token----', props.token);
	// console.log('userId----', props.userId);

	const handleValidation = (name, value) => {
		if (name == 'newPassword') {
			setNewPassword(value);
			if (!isValidPassword(newPassword)) {
				setErrorLog(
					'The password should be alphanumeric and more than 7 character long.'
				);
			}
			else{
				setErrorLog('');
			}
			if (confirmPassword != '') {
				if (value != confirmPassword) {
					setValidationErrorLog('Password not matched with confirm password.');
					return false;
				} else {
					setValidationErrorLog('');
					return true;
				}
			}
			console.log('newPassword----', newPassword);
		} else if (name == 'confirmPassword') {
			setConfirmPassword(value);
			if (newPassword != '') {
				if (value != newPassword) {
					setValidationErrorLog(
						'Confirm password not matched with new password.'
					);
					return false;
				} else {
					setValidationErrorLog('');
					return true;
				}
			}
			console.log('confirmPassword----', confirmPassword);
		} else {
			return true;
		}
	};

	const sendRespone = async () => {
		if (!validationErrorLog) {
			setLoaderDiv(true);
			//send token to check and test if it is valid
			let where = [
				{
					url: '/validateToken',
				},
			];
			var method = 'post';
			let data = {
				token: props.token,
				userId: props.userId,
			};
			postApiData(where, data, method, true).then((res) => {
				console.log('res---', res);
				console.log('res.data---', res.data);
				if (res.data && res.data.status == 'success') {
					//update password in Bigcommerce
					console.log('update in BC');
					const passwordData = [
						{
							id: 3,
							authentication: {
								new_password: newPassword,
							},
						},
					];
					fetch(`/.netlify/functions/bigcommerce?endpoint=customers`, {
						method: 'PUT',
						credentials: 'same-origin',
						mode: 'same-origin',
						body: JSON.stringify(passwordData),
					})
						.then((response) => {
							console.log(response);
							return response.json();
							//store user details in storage for display
						})
						.then((passUpdate) => {
							if (passUpdate) {
								//logged in and move to profile page
								setLoaderDiv(false);
								setSuccessLog(
									'Password updated, please login with new password.'
								);
								setNewPassword('');
								setConfirmPassword('');
							} else {
								setLoaderDiv(false);
								setErrorLog('Password not updated, please try again.');
							}
						})
						.catch((error) => {
							setLoaderDiv(false);
							console.error(error);
						});
				} else {
					setLoaderDiv(false);
					setErrorLog(
						'The link expired or invalid please generate new request.'
					);
				}
			});
		} else {
			setErrorLog('Email is invalid.');
		}
	};

	return (
		<Layout>
			<div className='container'>
				<div className='container'>
					<span style={{ color: 'green' }}>
						{successLog ? successLog : null}
					</span>
					<br></br>
					<span style={{ color: 'red' }}>{errorLog ? errorLog : null}</span>
					<br></br>
					<span style={{ color: 'red' }}>
						{validationErrorLog ? validationErrorLog : null}
					</span>
					<br></br>
				</div>
				<div className='form-group'>
					{loaderDiv ? (
						<div style={{ textAlign: 'center' }}>
							<PageLoader />
						</div>
					) : null}
					<label>New Password</label>
					<input
						type='password'
						className='form-control'
						placeholder='Enter new password'
						name='newPassword'
						value={newPassword}
						onChange={(e) => handleValidation('newPassword', e.target.value)}
					/>
				</div>
				<div className='form-group'>
					<label>Confirm Password</label>
					<input
						type='password'
						className='form-control'
						placeholder='Enter confirm password'
						name='confirmPassword'
						value={confirmPassword}
						onChange={(e) =>
							handleValidation('confirmPassword', e.target.value)
						}
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

export default ResetPassword;
