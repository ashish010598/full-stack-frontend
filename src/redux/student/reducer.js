import * as types from "./types";

const initialState = {
  loading: false,
  students: [],
  error: null,
};

export default function studentReducer(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_STUDENTS_REQUEST:
      return { ...state, loading: true };
    case types.FETCH_STUDENTS_SUCCESS:
      return { loading: false, students: action.payload, error: null };
    case types.FETCH_STUDENTS_FAILURE:
      return { loading: false, students: [], error: action.payload };
    default:
      return state;
  }
}
