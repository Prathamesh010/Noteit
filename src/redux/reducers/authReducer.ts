import { createSlice } from '@reduxjs/toolkit'
import { User } from '../../common'

export const EmptyUser: User = {
	id: '',
	name: '',
	email: '',
	picture: '',
}

const initialState = {
	isAuthenticated: localStorage.getItem('accessToken') !== null,
	accessToken: localStorage.getItem('accessToken') || '',
	refreshToken: localStorage.getItem('refreshToken') || '',
}

const authReducer = createSlice({
	name: 'auth',
	initialState: initialState,
	reducers: {
		loginUser: (state, action) => {
			state.isAuthenticated = true
			state.accessToken = action.payload.accessToken
			state.refreshToken = action.payload.refreshToken
			localStorage.setItem('accessToken', state.accessToken)
			localStorage.setItem('refreshToken', state.refreshToken)
		},
		refreshToken: (state, action) => {
			state.accessToken = action.payload.accessToken
			state.refreshToken = action.payload.refreshToken
			localStorage.setItem('accessToken', state.accessToken)
			localStorage.setItem('refreshToken', state.refreshToken)
		},
		logoutUser: (state) => {
			state = initialState
			localStorage.clear()
		},
	},
})

export const { loginUser, logoutUser, refreshToken } = authReducer.actions
export default authReducer.reducer
