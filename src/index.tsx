import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import store from './redux/store';
import App from './App';
import CssBaseline from '@mui/material/CssBaseline';

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<CssBaseline />
			<App />
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);
