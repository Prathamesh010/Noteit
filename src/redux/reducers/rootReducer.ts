import { combineReducers, Reducer } from 'redux'
import appReducer from './appReducer'
import notesReducer from './notesReducer'
import themeReducer from './themeReducer'

const rootReducer: Reducer = combineReducers({
	notes: notesReducer,
	theme: themeReducer,
	app: appReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
