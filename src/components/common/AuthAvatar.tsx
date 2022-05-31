import { useQuery } from '@apollo/client'
import { Avatar, Button } from '@mui/material'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { GET_PROFILE_PIC } from '../../graphql/queries'
import { RootState } from '../../redux/reducers/rootReducer'

const AuthAvatar = () => {
	const { isAuthenticated } = useSelector((state: RootState) => state.auth)
	const { data } = useQuery(GET_PROFILE_PIC, {
		skip: !isAuthenticated,
	})

	return (
		<>
			{!isAuthenticated ? (
				<Link
					to="/login"
					style={{ textDecoration: 'none', color: '#FFF' }}
				>
					<Button color="inherit">Login</Button>
				</Link>
			) : data ? (
				<Avatar src={data.me.picture} alt={data.me.name} />
			) : (
				<Avatar>L</Avatar>
			)}
		</>
	)
}

export default AuthAvatar
