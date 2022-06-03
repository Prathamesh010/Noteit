export interface Note {
	id: string
	title: string
	content: string
	createdAt: Date
	updatedAt: Date
}

export type User = {
	id: string
	name: string
	email: string
	picture: string
}
