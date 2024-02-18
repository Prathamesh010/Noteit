import { Button, IconButton, useMediaQuery, useTheme } from '@mui/material'
import { FC } from 'react'

export const ResponsiveButton: FC<any> = ({ children, ...props }) => {
	const theme = useTheme()
	const desktop = useMediaQuery(theme.breakpoints.up('lg'))
	const tablet = useMediaQuery(theme.breakpoints.up('sm'))
	const mobile = useMediaQuery(theme.breakpoints.up('xs'))

	const button = () => {
		const { startIcon, ...IconProps } = props
		if (desktop || tablet) return <Button {...props}>{children}</Button>
		else if (mobile)
			return (
				<IconButton {...IconProps} color="primary">
					{startIcon}
				</IconButton>
			)
	}
	return <>{button()}</>
}
