import { createTheme } from '@mui/material'

export const lightTheme = createTheme({
	palette: {
		primary: {
			main: '#d12e2e',
			light: '#797b7b',
			dark: '#8f3127',
		},
		secondary: {
			main: '#4e4e4e',
			light: '#717171',
			dark: '#4E4E4E',
			contrastText: '#eae9e9',
		},
		background: {
			default: '#d6d6d6',
		},
		text: {
			primary: 'rgba(20,20,20,0.87)',
			secondary: '#ffffff',
		},
	},
	typography: {
		fontFamily: '"Roboto Condensed", "Helvetica", "Arial", sans-serif',
	},
})

export const darkTheme = createTheme({
	palette: {
		primary: {
			main: '#474646',
			light: '#5F6368',
			dark: '#b3afaf',
		},
		secondary: {
			main: '#b8b6b6',
			light: '#b8b6b6',
			dark: '#000000',
		},
		divider: 'rgba(243,241,241,0.12)',
		background: {
			paper: '#202124',
			default: '#202124',
		},
		text: {
			secondary: '#ffffff',
			primary: '#eaeaea',
			disabled: 'rgba(218,214,214,0.5)',
		},
	},
	typography: {
		fontFamily: '"Roboto Condensed", "Helvetica", "Arial", sans-serif',
	},
})
