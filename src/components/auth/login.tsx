import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { Button, Grid } from '@mui/material'
import { useLazyQuery } from '@apollo/client'
import { LOGIN_USER } from '../../graphql/queries'
import { loginUser } from '../../redux/reducers/authReducer'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RootState } from '../../redux/reducers/rootReducer'
import { useEffect } from 'react'
import { Google } from '@mui/icons-material'

const Login = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const isAuthenticated = useSelector(
		(state: RootState) => state.auth.isAuthenticated
	)

	useEffect(() => {
		if (isAuthenticated) {
			navigate('/')
		}
	}, [isAuthenticated, navigate])

	const [login, { loading, error }] = useLazyQuery(LOGIN_USER, {
		onCompleted: (data) => {
			dispatch(loginUser(data.login))
		},
	})

	const GoogleSignIn = () => {
		const provider = new GoogleAuthProvider()
		const auth = getAuth()
		signInWithPopup(auth, provider)
			.then((result) => {
				const credential =
					GoogleAuthProvider.credentialFromResult(result)
				const token = credential?.accessToken
				login({ variables: { token } })
			})
			.catch((error) => {
				console.log(error)
			})
	}

	if (loading) return <p>Loading...</p>
	if (error) return <p>Error: {error.message}</p>

	return (
		<Grid
			container
			spacing={0}
			direction="column"
			alignItems="center"
			justifyContent="center"
			style={{ minHeight: '50vh' }}
		>
			<Grid item xs={3}>
				<Button
					onClick={GoogleSignIn}
					startIcon={<Google />}
					variant="contained"
					color="secondary"
					sx={{
						':hover': {
							bgcolor: 'primary.main', // theme.palette.primary.main
							color: 'white',
						},
					}}
				>
					Google Sign In
				</Button>
			</Grid>
		</Grid>
	)
}

export default Login
