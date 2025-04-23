import { all } from "redux-saga/effects";
import authSaga from "./auth/saga";
import studentSaga from "./student/saga";
import driveSaga from "./drive/saga";

export default function* rootSaga() {
  yield all([authSaga(), studentSaga(), driveSaga()]);
}
