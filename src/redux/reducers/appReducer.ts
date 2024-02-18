import { createSlice } from '@reduxjs/toolkit'

const appSlice = createSlice({
	name: 'app',
	initialState: {
		flash: {
			message: '',
			type: 'success',
			open: false,
		},
		isPreviewOpen: false,
		isEditorOpen: false,
		isEdit: false,
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
		togglePreview: (state) => {
			state.isPreviewOpen = !state.isPreviewOpen
		},
		toggleEditor: (state) => {
			state.isEditorOpen = !state.isEditorOpen
		},
		toggleEdit: (state) => {
			state.isEdit = !state.isEdit
		},
	},
})

export const appReducer = appSlice.reducer
export const { flash, closeFlash, togglePreview, toggleEditor, toggleEdit } =
	appSlice.actions
