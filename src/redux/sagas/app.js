import { call, fork, put, takeLatest } from "redux-saga/effects";
import { appInit } from "./../services";
import { APP_INIT_REQUEST, APP_INIT_SUCCESS } from "./../types";

function* wokerAppInit(action) {

  const res = yield call(appInit, action.payload);

  yield put({
    type: APP_INIT_SUCCESS,
    payload: res
  });

}

function* watchAppInit() {
  yield takeLatest(APP_INIT_REQUEST, wokerAppInit)
}

export default [
  fork(watchAppInit)
]