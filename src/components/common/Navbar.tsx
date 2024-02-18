import { GitHub } from '@mui/icons-material'
import { AppBar, IconButton, Toolbar, Tooltip, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { FC } from 'react'
import { Link } from 'react-router-dom'

import { ThemeSwitch, AuthAvatar } from 'components/common'

interface NavbarProps {
	theme: string
	toggleTheme: () => void
}

export const Navbar: FC<NavbarProps> = (props) => {
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
					<Tooltip title={`Leave a Star 🌟`} placement="bottom">
						<IconButton
							onClick={() => {
								window.open(
									'https://github.com/Prathamesh010/Noteit/',
									'_blank'
								)
							}}
							sx={{
								marginLeft: '1rem',
								color: '#FFF',
							}}
						>
							<GitHub />
						</IconButton>
					</Tooltip>
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
