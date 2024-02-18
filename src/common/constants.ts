import { Note } from 'common/models'

export const EmptyNote: Note = {
	id: '',
	title: '',
	content: '',
	createdAt: new Date(),
	updatedAt: new Date(),
}
