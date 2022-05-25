import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { Button } from '@mui/material'

const Login = () => {
	const provider = new GoogleAuthProvider()

	const GoogleSignIn = () => {
		const auth = getAuth()
		signInWithPopup(auth, provider)
			.then((result) => {
				const credential =
					GoogleAuthProvider.credentialFromResult(result)
				const accessToken = credential?.accessToken

				if (accessToken) {
					// post to server
				} else {
					console.log('Access token not found')
				}
			})
			.catch((error) => {
				console.log(error)
			})
	}

	return (
		<div>
			<Button onClick={GoogleSignIn}>Sign In With Google</Button>
		</div>
	)
}

export default Login
