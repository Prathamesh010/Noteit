import { useQuery } from '@apollo/client'
import { Logout } from '@mui/icons-material'
import {
	Avatar,
	Button,
	IconButton,
	ListItemIcon,
	Menu,
	MenuItem,
} from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { GET_PROFILE_PIC } from 'graphql/queries'
import { RootState } from 'redux/reducers/rootReducer'
import { logoutUser } from 'redux/reducers/authReducer'
import { resetNoteState } from 'redux/reducers/notesReducer'

export const AuthAvatar = () => {
	const dispatch = useDispatch()
	const { isAuthenticated } = useSelector((state: RootState) => state.auth)
	const { data } = useQuery(GET_PROFILE_PIC, {
		skip: !isAuthenticated,
	})

	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
	const open = Boolean(anchorEl)

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget)
	}

	const handleClose = () => {
		setAnchorEl(null)
	}

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
				<>
					<IconButton
						onClick={handleClick}
						size="small"
						sx={{ ml: 2 }}
						aria-controls={open ? 'account-menu' : undefined}
						aria-haspopup="true"
						aria-expanded={open ? 'true' : undefined}
					>
						<Avatar src={data.me.picture} alt={data.me.name} />
					</IconButton>
					<Menu
						anchorEl={anchorEl}
						id="account-menu"
						open={open}
						onClose={handleClose}
						onClick={handleClose}
						PaperProps={{
							elevation: 0,
							sx: {
								overflow: 'visible',
								filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
								mt: 1.5,
								'& .MuiAvatar-root': {
									width: 32,
									height: 32,
									ml: -0.5,
									mr: 1,
								},
								'&:before': {
									content: '""',
									display: 'block',
									position: 'absolute',
									top: 0,
									right: 14,
									width: 10,
									height: 10,
									bgcolor: 'background.paper',
									transform: 'translateY(-50%) rotate(45deg)',
									zIndex: 0,
								},
							},
						}}
						transformOrigin={{
							horizontal: 'right',
							vertical: 'top',
						}}
						anchorOrigin={{
							horizontal: 'right',
							vertical: 'bottom',
						}}
					>
						<MenuItem>
							<span>{data.me.name}</span>
						</MenuItem>
						<MenuItem
							onClick={() => {
								dispatch(logoutUser())
								dispatch(resetNoteState())
							}}
						>
							<ListItemIcon>
								<Logout fontSize="small" />
							</ListItemIcon>
							Logout
						</MenuItem>
					</Menu>
				</>
			) : (
				<Avatar>L</Avatar>
			)}
		</>
	)
}
