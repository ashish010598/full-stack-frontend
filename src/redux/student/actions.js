import * as types from "./types";

export const fetchStudentsRequest = () => ({
  type: types.FETCH_STUDENTS_REQUEST,
});

export const fetchStudentsSuccess = (students) => ({
  type: types.FETCH_STUDENTS_SUCCESS,
  payload: students,
});

export const fetchStudentsFailure = (error) => ({
  type: types.FETCH_STUDENTS_FAILURE,
  payload: error,
});
