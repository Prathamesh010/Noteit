import { Card, Typography } from '@mui/material'
import { FC } from 'react'
import { Note } from '../../common'
import { formatDate } from '../../common/utils'

interface NotesCardProps {
	note: Note
	openNote: (noteId: string) => void
	key: string
}

const NotesCard: FC<NotesCardProps> = ({ note, openNote, key }) => {
	return (
		<Card
			sx={{ minWidth: 275, p: 2, m: 2 }}
			onClick={() => openNote(note.id)}
		>
			<Typography variant="h5" gutterBottom>
				{note.title}
			</Typography>
			<Typography variant="subtitle2" gutterBottom>
				Edited {formatDate(note.updatedAt.toString())}
			</Typography>
		</Card>
	)
}

export default NotesCard
