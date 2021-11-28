import { Add } from '@mui/icons-material';
import { Button } from '@mui/material';
import { useState } from 'react';
import { Box } from '@mui/system';
import Editor from '../common/Editor';
import { useDispatch } from 'react-redux';
import { addNote } from '../../redux/reducers/notesReducer';

const Home = () => {
	const [open, setOpen] = useState(false);
	const dispatch = useDispatch();

	const saveNote = (text: string | undefined) => {
		if (text === undefined) return;

		dispatch(
			addNote({
				title: '',
				content: text,
			})
		);
	};
	return (
		<>
			<Box sx={{ display: 'flex', flexDirection: 'row-reverse' }}>
				<Button
					sx={{ mt: 3, mr: 3 }}
					variant='contained'
					startIcon={<Add />}
					onClick={() => setOpen(true)}
				>
					New Note
				</Button>
			</Box>
			<Editor open={open} onClose={() => setOpen(false)} saveNote={saveNote} />
		</>
	);
};

export default Home;
