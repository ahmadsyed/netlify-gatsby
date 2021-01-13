import { navigate } from 'gatsby';
import React, { useEffect, useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Table } from 'react-bootstrap';
import 'react-tabs/style/react-tabs.css';
import Layout from '../../components/Layout';
import _ from 'lodash';

const Profile = () => {
	const userId = localStorage.getItem('customerId');
	const [orderArr, setOrderArr] = useState([]);
  const [jsonColumn, setJsonColumn] = useState([
		{ col: 'Date', width: '70' },
		{ col: 'Order', width: '120' },
		{ col: 'Origin', width: '120' },
		{ col: 'Total', width: '120' },
	]);
  
	if (!localStorage.getItem('customerId')) {
		navigate('/');
	}

	useEffect( () => {
		fetchCustomerOrder().then((userOrder) => {
			console.log('userData---', userOrder);
			if (userOrder) {
				console.log('userOrder----', userOrder);
				setOrderArr(userOrder);
			}
			else{
				setOrderArr([])
			}
		});
	}, []);

	const fetchCustomerOrder = async () => {
		const res =  await fetch(
			`/.netlify/functions/bigcommerce?endpoint=orders?customer_id=` + userId,
			{
				credentials: 'same-origin',
				mode: 'same-origin',
			}
		);
		console.log('res---',res.status)
		if(res.status==200){
			return await res.json();
		}
		else
		return false;
	};

	return (
		<Layout>
      <div className='container'>
      <Tabs>
				<TabList>
					<Tab>Account</Tab>
					<Tab>Order History</Tab>
				</TabList>

				<TabPanel>
					<ul>
						<li>
							Name:{' '}
							{localStorage.getItem('first_name')
								? localStorage.getItem('first_name')
								: ''}
						</li>
						<li>
							E-mail:{' '}
							{localStorage.getItem('email')
								? localStorage.getItem('email')
								: ''}
						</li>
					</ul>
				</TabPanel>
				<TabPanel>
					<Table>
          <thead>
								<tr>
									<th className='th-ele'>Date</th>
									<th className='th-ele'>Order ID</th>
									<th className='th-ele'>Country</th>
									<th className='th-ele'>Total</th>
								</tr>
							</thead>
							<tbody>
						{orderArr
							? (_.map(orderArr, (obj, i) => {
                return (<tr key={i}>
                <td>{_.capitalize(obj.date_created)}</td>
                <td>{_.capitalize(obj.id)}</td>
                <td>{_.capitalize(obj.geoip_country)}</td>
                <td>{_.capitalize(obj.total_inc_tax)}</td>
                </tr>)
                
              }))
							: null}
              </tbody>
					</Table>
				</TabPanel>
			</Tabs>
      </div>
			
		</Layout>
	);
};

export default Profile;
