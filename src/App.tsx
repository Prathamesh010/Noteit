import './App.css'
import { useDispatch, useSelector } from 'react-redux'
import Navbar from './components/common/Navbar'
import { toggleTheme } from './redux/reducers/themeReducer'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { darkTheme, lightTheme } from './theme'
import Home from './components/home'
import { RootState } from './redux/reducers/rootReducer'
import FlashMessage from './components/common/FlashMessage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './components/auth/login'
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import firebaseConfig from './common/firebaseConfig'
import { ApolloProvider } from '@apollo/client'
import createApolloClient from './apolloClient'

export const client = createApolloClient()
const app = initializeApp(firebaseConfig)
export const analytics = getAnalytics(app)

const App = () => {
	const theme = useSelector((state: RootState) => state.theme.theme)
	const dispatch = useDispatch()

	return (
		<ApolloProvider client={client}>
			<ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
				<BrowserRouter>
					<CssBaseline />
					<FlashMessage />
					<Navbar
						theme={theme}
						toggleTheme={() => {
							dispatch(toggleTheme())
						}}
					/>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/login" element={<Login />} />
					</Routes>
				</BrowserRouter>
			</ThemeProvider>
		</ApolloProvider>
	)
}

export default App
