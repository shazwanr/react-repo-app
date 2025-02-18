import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Repo, DataState } from './dataTypes';

const initialState: DataState = {
    repoList: [],
    repoListLoading: false,
    repoListError: null,
    repoListHasMore: true,

    repoSearch: [],
    repoSearchLoading: false,
    repoSearchoError: null,
    repoSearchHasMore: true,
};

const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        fetchRepoListRequest(state, action: PayloadAction<{page:number, perPage:number}>) {
            state.repoListLoading = true;
            state.repoListError = null;
        },
        fetchRepoListSuccess(state, action: PayloadAction<Repo[]>) {
            state.repoListLoading = false;
            state.repoList = [...state.repoList, ...action.payload];
            state.repoListHasMore = action.payload.length > 0;
        },
        fetchRepoListFailure(state, action: PayloadAction<string>) {
            state.repoListLoading = false;
            state.repoListError = action.payload;
        },

        fetchRepoSearchRequest(state, action: PayloadAction<{searchQuery:string, page:number, perPage:number}>) {
            state.repoSearchLoading = true;
            state.repoSearchoError = null;
        },
        fetchRepoSearchSuccess(state, action: PayloadAction<Repo[]>) {
            state.repoSearchLoading = false;
            state.repoSearch = [...state.repoSearch,...action.payload];
            state.repoSearchHasMore = action.payload.length > 0;
        },
        fetchRepoSearchFailure(state, action: PayloadAction<string>) {
            state.repoSearchLoading = false;
            state.repoSearchoError = action.payload;
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
    fetchRepoSearchRequest,
    fetchRepoSearchSuccess,
    fetchRepoSearchFailure,
    resetDataState
} = dataSlice.actions;

export default dataSlice.reducer;