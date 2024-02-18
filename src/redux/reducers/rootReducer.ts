import { combineReducers, Reducer } from 'redux'

import {
	appReducer,
	authReducer,
	notesReducer,
	themeReducer,
} from 'redux/reducers'

export const rootReducer: Reducer = combineReducers({
	notes: notesReducer,
	theme: themeReducer,
	app: appReducer,
	auth: authReducer,
})

export type RootState = ReturnType<typeof rootReducer>
