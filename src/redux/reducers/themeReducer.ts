import { createSlice } from '@reduxjs/toolkit';
import { getLocalStorage, setLocalStorage } from '../../common/utils';

const themeReducer = createSlice({
	name: 'theme',
	initialState: {
		theme: getLocalStorage('theme') || 'light',
	},
	reducers: {
		toggleTheme: (state) => {
			setLocalStorage('theme', state.theme === 'light' ? 'dark' : 'light');
			state.theme = state.theme === 'light' ? 'dark' : 'light';
		},
	},
});

export const { toggleTheme } = themeReducer.actions;
export default themeReducer.reducer;
