import { Button } from '@mui/material'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { RootState } from '../../redux/reducers/rootReducer'

const AuthAvatar = () => {
	const { isAuthenticated, user } = useSelector(
		(state: RootState) => state.auth
	)

	return (
		<>
			{!isAuthenticated ? (
				<Link
					to="/login"
					style={{ textDecoration: 'none', color: '#FFF' }}
				>
					<Button color="inherit">Login</Button>
				</Link>
			) : (
				<Button color="inherit">{user.name}</Button>
			)}
		</>
	)
}

export default AuthAvatar
