import { all, call, put, takeLatest } from 'redux-saga/effects';
import { fetchRepoList, fetchRepo } from '../api';
import {
    fetchRepoListSuccess,
    fetchRepoListFailure,
    fetchRepoFailure,
    fetchRepoSuccess
} from './dataSlice';
import { Repo } from './dataTypes';

function* fetchRepoListSaga(action: { type: string; payload: number }): Generator<any> {
    try {
        const perPage = 10;
        const response: { data: Repo[] } = yield call(fetchRepoList, action.payload, perPage);
        const data: Repo[] = response.data;
        yield put(fetchRepoListSuccess(data));
    } catch (error: any) {
        yield put(fetchRepoListFailure(error.message));
    }
}

function* fetchRepoSaga(action: { type: string; payload: string }): Generator<any> {
    try {
        const response: { data: any } = yield call(fetchRepo, action.payload);
        const data: Repo[] = response.data.items;
        yield put(fetchRepoSuccess(data));
    } catch (error: any) {
        yield put(fetchRepoFailure(error.message));
    }
}

function* watchFetchRepoList(): Generator<any> {
    yield takeLatest('data/fetchRepoListRequest', fetchRepoListSaga);
}

function* watchFetchRepo(): Generator<any> {
    yield takeLatest('data/fetchRepoRequest', fetchRepoSaga);
}

export default function* rootSaga(): Generator<any> {
    yield all([watchFetchRepoList(), watchFetchRepo()]);
}