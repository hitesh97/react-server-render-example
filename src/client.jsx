import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
const App = require('./app/App').default;

ReactDOM.hydrate((
	<BrowserRouter>
		<App />
	</BrowserRouter>
), document.getElementById('root'));