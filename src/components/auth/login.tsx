import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { Button } from '@mui/material'
import { useLazyQuery } from '@apollo/client'
import { LOGIN_USER } from '../../graphql/queries'
import { loginUser } from '../../redux/reducers/authReducer'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RootState } from '../../redux/reducers/rootReducer'
import { useEffect } from 'react'

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
		<div>
			<Button onClick={GoogleSignIn}>Google Sign In</Button>
		</div>
	)
}

export default Login
