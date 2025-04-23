import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import * as types from "./types";

function* fetchDrives() {
  try {
    const res = yield call(axios.get, "http://localhost:8081/api/drives", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    yield put({ type: types.FETCH_DRIVES_SUCCESS, payload: res.data });
  } catch (err) {
    yield put({ type: types.FETCH_DRIVES_FAILURE, payload: err.message });
  }
}

export default function* driveSaga() {
  yield takeLatest(types.FETCH_DRIVES_REQUEST, fetchDrives);
}
