import * as types from "./types";

export const fetchDrivesRequest = () => ({
  type: types.FETCH_DRIVES_REQUEST,
});

export const fetchDrivesSuccess = (drives) => ({
  type: types.FETCH_DRIVES_SUCCESS,
  payload: drives,
});

export const fetchDrivesFailure = (error) => ({
  type: types.FETCH_DRIVES_FAILURE,
  payload: error,
});
