import { Add } from '@mui/icons-material'
import { Button, Grid, Typography } from '@mui/material'
import { useState } from 'react'
import { Box } from '@mui/system'
import Editor from '../common/Editor'
import { useDispatch, useSelector } from 'react-redux'
import {
	addNote,
	deleteNote,
	editNote,
} from '../../redux/reducers/notesReducer'
import { RootState } from '../../redux/reducers/rootReducer'
import { Note } from '../../common'
import NotesCard from '../common/NotesCard'
import Preview from '../common/Preview'
import { flash } from '../../redux/reducers/appReducer'

const EmptyNote: Note = {
	id: '',
	title: '',
	content: '',
	createdAt: new Date(),
	updatedAt: new Date(),
}

const Home = () => {
	const notes: Note[] = useSelector((state: RootState) => state.notes).notes
	const [open, setOpen] = useState(false)
	const [openPreview, setOpenPreview] = useState(false)
	const [note, setNote] = useState<Note>(EmptyNote)
	const [isEdit, setIsEdit] = useState(false)
	const dispatch = useDispatch()

	const openNote = (noteId: string) => {
		const result = notes.find((note) => note.id === noteId)
		if (!result) return
		setNote(result)
		setOpenPreview(true)
	}

	const closeEditor = () => {
		setOpen(false)
		setNote(EmptyNote)
		setIsEdit(false)
	}

	const closePreview = () => {
		setOpenPreview(false)
		setNote(EmptyNote)
	}

	const saveNote = (title: string, text: string, isEdit: boolean) => {
		if (text === undefined) return
		isEdit
			? dispatch(
					editNote({
						title: title,
						content: text,
						id: note.id,
					})
			  )
			: dispatch(
					addNote({
						title: title,
						content: text,
					})
			  )

		dispatch(
			flash({
				message: isEdit ? 'Note updated' : 'Note created',
				type: 'success',
			})
		)
	}

	const openEditor = () => {
		setNote(note)
		setIsEdit(true)
		setOpen(true)
		setOpenPreview(false)
	}

	const deleteNoteDispatch = () => {
		dispatch(
			deleteNote({
				note: note,
			})
		)
		dispatch(
			flash({
				message: 'Note deleted',
				type: 'success',
			})
		)
	}

	return (
		<>
			<Box sx={{ display: 'flex', flexDirection: 'row-reverse' }}>
				<Button
					sx={{ mt: 3, mr: 3 }}
					variant="contained"
					startIcon={<Add />}
					onClick={() => setOpen(true)}
				>
					New Note
				</Button>
			</Box>
			{notes && notes.length > 0 ? (
				<Grid container sx={{ mt: 3 }}>
					{notes.map((note) => (
						<Grid item key={note.id} xs={12} md={6} lg={3}>
							<NotesCard note={note} openNote={openNote} />
						</Grid>
					))}
				</Grid>
			) : (
				<Grid
					container
					spacing={0}
					direction="column"
					alignItems="center"
					justifyContent="center"
					sx={{ mt: 3 }}
				>
					<Typography variant="h5" fontWeight="bold">
						No Notes Yet!
					</Typography>
				</Grid>
			)}
			<Editor
				open={open}
				onClose={closeEditor}
				saveNote={saveNote}
				note={note}
				isEdit={isEdit}
			/>
			<Preview
				note={note}
				open={openPreview}
				onClose={closePreview}
				openEditor={openEditor}
				deleteNote={deleteNoteDispatch}
			/>
		</>
	)
}

export default Home
