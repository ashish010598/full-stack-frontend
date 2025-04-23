import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import * as types from "./types";

function* fetchStudents() {
  try {
    const res = yield call(axios.get, "http://localhost:8081/api/students", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    yield put({ type: types.FETCH_STUDENTS_SUCCESS, payload: res.data });
  } catch (err) {
    yield put({ type: types.FETCH_STUDENTS_FAILURE, payload: err.message });
  }
}

export default function* studentSaga() {
  yield takeLatest(types.FETCH_STUDENTS_REQUEST, fetchStudents);
}
