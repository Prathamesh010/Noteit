import { createSlice, current } from '@reduxjs/toolkit'

import { EmptyNote } from 'common/constants'
import { Note } from 'common/models'

interface noteState {
	notes: Note[]
	selectedNote: Note
}

const initialState: noteState = {
	notes: JSON.parse(localStorage.getItem('notes') || '[]'),
	selectedNote: EmptyNote,
}

const notesSlice = createSlice({
	name: 'notes',
	initialState: initialState,
	reducers: {
		setupNotes: (state, action) => {
			state.notes = action.payload
			localStorage.setItem('notes', JSON.stringify(state.notes))
		},
		selectNote: (state: noteState, action) => {
			const note = current(state.notes).find(
				(note) => note.id === action.payload
			)
			state.selectedNote = note as Note
		},
		addNoteToCache: (state, action) => {
			const note: Note = action.payload
			localStorage.setItem(
				'notes',
				JSON.stringify([...state.notes, note])
			)
			state.notes.push(note)
		},
		deleteNoteFromCache: (state, action) => {
			const noteId = action.payload.noteId
			const noteIndex: number = state.notes.findIndex(
				(res) => res.id === noteId
			)
			state.notes.splice(noteIndex, 1)
			localStorage.setItem('notes', JSON.stringify(state.notes))
		},
		editCacheNote: (state, action) => {
			const noteId: string = action.payload.id
			const noteIndex: number = state.notes.findIndex(
				(note) => note.id === noteId
			)
			state.notes[noteIndex].title = action.payload.title
			state.notes[noteIndex].content = action.payload.content
			state.notes[noteIndex].updatedAt = action.payload.updatedAt
			localStorage.setItem('notes', JSON.stringify(state.notes))
		},
		resetNoteState: (state) => {
			state.notes = []
		},
	},
})

export const notesReducer = notesSlice.reducer
export const {
	addNoteToCache,
	deleteNoteFromCache,
	editCacheNote,
	setupNotes,
	resetNoteState,
	selectNote,
} = notesSlice.actions
