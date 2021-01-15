import { navigate } from 'gatsby';
import React, { useState } from 'react';
import * as EmailValidator from 'email-validator';
import 'react-tabs/style/react-tabs.css';
import Layout from '../../components/Layout';
import _ from 'lodash';
import { Button } from 'react-bootstrap';
import {postApiData} from '../../utility/Api';
import PageLoader from '../../utility/PageLoader';

const ForgotPassword = (props) => {
	const [email, setEmail] = useState('');
	const [errorLog, setErrorLog] = useState('');
	const [successLog, setSuccessLog] = useState('');
	const [loaderDiv, setLoaderDiv] = useState(false);
	
	const sendRespone = async () => {
		if (EmailValidator.validate(email)) {
			setErrorLog('');
			setLoaderDiv(true);
			//check email if exists
			checkUser(email).then((userData) => {
				if (userData.data.length>0) {
                    let userId = userData.data[0].id;
                    let where = [{
                        url: "/forgotPassword"
                        }];
                        var method = 'post';
                        let data = {
                            'email':email,
                            'userId':userId,
                        };
                       postApiData(where, data, method,true).then(res => {
                         if (res.data && res.data.status=="success"){
							setLoaderDiv(false);
                            setSuccessLog(res.data.message)
						 }
						 else{
							setLoaderDiv(false);
						 }
                       })
                }
                else{
					setLoaderDiv(false);
                    setErrorLog('Sorry email doesn not exists in the system.');
                    return false;
                }
			});
		} else {
			setErrorLog('Email is invalid.');
		}
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

	return (
		<Layout>
			<div className='container'>
				<div className='container'>
					<span style={{ color: 'red' }}>{errorLog ? errorLog : null}</span>
                    <span style={{ color: 'green' }}>{successLog ? successLog : null}</span>
				</div>
				<div className='form-group'>
				{loaderDiv ? (
						<div style={{ textAlign: 'center' }}>
							<PageLoader />
						</div>
					) : null}
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
