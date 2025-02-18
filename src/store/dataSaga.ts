import { all, call, put, takeLatest } from 'redux-saga/effects';
import { fetchRepoList, fetchRepoSearch } from '../api';
import {
    fetchRepoListSuccess,
    fetchRepoListFailure,
    fetchRepoSearchFailure,
    fetchRepoSearchSuccess
} from './dataSlice';
import { Repo } from './dataTypes';

function* fetchRepoListSaga(action: {
    type: string;
    payload: { page: number, perPage: number }
}): Generator<any> {
    try {
        const response: { data: Repo[] } = yield call(
            fetchRepoList, action.payload.page, action.payload.perPage
        );
        const data: Repo[] = response.data;
        yield put(fetchRepoListSuccess(data));
    } catch (error: any) {
        yield put(fetchRepoListFailure(error.message));
    }
}

function* fetchRepoSaga(action: {
    type: string;
    payload: { searchQuery: string, page: number, perPage: number }
}): Generator<any> {
    try {
        const response: { data: any } = yield call(
            fetchRepoSearch, action.payload.searchQuery, action.payload.page, action.payload.perPage
        );
        const data: Repo[] = response.data.items;
        yield put(fetchRepoSearchSuccess(data));
    } catch (error: any) {
        yield put(fetchRepoSearchFailure(error.message));
    }
}

function* watchFetchRepoList(): Generator<any> {
    yield takeLatest('data/fetchRepoListRequest', fetchRepoListSaga);
}

function* watchFetchRepo(): Generator<any> {
    yield takeLatest('data/fetchRepoSearchRequest', fetchRepoSaga);
}

export default function* rootSaga(): Generator<any> {
    yield all([watchFetchRepoList(), watchFetchRepo()]);
}