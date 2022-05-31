import {
	ApolloClient,
	InMemoryCache,
	createHttpLink,
	ApolloLink,
	Observable,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error'
import { REFRESH_TOKEN } from './graphql/queries'
import { refreshToken } from './redux/reducers/authReducer'
import store from './redux/store'

const createApolloClient = () => {
	const httpLink = createHttpLink({
		uri: process.env.REACT_APP_GRAPHQL_ENDPOINT,
	})

	const authLink = setContext((_, { headers }) => {
		const token = localStorage.getItem('accessToken')
		return {
			headers: {
				...headers,
				authorization: token ? `Bearer ${token}` : '',
			},
		}
	})

	const getToken = async () => {
		const data = await authClient.query({
			query: REFRESH_TOKEN,
			variables: {
				token: localStorage.getItem('refreshToken'),
			},
		})
		return data.data
	}

	const errorLink = onError(
		({ graphQLErrors, networkError, forward, operation }) => {
			if (graphQLErrors) {
				for (let err of graphQLErrors) {
					if (err.extensions.code === 'UNAUTHENTICATED') {
						return new Observable((observer) => {
							getToken()
								.then((token) => {
									store.dispatch(
										refreshToken(token.refreshToken)
									)
									operation.setContext({
										headers: {
											authorization: `Bearer ${token.refreshToken.accessToken}`,
										},
									})
								})
								.then(() => {
									const subscriber = {
										next: observer.next.bind(observer),
										error: observer.error.bind(observer),
										complete:
											observer.complete.bind(observer),
									}

									forward(operation).subscribe(subscriber)
								})
								.catch((err) => {
									observer.error(err)
								})
						})
					}
				}
			}
			if (networkError) console.log(`[Network error]: ${networkError}`)
		}
	)

	const client = new ApolloClient({
		link: ApolloLink.from([errorLink, authLink, httpLink]),
		cache: new InMemoryCache({
			addTypename: false,
		}),
	})

	const authClient = new ApolloClient({
		uri: process.env.REACT_APP_GRAPHQL_ENDPOINT,
		cache: new InMemoryCache({
			addTypename: false,
		}),
	})

	return client
}

export default createApolloClient
