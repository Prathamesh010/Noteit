import { createSlice } from '@reduxjs/toolkit'
import { setUserProperties } from 'firebase/analytics'

import { analytics } from 'App'

const themeSlice = createSlice({
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

export const themeReducer = themeSlice.reducer
export const { toggleTheme } = themeSlice.actions
