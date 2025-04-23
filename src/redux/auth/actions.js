import * as types from "./types";

export const loginRequest = (payload) => ({
  type: types.LOGIN_REQUEST,
  payload,
});

export const resetLoginRequest = () => ({
  type: types.RESET_STATE,
});
