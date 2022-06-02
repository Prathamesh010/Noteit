import { createSlice } from '@reduxjs/toolkit'
import { EmptyNote } from '../../components/home'

const appReducer = createSlice({
	name: 'app',
	initialState: {
		flash: {
			message: '',
			type: 'success',
			open: false,
		},
		selectedNote: EmptyNote,
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
		selectNote: (state, action) => {
			state.selectedNote = action.payload
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
	selectNote,
	togglePreview,
	toggleEditor,
	toggleEdit,
} = appReducer.actions
export default appReducer.reducer
