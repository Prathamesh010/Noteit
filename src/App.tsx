import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from './components/common/Navbar';
import { RootState, toggleTheme } from './redux/reducers/themeReducer';
import { ThemeProvider } from '@mui/material';
import { darkTheme, lightTheme } from './theme';

const App = () => {
	const theme = useSelector((state: RootState) => state.theme);
	const dispatch = useDispatch();
	return (
		<ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
			<Navbar
				theme={theme}
				toggleTheme={() => {
					dispatch(toggleTheme());
				}}
			/>
		</ThemeProvider>
	);
};

export default App;
