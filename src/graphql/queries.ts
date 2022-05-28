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
