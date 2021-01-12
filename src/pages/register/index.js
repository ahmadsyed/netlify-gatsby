import React, { useState } from 'react';
import { navigate } from 'gatsby';
import { handleLogin, isLoggedIn } from '../../services/auth';
import { Button } from 'react-bootstrap';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './register.css';
import Layout from '../../components/Layout';
import _ from 'lodash';
import PageLoader from '../../utility/PageLoader';

const Register = () => {
	const [first_name, setFirstName] = useState('');
	const [last_name, setLastName] = useState('');
	const [company, setCompany] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errorLog, setErrorLog] = useState([]);
	const [loaderDiv, setLoaderDiv] = useState(false);

	const handleSubmit = () => {
		setLoaderDiv(true);
		const SignupData = [
			{
				email: email,
				first_name: first_name,
				last_name: last_name,
				company: company,
				authentication: {
					force_password_reset: true,
					new_password: password,
				},
			},
		];

		fetch(`/.netlify/functions/bigcommerce?endpoint=customers`, {
			method: 'POST',
			credentials: 'same-origin',
			mode: 'same-origin',
			body: JSON.stringify(SignupData),
		})
			.then((response) => {
				return response.json();
			})
			.then(function(user) {
				console.log('data---', user);
				if (user.errors) {
					setLoaderDiv(false);
					setErrorLog(user.errors);
					window.scrollTo(0, 0);
				} else {
					setLoaderDiv(false);
					console.log('firstName---', user.data[0].first_name);
					navigate('/login');
				}
			})
			.catch((error) => {
				console.error(error);
			});
	};

	if (isLoggedIn()) {
		console.log('test---');
		navigate(`/profile`);
	} else {
		console.log('else test---');
		console.log('error logs---', errorLog);
	}

	return (
		<Layout>
			<form style={{ border: '1px solid #ccc' }}>
				<div className='container'>
					<h3 style={{ textAlign: 'center' }}>Sign Up</h3>
					{loaderDiv ? (
						<div style={{ textAlign: 'center' }}>
							<PageLoader />
						</div>
					) : null}
					<div className='container'>
						<span style={{ color: 'red' }}>
							<ol>
								{_.map(errorLog, (obj, i) => {
									return <li key={i}>{_.capitalize(obj)}</li>;
								})}
							</ol>
						</span>
					</div>
					<div className='form-group'>
						<label>First Name</label><span style={{"color":"red"}}>*</span>
						<input
							type='text'
							className='form-control'
							placeholder='Enter First Name'
							name='first_name'
							onChange={(e) => setFirstName(e.target.value)}
						/>
					</div>
					<div className='form-group'>
						<label>Last Name</label><span style={{"color":"red"}}>*</span>
						<input
							type='text'
							className='form-control'
							placeholder='Enter Last Name'
							name='last_name'
							onChange={(e) => setLastName(e.target.value)}
						/>
					</div>

					<div className='form-group'>
						<label>Company</label><span style={{"color":"red"}}>*</span>
						<input
							type='text'
							className='form-control'
							placeholder='Company'
							name='company'
							onChange={(e) => setCompany(e.target.value)}
						/>
					</div>

					<div className='form-group'>
						<label>Password</label>&nbsp;<span style={{"color":"red", fontSize:'10px'}}>(passwords must be at least 7 characters and contain both alphabetic and numeric characters.)*</span>
						<input
							type='password'
							className='form-control'
							placeholder='Enter password'
							name='password'
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>

					<div className='form-group'>
						<label>Email</label><span style={{"color":"red"}}>*</span>
						<input
							type='email'
							className='form-control'
							placeholder='Enter email'
							name='email'
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<div className='clearfix'>
						<Button
							className='signupbtn'
							id='addsignup'
							onClick={() => handleSubmit()}
						>
							Submit
						</Button>
					</div>
				</div>

				{/* <button type="submit" className="btn btn-primary btn-block" onClick={() => handleSubmit()}>Submit</button> */}
			</form>
		</Layout>
	);
};

export default Register;
