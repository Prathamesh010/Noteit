import { gql } from '@apollo/client'

export const CREATE_NOTE = gql`
	mutation CreateNote($title: String!, $content: String!) {
		createNote(content: $content, title: $title) {
			id
			title
			content
			createdAt
			updatedAt
		}
	}
`

export const UPDATE_NOTE = gql`
	mutation UpdateNote($id: String!, $title: String!, $content: String!) {
		updateNote(id: $id, content: $content, title: $title) {
			id
			title
			content
			updatedAt
		}
	}
`

export const DELETE_NOTE = gql`
	mutation DeleteNote($id: String!) {
		deleteNote(id: $id)
	}
`
