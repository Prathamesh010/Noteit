import { createSlice } from '@reduxjs/toolkit'

const appReducer = createSlice({
	name: 'app',
	initialState: {
		flash: {
			message: '',
			type: 'success',
			open: false,
		},
	},
	reducers: {
		flash: (state, action) => {
			state.flash.message = action.payload.message
			state.flash.type = action.payload.type
			state.flash.open = true
		},
		closeFlash: (state) => {
			state.flash.open = false
		},
	},
})

export const { flash, closeFlash } = appReducer.actions
export default appReducer.reducer
