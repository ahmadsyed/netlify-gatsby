import React from 'react';
import { Router } from '@reach/router';
import Reset from './reset/index';

const App = () => (
	<Router basepath='/app'>
		<Reset path='/reset/:userId/:token' />
	</Router>
);

export default App;
