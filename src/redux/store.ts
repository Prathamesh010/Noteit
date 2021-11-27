import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './reducers/themeReducer';

const store = configureStore({
	reducer: themeReducer,
});

export default store;
