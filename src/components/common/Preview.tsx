import { useMutation } from '@apollo/client'
import { Close, Delete, Edit } from '@mui/icons-material'
import {
	CircularProgress,
	Dialog,
	DialogContent,
	DialogTitle,
	IconButton,
	Slide,
	Typography,
} from '@mui/material'
import { TransitionProps } from '@mui/material/transitions'
import { Box } from '@mui/system'
import MDEditor from '@uiw/react-md-editor'
import { logEvent } from 'firebase/analytics'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { analytics } from 'App'
import { ResponsiveButton } from 'components/common'
import { DELETE_NOTE } from 'graphql/mutations'
import {
	flash,
	toggleEdit,
	toggleEditor,
	togglePreview,
} from 'redux/reducers/appReducer'
import { deleteNoteFromCache } from 'redux/reducers/notesReducer'
import { RootState } from 'redux/reducers/rootReducer'

const Transition = React.forwardRef(function Transition(
	props: TransitionProps & {
		children: React.ReactElement
	},
	ref: React.Ref<unknown>
) {
	return <Slide direction="up" ref={ref} {...props} />
})

export const Preview: React.FC = () => {
	const dispatch = useDispatch()
	const note = useSelector((state: RootState) => state.notes.selectedNote)
	const isPreviewOpen = useSelector(
		(state: RootState) => state.app.isPreviewOpen
	)
	const isAuthenticated = useSelector(
		(state: RootState) => state.auth.isAuthenticated
	)

	const [deleteNote, { loading, error }] = useMutation(DELETE_NOTE)

	const closePreview = () => dispatch(togglePreview())

	const openEditor = () => {
		dispatch(toggleEdit())
		dispatch(toggleEditor())
		dispatch(togglePreview())
	}

	const deleteLocalNote = () => {
		dispatch(
			deleteNoteFromCache({
				noteId: note.id,
			})
		)
		closePreview()
		dispatch(
			flash({
				message: 'Note deleted',
				type: 'success',
			})
		)
		logEvent(analytics, 'delete_note')
	}

	const onDelete = () => {
		if (isAuthenticated) {
			deleteNote({
				variables: {
					id: note.id,
				},
				onCompleted: () => deleteLocalNote(),
			})
		} else deleteLocalNote()
	}

	if (error) {
		dispatch(
			flash({
				message: 'Error deleting note',
				type: 'error',
			})
		)
	}

	return (
		<Dialog
			open={isPreviewOpen}
			onClose={closePreview}
			fullScreen
			TransitionComponent={Transition}
		>
			<DialogTitle>
				<Box sx={{ display: 'flex' }}>
					<Typography variant="h6">{note.title}</Typography>
					<Box sx={{ flexGrow: 1 }} />
					<ResponsiveButton
						variant="contained"
						startIcon={<Edit />}
						sx={{ mr: 2 }}
						onClick={openEditor}
					>
						Edit
					</ResponsiveButton>
					<ResponsiveButton
						variant="contained"
						startIcon={
							loading ? (
								<CircularProgress color="secondary" size={23} />
							) : (
								<Delete />
							)
						}
						sx={{ mr: 2 }}
						onClick={onDelete}
					>
						Delete
					</ResponsiveButton>
					<IconButton color="primary" onClick={closePreview}>
						<Close />
					</IconButton>
				</Box>
			</DialogTitle>
			<DialogContent>
				<MDEditor.Markdown source={note.content} linkTarget="_blank" />
			</DialogContent>
		</Dialog>
	)
}
