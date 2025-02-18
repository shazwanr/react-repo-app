import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Repo, DataState } from './dataTypes';

const initialState: DataState = {
    data: [],
    loading: false,
    error: null,
    currentPage: 1,
    hasMore: true,

    //selectedRepo: null,
    selectedRepoLoading: false,
    selectedRepoError: null,
};

const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        fetchRepoListRequest(state, action: PayloadAction<number>) {
            state.loading = true;
            state.error = null;
        },
        fetchRepoListSuccess(state, action: PayloadAction<Repo[]>) {
            state.loading = false;
            state.data = [...state.data, ...action.payload];
            state.currentPage += 1;
            state.hasMore = action.payload.length === 10;
        },
        fetchRepoListFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },

        fetchRepoRequest(state, action: PayloadAction<string>) {
            state.selectedRepoLoading = true;
            state.selectedRepoError = null;
        },
        fetchRepoSuccess(state, action: PayloadAction<Repo[]>) {
            state.selectedRepoLoading = false;
            //state.selectedRepo = action.payload;
            state.data = [...action.payload];
            state.hasMore = false;
        },
        fetchRepoFailure(state, action: PayloadAction<string>) {
            state.selectedRepoLoading = false;
            state.selectedRepoError = action.payload;
        },
        resetDataState(state) {
            return initialState; // Reset the state to its initial values
        },
    }
});

export const {
    fetchRepoListRequest,
    fetchRepoListSuccess,
    fetchRepoListFailure,
    fetchRepoRequest,
    fetchRepoSuccess,
    fetchRepoFailure,
    resetDataState
} = dataSlice.actions;

export default dataSlice.reducer;