import { createSlice } from '@reduxjs/toolkit'
import { client } from 'App'
import { User } from 'common/models'

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

const authSlice = createSlice({
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
			localStorage.clear()
			client.resetStore()
			return {
				isAuthenticated: false,
				accessToken: '',
				refreshToken: '',
			}
		},
	},
})

export const authReducer = authSlice.reducer
export const { loginUser, logoutUser, refreshToken } = authSlice.actions
