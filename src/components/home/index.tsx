import { useQuery } from '@apollo/client'
import { Add } from '@mui/icons-material'
import { Button, Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useDispatch, useSelector } from 'react-redux'

import { Note } from 'common/models'
import { Editor, NotesCard, Preview } from 'components/common'
import { GET_NOTES } from 'graphql/queries'
import { flash, toggleEditor, togglePreview } from 'redux/reducers/appReducer'
import { selectNote, setupNotes } from 'redux/reducers/notesReducer'
import { RootState } from 'redux/reducers/rootReducer'

const Home = () => {
	const dispatch = useDispatch()

	const notes = useSelector((state: RootState) => state.notes.notes)

	const { isAuthenticated } = useSelector((state: RootState) => state.auth)

	const { loading, error } = useQuery(GET_NOTES, {
		onCompleted: (data) => dispatch(setupNotes(data.notes)),
		skip: !isAuthenticated,
	})

	const onNoteClick = (noteId: string) => {
		dispatch(selectNote(noteId))
		dispatch(togglePreview())
	}

	if (error) {
		dispatch(
			flash({
				message: error.message,
				type: 'error',
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
					onClick={() => dispatch(toggleEditor())}
				>
					New Note
				</Button>
			</Box>
			{notes && notes.length > 0 ? (
				<Grid container sx={{ mt: 3 }}>
					{notes.map((note: Note) => (
						<Grid item key={note.id} xs={12} md={6} lg={3}>
							<NotesCard note={note} onNoteClick={onNoteClick} />
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
						{(loading && 'Loading...') || 'No notes found!'}
					</Typography>
				</Grid>
			)}
			<Editor />
			<Preview />
		</>
	)
}

export default Home
