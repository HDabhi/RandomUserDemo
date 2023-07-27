import { put, takeLatest, all, call } from 'redux-saga/effects';
import axios, { AxiosResponse } from 'axios';

import {
  fetchUsersStart,
  fetchUsersSuccess,
  fetchUsersFailure,
} from './users/usersSlice';
import { User, UserResult } from '../model/user';

// API base URL
const API_BASE_URL = 'https://randomuser.me/api/';

function* fetchUsersSaga(action: { type: string; payload: number }): Generator<any, void, AxiosResponse<UserResult>>  {
  try {
    yield put(fetchUsersStart());
    
    const page = action.payload;
    // Fetch 20 users from the API, this is hardcoded as of now
    const response: AxiosResponse<UserResult> = yield call(axios.get, `${API_BASE_URL}?page=${page}&results=20`);
    const users = response.data.results;

    yield put(fetchUsersSuccess(users));
  } catch (error: any) { 
    yield put(fetchUsersFailure(error.message as string));
  }
}

function* watchUsersSaga() {
  yield takeLatest('users/fetchUsers', fetchUsersSaga);
}

export default function* rootSaga() {
  yield all([watchUsersSaga()]);
}
