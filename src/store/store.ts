import { configureStore } from '@reduxjs/toolkit';
import coinsReducer from './coinsSlice';

export const store = configureStore({
	reducer: {
		coins: coinsReducer,
	},
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
