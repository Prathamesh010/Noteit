import { createSlice } from '@reduxjs/toolkit'
import { setUserProperties } from 'firebase/analytics'
import { analytics } from '../../App'

const themeReducer = createSlice({
	name: 'theme',
	initialState: {
		theme: localStorage.getItem('theme') || 'dark',
	},
	reducers: {
		toggleTheme: (state) => {
			localStorage.setItem(
				'theme',
				state.theme === 'light' ? 'dark' : 'light'
			)
			state.theme = state.theme === 'light' ? 'dark' : 'light'
			setUserProperties(analytics, { theme: state.theme })
		},
	},
})

export const { toggleTheme } = themeReducer.actions
export default themeReducer.reducer
