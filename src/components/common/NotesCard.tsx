import { Card, Typography } from '@mui/material'
import moment from 'moment'
import { FC } from 'react'

import { Note } from 'common/models'

interface NotesCardProps {
	note: Note
	onNoteClick: (noteId: string) => void
}

export const NotesCard: FC<NotesCardProps> = ({ note, onNoteClick }) => {
	return (
		<Card
			sx={{
				p: 2,
				m: 2,
				border: '1px solid',
				borderColor: 'primary.light',
				borderRadius: '8px',
			}}
			onClick={() => onNoteClick(note.id)}
		>
			<Typography variant="h5" gutterBottom>
				{note.title}
			</Typography>
			<Typography variant="subtitle2" gutterBottom>
				Edited {moment(note.updatedAt.toString()).fromNow()}
			</Typography>
		</Card>
	)
}
