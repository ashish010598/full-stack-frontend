import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import * as types from "./types";

function* login(action) {
  try {
    const res = yield call(
      axios.post,
      "http://localhost:8081/api/auth/login",
      action.payload
    );
    const token = res.data.token;
    localStorage.setItem("token", token);
    yield put({ type: types.LOGIN_SUCCESS, payload: token });
  } catch (err) {
    console.log(err);
    yield put({ type: types.LOGIN_FAILURE, payload: err.message });
  }
}

export default function* authSaga() {
  yield takeLatest(types.LOGIN_REQUEST, login);
}
