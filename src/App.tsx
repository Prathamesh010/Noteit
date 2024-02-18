import { ApolloProvider } from '@apollo/client'
import firebaseConfig from 'common/firebaseConfig'
import Login from 'components/auth/login'
import { FlashMessage, Navbar } from 'components/common'
import Home from 'components/home'
import { CssBaseline, ThemeProvider } from '@mui/material'
import createApolloClient from 'apolloClient'
import { getAnalytics } from 'firebase/analytics'
import { initializeApp } from 'firebase/app'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { darkTheme, lightTheme } from 'theme'
import 'App.css'
import { RootState, toggleTheme } from 'redux/reducers'

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
						toggleTheme={() => dispatch(toggleTheme())}
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
