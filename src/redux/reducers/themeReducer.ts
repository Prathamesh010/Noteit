import { createSlice } from '@reduxjs/toolkit'

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
		},
	},
})

export const { toggleTheme } = themeReducer.actions
export default themeReducer.reducer
