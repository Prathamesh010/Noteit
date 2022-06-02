import { useMutation } from '@apollo/client'
import { Close, Delete, Edit } from '@mui/icons-material'
import {
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
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DELETE_NOTE } from '../../graphql/mutations'
import {
	flash,
	selectNote,
	toggleEdit,
	toggleEditor,
	togglePreview,
} from '../../redux/reducers/appReducer'
import { deleteNoteFromCache } from '../../redux/reducers/notesReducer'
import { RootState } from '../../redux/reducers/rootReducer'
import { EmptyNote } from '../home'
import ResponsiveButton from './ResponsiveButton'

const Transition = React.forwardRef(function Transition(
	props: TransitionProps & {
		children: React.ReactElement
	},
	ref: React.Ref<unknown>
) {
	return <Slide direction="up" ref={ref} {...props} />
})

const Preview: React.FC = () => {
	const dispatch = useDispatch()
	const note = useSelector((state: RootState) => state.app.selectedNote)
	const isPreviewOpen = useSelector(
		(state: RootState) => state.app.isPreviewOpen
	)

	const [deleteNote] = useMutation(DELETE_NOTE)

	const closePreview = () => {
		dispatch(togglePreview())
		dispatch(selectNote(EmptyNote))
	}

	const openEditor = () => {
		dispatch(toggleEdit())
		dispatch(toggleEditor())
		dispatch(togglePreview())
	}

	const onDelete = () => {
		deleteNote({
			variables: {
				id: note.id,
			},
		}).then(() => {
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
		})
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
						startIcon={<Delete />}
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

export default Preview
