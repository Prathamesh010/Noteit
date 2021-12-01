import { Close, Save } from '@mui/icons-material'
import {
	Button,
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
import { Note } from '../../common'
import { isMobile } from 'react-device-detect'

interface EditorProps {
	open: boolean
	onClose: () => void
	saveNote: (title: string, text: string, isEdit: boolean) => void
	note: Note
	isEdit: boolean
}

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

const Editor: FC<EditorProps> = ({
	open,
	onClose,
	saveNote,
	note,
	isEdit = false,
}) => {
	const [text, setText] = useState<string>('')
	const [title, setTitle] = useState<string>('Untitled')

	useEffect(() => {
		if (isEdit) {
			setText(note.content)
			setTitle(note.title)
		}
	}, [note, isEdit])

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
			open={open}
			onClose={onClose}
			fullScreen
			TransitionComponent={Transition}
		>
			<DialogTitle>
				<Box sx={styles.flex}>
					<EditorTitle title={title} setTitle={setTitle} />
					<Box sx={{ flexGrow: 1 }} />
					<Button
						variant="contained"
						startIcon={<Save />}
						sx={{ mr: 2 }}
						onClick={onSave}
					>
						Save
					</Button>
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
					/>
				</Box>
			</DialogContent>
		</Dialog>
	)
}

export default Editor
