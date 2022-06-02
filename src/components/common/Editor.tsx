import { Close, Save } from '@mui/icons-material'
import {
	Dialog,
	DialogContent,
	DialogTitle,
	IconButton,
	Slide,
} from '@mui/material'
import { TransitionProps } from '@mui/material/transitions'
import { Box } from '@mui/system'
import React, { FC, useEffect, useState } from 'react'
import MDEditor from '@uiw/react-md-editor'
import EditorTitle from './EditorTitle'
import { isMobile } from 'react-device-detect'
import ResponsiveButton from './ResponsiveButton'
import { RootState } from '../../redux/reducers/rootReducer'
import { useDispatch, useSelector } from 'react-redux'
import {
	addNoteToCache,
	editCacheNote,
} from '../../redux/reducers/notesReducer'
import {
	flash,
	selectNote,
	toggleEdit,
	toggleEditor,
} from '../../redux/reducers/appReducer'
import { Note } from '../../common'
import { useMutation } from '@apollo/client'
import { CREATE_NOTE, UPDATE_NOTE } from '../../graphql/mutations'
import { EmptyNote } from '../home'

const styles = {
	flex: {
		display: 'flex',
	},
	editorGrid: {
		height: '100%',
		mt: 1,
	},
	markdownRenderer: {
		border: '1px solid #ccc',
		height: '100%',
	},
}

const Transition = React.forwardRef(function Transition(
	props: TransitionProps & {
		children: React.ReactElement
	},
	ref: React.Ref<unknown>
) {
	return <Slide direction="up" ref={ref} {...props} />
})

const Editor: FC = () => {
	const dispatch = useDispatch()
	const note = useSelector((state: RootState) => state.app.selectedNote)
	const isEditorOpen = useSelector(
		(state: RootState) => state.app.isEditorOpen
	)
	const isEdit = useSelector((state: RootState) => state.app.isEdit)
	const [text, setText] = useState<string>('')
	const [title, setTitle] = useState<string>('Untitled')

	const [editNote] = useMutation(UPDATE_NOTE)
	const [createNote] = useMutation(CREATE_NOTE)

	const onClose = () => {
		dispatch(toggleEditor())
		dispatch(selectNote(EmptyNote))
		if (isEdit) dispatch(toggleEdit())
	}

	useEffect(() => {
		if (isEdit) {
			setText(note.content)
			setTitle(note.title)
		}
	}, [note, isEdit])

	const editNoteTask = (title: string, content: string) => {
		editNote({
			variables: {
				id: note.id,
				title: title,
				content: content,
			},
		})
			.then((data: any) => data.data.updateNote)
			.then((data: Note) => {
				dispatch(editCacheNote(data))
				dispatch(
					flash({
						message: 'Note updated',
						type: 'success',
					})
				)
			})
	}

	const createNoteTask = (title: string, text: string) => {
		createNote({
			variables: {
				title: title,
				content: text,
			},
		})
			.then((data: any) => data.data.createNote)
			.then((data: Note) => {
				dispatch(addNoteToCache(data))
				dispatch(
					flash({
						message: 'Note created',
						type: 'success',
					})
				)
			})
	}

	const saveNote = (title: string, text: string, isEdit: boolean) => {
		if (text === undefined) return
		isEdit ? editNoteTask(title, text) : createNoteTask(title, text)
	}

	const onSave = () => {
		saveNote(title, text, isEdit)
		resetState()
		onClose()
	}

	const resetState = () => {
		setText('')
		setTitle('Untitled')
	}

	return (
		<Dialog
			open={isEditorOpen}
			onClose={onClose}
			fullScreen
			TransitionComponent={Transition}
		>
			<DialogTitle>
				<Box sx={styles.flex}>
					<EditorTitle title={title} setTitle={setTitle} />
					<Box sx={{ flexGrow: 1 }} />
					<ResponsiveButton
						variant="contained"
						startIcon={<Save />}
						sx={{ mr: 2 }}
						onClick={onSave}
					>
						Save
					</ResponsiveButton>
					<IconButton
						color="primary"
						onClick={() => {
							onClose()
							resetState()
						}}
					>
						<Close />
					</IconButton>
				</Box>
			</DialogTitle>
			<DialogContent>
				<Box sx={styles.editorGrid}>
					<MDEditor
						value={text}
						onChange={(val) => setText(val || text)}
						height={650}
						preview={isMobile ? 'edit' : 'live'}
						enableScroll={true}
						tabSize={4}
					/>
				</Box>
			</DialogContent>
		</Dialog>
	)
}

export default Editor
