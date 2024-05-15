import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';

export const coinsSlice = createSlice({
	name: 'coins',
	initialState: {
		selectedCoins: [],
	},
	reducers: {
		setSelectedCoins: (state, action) => {
			state.selectedCoins = action.payload;
		},
	},
});

export const { setSelectedCoins } = coinsSlice.actions;

export const selectedCoins = (state: RootState) => state.coins.selectedCoins;

export default coinsSlice.reducer;
