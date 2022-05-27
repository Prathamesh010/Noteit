import { Button } from '@mui/material'
import { Link } from 'react-router-dom'

const AuthAvatar = () => {
	return (
		<Link to="/login" style={{ textDecoration: 'none', color: '#FFF' }}>
			<Button color="inherit">Login</Button>
		</Link>
	)
}

export default AuthAvatar
