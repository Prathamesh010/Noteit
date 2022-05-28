import { createSlice } from '@reduxjs/toolkit'
import { Note } from '../../common'
import { uuid } from '../../common/utils'

interface noteState {
	notes: Note[]
}

const initialState: noteState = {
	notes: JSON.parse(localStorage.getItem('notes') || '[]'),
}

const notesReducer = createSlice({
	name: 'notes',
	initialState: initialState,
	reducers: {
		addNote: (state, action) => {
			const id: string = uuid()
			const note: Note = {
				id: id,
				title: action.payload.title,
				content: action.payload.content,
				createdAt: new Date(),
				updatedAt: new Date(),
			}
			localStorage.setItem(
				'notes',
				JSON.stringify([...state.notes, note])
			)
			state.notes.push(note)
		},
		deleteNote: (state, action) => {
			const note: Note = action.payload.note
			const noteIndex: number = state.notes.findIndex(
				(res) => res.id === note.id
			)
			state.notes.splice(noteIndex, 1)
			localStorage.setItem('notes', JSON.stringify(state.notes))
		},
		editNote: (state, action) => {
			const noteId: string = action.payload.id
			const noteIndex: number = state.notes.findIndex(
				(note) => note.id === noteId
			)
			state.notes[noteIndex].title = action.payload.title
			state.notes[noteIndex].content = action.payload.content
			state.notes[noteIndex].updatedAt = new Date()
			localStorage.setItem('notes', JSON.stringify(state.notes))
		},
	},
})

export const { addNote, deleteNote, editNote } = notesReducer.actions
export default notesReducer.reducer
