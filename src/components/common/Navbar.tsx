import { AppBar, Toolbar, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { FC } from 'react'
import { Link } from 'react-router-dom'
import AuthAvatar from './AuthAvatar'

import ThemeSwitch from './ThemeSwitch'

interface NavbarProps {
	theme: string
	toggleTheme: () => void
}

const Navbar: FC<NavbarProps> = (props) => {
	const { theme, toggleTheme } = props
	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Toolbar>
					<Typography
						variant="h6"
						component="div"
						sx={{ flexGrow: 1 }}
						color="text.secondary"
					>
						<Link
							to="/"
							style={{ textDecoration: 'none', color: '#FFF' }}
						>
							Note it !
						</Link>
					</Typography>
					<ThemeSwitch
						value="check"
						checked={theme === 'dark'}
						onChange={() => toggleTheme()}
					/>
					<AuthAvatar />
				</Toolbar>
			</AppBar>
		</Box>
	)
}

export default Navbar
