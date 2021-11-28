import { combineReducers, Reducer } from 'redux';
import notesReducer from './notesReducer';
import themeReducer from './themeReducer';

const rootReducer: Reducer = combineReducers({
	notes: notesReducer,
	theme: themeReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
