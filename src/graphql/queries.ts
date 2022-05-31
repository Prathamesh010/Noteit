import { gql } from '@apollo/client'

export const LOGIN_USER = gql`
	query LoginUser($token: String!) {
		login(token: $token) {
			accessToken
			refreshToken
			user {
				id
				name
				email
				picture
			}
		}
	}
`

export const GET_NOTES = gql`
	query GetNotes {
		notes {
			id
			content
			title
			updatedAt
		}
	}
`

export const GET_PROFILE_PIC = gql`
	query Me {
		me {
			name
			picture
		}
	}
`

export const REFRESH_TOKEN = gql`
	query RefreshToken($token: String!) {
		refreshToken(token: $token) {
			accessToken
			refreshToken
		}
	}
`
