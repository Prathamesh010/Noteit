import { createSlice } from '@reduxjs/toolkit'
import { User } from '../../common'

export const EmptyUser: User = {
	id: '',
	name: '',
	email: '',
	picture: '',
}

const initialState = {
	isAuthenticated: localStorage.getItem('user') !== null,
	accessToken: localStorage.getItem('accessToken') || '',
	refreshToken: localStorage.getItem('refreshToken') || '',
	user: localStorage.getItem('user')
		? JSON.parse(localStorage.getItem('user') || '')
		: EmptyUser,
}

const authReducer = createSlice({
	name: 'auth',
	initialState: initialState,
	reducers: {
		loginUser: (state, action) => {
			state.isAuthenticated = true
			state.accessToken = action.payload.accessToken
			state.refreshToken = action.payload.refreshToken
			state.user = action.payload.user
			localStorage.setItem('accessToken', state.accessToken)
			localStorage.setItem('refreshToken', state.refreshToken)
			localStorage.setItem('user', JSON.stringify(state.user))
		},
		logoutUser: (state) => {
			state = initialState
			localStorage.clear()
		},
	},
})

export const { loginUser, logoutUser } = authReducer.actions
export default authReducer.reducer
