import * as types from "./types";

const initialState = {
  loading: false,
  drives: [],
  error: null,
};

export default function driveReducer(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_DRIVES_REQUEST:
      return { ...state, loading: true };
    case types.FETCH_DRIVES_SUCCESS:
      return { loading: false, drives: action.payload, error: null };
    case types.FETCH_DRIVES_FAILURE:
      return { loading: false, drives: [], error: action.payload };
    default:
      return state;
  }
}
