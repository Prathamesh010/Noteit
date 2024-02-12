import { createSlice } from '@reduxjs/toolkit'

const appReducer = createSlice({
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

export const {
	flash,
	closeFlash,
	togglePreview,
	toggleEditor,
	toggleEdit,
} = appReducer.actions
export default appReducer.reducer
